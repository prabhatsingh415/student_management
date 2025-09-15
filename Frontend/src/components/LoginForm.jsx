import axios from "axios";
import DynamicForm from "./form";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const loginEndpoint = import.meta.env.VITE_LOGIN;

function LoginForm() {
  console.log("URL:", `${baseUrl}${loginEndpoint}`);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  async function onSubmit(values, { setSubmitting, setStatus }) {
    const url = `${baseUrl}${loginEndpoint}`;
    const data = {
      username: values.username,
      password: values.password,
    };

    try {
      console.log("URL:", `${baseUrl}${loginEndpoint}`);

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log("Login successful:", response.data);

      navigate("/");
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 404) {
          // ✅ Navigate to Not Found Page
          navigate("/not-found");
        } else if (status === 401) {
          // ✅ Unauthorized
          setStatus("Invalid credentials. Please try again.");
        } else if (status === 500) {
          // ✅ Internal server error
          setStatus("Server error. Please try later.");
        } else {
          // ✅ Generic error
          setStatus("Something went wrong. Please try again.");
        }
      } else {
        // Network ya axios ka issue
        setStatus("Network error. Please check your connection.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <DynamicForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      title="Login"
      submitLabel="Login"
    />
  );
}

export default LoginForm;
