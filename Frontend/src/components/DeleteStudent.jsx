import * as Yup from "yup";
import axios from "axios";
import DynamicForm from "./form";
import { useState } from "react";
import Loader from "./Loader";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const deleteStudentEndpoint = import.meta.env.VITE_DELETE_STUDENT;

function DeleteStudent() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const initialValues = { studentId: "" };

  const validationSchema = Yup.object({
    studentId: Yup.number()
      .required("Student ID is required")
      .positive("Student ID must be positive")
      .integer("Student ID must be an integer"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const response = await axios.delete(
        `${baseUrl}${deleteStudentEndpoint}/${values.studentId}`,
        { params: { token } }
      );
      setStatusMessage(
        response.data?.message || "✅ Student deleted successfully"
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
        title="Delete Student"
        submitLabel="Delete"
      />
    </div>
  );
}

export default DeleteStudent;
