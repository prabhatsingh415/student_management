import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center px-4 lg:px-6 py-2.5">
        <Link to="/" className="flex items-center">
          <span className="text-orange-600 text-6xl font-extrabold">S</span>
          <span className="text-black  text-6xl font-extrabold">M</span>
          <span className="font-bold text-xl text-black ml-4">
            Student Management
          </span>
        </Link>

        <div className="flex items-center lg:order-2 gap-2">
          <Link
            to="#"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
          >
            Log in
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex lg:items-center lg:order-1">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 duration-200 ${
                    isActive
                      ? "text-orange-700"
                      : "text-gray-800 hover:text-orange-700"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-student"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 duration-200 ${
                    isActive
                      ? "text-orange-700"
                      : "text-gray-800 hover:text-orange-700"
                  }`
                }
              >
                Add Student
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/update-course"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 duration-200 ${
                    isActive
                      ? "text-orange-700"
                      : "text-gray-800 hover:text-orange-700"
                  }`
                }
              >
                Update Course
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/get-students"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 duration-200 ${
                    isActive
                      ? "text-orange-700"
                      : "text-gray-800 hover:text-orange-700"
                  }`
                }
              >
                Get Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/delete-student"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 duration-200 ${
                    isActive
                      ? "text-orange-700"
                      : "text-gray-800 hover:text-orange-700"
                  }`
                }
              >
                Delete Student
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
