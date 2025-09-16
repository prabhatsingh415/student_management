import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const getStudentsEndpoint = import.meta.env.VITE_GET_STUDENTS;

function GetStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${baseUrl}${getStudentsEndpoint}?token=${token}`
        );

        if (res.data?.status === "success" && Array.isArray(res.data.data)) {
          const mappedStudents = res.data.data.map((s) => ({
            id: s.id,
            name: s.name || "-",
            email: s.email || "-",
            dateOfJoining: s.dateOfJoining || "-",
            courseName: s.courseName || "-",
            courseDescription: s.courseDescription || "-",
          }));
          setStudents(mappedStudents);
        } else {
          setError("Unexpected API response");
        }
      } catch (err) {
        setError(err.response?.data?.message || "⚠️ Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6 h-auto min-h-[30rem] relative">
      <Loader show={loading} />

      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        All Students
      </h2>

      {error && (
        <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
      )}

      {!loading && students.length === 0 && (
        <p className="text-center text-gray-500">No students found.</p>
      )}

      {!loading && students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 shadow-md">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Date of Joining</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-2">{s.id}</td>
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.dateOfJoining}</td>
                  <td className="px-4 py-2">{s.courseName}</td>
                  <td className="px-4 py-2">{s.courseDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GetStudents;
