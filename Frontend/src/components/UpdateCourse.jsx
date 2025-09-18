import * as Yup from "yup";
import axios from "axios";
import DynamicForm from "./Form";
import { useState } from "react";
import Loader from "./Loader"; // Reusable GIF loader

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const updateCourseEndpoint = "/student"; // ensure this matches backend

function UpdateCourse() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const initialValues = {
    studentId: "",
    courseName: "",
    courseDescription: "",
  };

  const validationSchema = Yup.object({
    studentId: Yup.number()
      .required("Student ID is required")
      .positive("Student ID must be positive")
      .integer("Student ID must be an integer"),
    courseName: Yup.string()
      .min(2, "Course name must be at least 2 characters")
      .required("Course name is required"),
    courseDescription: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Course description is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const response = await axios.put(
        `${baseUrl}${updateCourseEndpoint}/${values.studentId}/course`,
        {
          courseName: values.courseName,
          courseDescription: values.courseDescription,
        },
        {
          params: { token },
          headers: { "Content-Type": "application/json" },
        }
      );

      setStatusMessage(
        response.data.message || "✅ Course updated successfully"
      );
      setIsError(false);
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
      {/* Loader overlay */}
      <Loader show={loading} />

      {/* Status Message */}
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
        title="Update Course"
        submitLabel="Update"
      />
    </div>
  );
}

export default UpdateCourse;
