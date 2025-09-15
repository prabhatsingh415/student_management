import { Link } from "react-router-dom";
import classroom from "../assets/classroom.jpg"; // koi bhi suitable image

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl mb-32">
      <aside className="relative overflow-hidden rounded-lg sm:mx-16 mx-2 sm:py-16 bg-white shadow-lg">
        <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
            <div className="max-w-xl space-y-6 text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-black">
                Manage Students{" "}
                <span className="text-4xl hidden sm:inline">Effortlessly</span>
              </h1>
              <p className="text-gray-700 sm:text-lg">
                Add, update, delete, and view all your students in one
                easy-to-use system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center sm:justify-start">
                <Link
                  to="/add-student"
                  className="inline-flex items-center px-6 py-3 font-medium bg-orange-600 text-white rounded-lg hover:opacity-75 transition"
                >
                  Add Student
                </Link>
                <Link
                  to="/get-student"
                  className="inline-flex items-center px-6 py-3 font-medium bg-orange-600 text-white rounded-lg hover:opacity-75 transition"
                >
                  Get Students
                </Link>
                <Link
                  to="/update-course"
                  className="inline-flex items-center px-6 py-3 font-medium bg-orange-600 text-white rounded-lg hover:opacity-75 transition"
                >
                  Update Course
                </Link>
                <Link
                  to="/delete-student"
                  className="inline-flex items-center px-6 py-3 font-medium bg-orange-600 text-white rounded-lg hover:opacity-75 transition"
                >
                  Delete Student
                </Link>
              </div>
            </div>

            <div className="mt-10 sm:mt-0 sm:flex-shrink-0">
              <img
                className="w-80 sm:w-96 object-cover rounded-lg shadow-lg"
                src={classroom}
                alt="Students illustration"
              />
            </div>
          </div>
        </div>
      </aside>

      <section className="mt-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-black">
          Keep your student data organized
        </h2>
        <p className="mt-4 text-gray-700 sm:text-lg max-w-2xl mx-auto">
          Easily track courses, update records, and manage student information
          in real-time with our system.
        </p>
      </section>
    </div>
  );
}
