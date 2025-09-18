import * as Yup from "yup";
import axios from "axios";
import DynamicForm from "./Form";
import { useState } from "react";
import Loader from "./Loader";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const addStudentEndpoint = import.meta.env.VITE_ADD_STUDENT;

function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    dateOfJoining: "",
    courseName: "",
    courseDescription: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    dateOfJoining: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date must be after today")
      .max(new Date("2025-12-31"), "Date must be before Jan 1, 2026")
      .typeError("Invalid date format"),
    courseName: Yup.string()
      .min(2, "Course name must be at least 2 characters")
      .required("Course name is required"),
    courseDescription: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Course description is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const payload = {
        name: values.name,
        email: values.email,
        dateOfJoining: values.dateOfJoining,
        course: {
          courseName: values.courseName,
          courseDescription: values.courseDescription,
        },
      };
      const response = await axios.post(
        `${baseUrl}${addStudentEndpoint}`,
        payload,
        { params: { token }, headers: { "Content-Type": "application/json" } }
      );

      setStatusMessage(
        response.data?.message || "✅ Student added successfully"
      );
      setIsError(false);
      resetForm();
    } catch (error) {
      const msg = error.response?.data?.message || "❌ Something went wrong";
      setStatusMessage(msg);
      setIsError(true);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Loader show={loading} />
      {statusMessage && (
        <p
          className={`text-center mb-4 font-medium ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {statusMessage}
        </p>
      )}
      <DynamicForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        title="Add Student"
        submitLabel="Add"
      />
    </div>
  );
}

export default AddStudent;
