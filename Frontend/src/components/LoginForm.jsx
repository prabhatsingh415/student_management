import axios from "axios";
import DynamicForm from "./form";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "./Loader";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const loginEndpoint = import.meta.env.VITE_LOGIN;

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const response = await axios.post(`${baseUrl}${loginEndpoint}`, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data?.token)
        localStorage.setItem("token", response.data.token);

      setStatusMessage(
        response.data?.message || "✅ Login successful! Redirecting..."
      );
      setIsError(false);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "⚠️ Network error. Please check your connection.";
      setStatusMessage(`❌ ${msg}`);
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
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        title="Login"
        submitLabel="Login"
      />
    </div>
  );
}

export default LoginForm;
