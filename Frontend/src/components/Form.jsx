import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DynamicForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  title = "Form",
  submitLabel = "Submit",
}) => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  // ✅ Corrected handleSubmit
  const handleSubmit = async (values, actions) => {
    try {
      // ✅ Pass actions bhi parent ko
      await onSubmit(values, actions);
      setServerError("");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          navigate("/not-found");
        } else {
          setServerError(
            error.response.data?.message || "Something went wrong!"
          );
        }
      } else {
        setServerError("Network error! Please try again.");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6">
          {title}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {Object.keys(initialValues).map((key) => (
                <div key={key}>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>

                  <Field
                    name={key}
                    type={
                      key.toLowerCase().includes("password")
                        ? "password"
                        : "text"
                    }
                    placeholder={`Enter ${key}`}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 placeholder-gray-400"
                  />

                  <ErrorMessage
                    name={key}
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              ))}

              {serverError && (
                <div className="text-red-600 text-sm text-center font-medium">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-800 transition-all duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  submitLabel
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DynamicForm;
