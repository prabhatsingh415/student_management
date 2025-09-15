import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-700">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0 flex items-center">
            <span className="text-orange-600 text-6xl font-extrabold">S</span>
            <span className="text-white text-6xl font-extrabold">M</span>
            <span className="font-bold text-xl text-white ml-4">
              Student Management
            </span>
          </div>

          {/* Follow Us */}
          <div className="text-center">
            <h2 className="mb-4 text-sm font-semibold text-white uppercase">
              Follow us
            </h2>
            <div className="flex mt-2 space-x-5 justify-center">
              <Link
                to="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Github
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Twitter
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        <div className="text-center">
          <span className="text-sm text-gray-400">
            © 2025 Prabhat Singh | Learnzo Academy – Java Full Stack Assignment
          </span>
        </div>
      </div>
    </footer>
  );
}
