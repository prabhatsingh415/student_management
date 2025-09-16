import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import AddStudent from "./components/AddStudent";
import UpdateCourse from "./components/UpdateCourse";
import DeleteStudent from "./components/DeleteStudent";
import GetStudents from "./components/GetStudents";
import Home from "./components/Home";

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token !== null && token !== "";
};

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="add-student"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-course"
            element={
              <ProtectedRoute>
                <UpdateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="get-students" // make sure URL matches exactly
            element={
              <ProtectedRoute>
                <GetStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="delete-student"
            element={
              <ProtectedRoute>
                <DeleteStudent />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
