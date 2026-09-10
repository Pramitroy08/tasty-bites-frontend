
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log("Registration Response:", response.data);

      setSuccess("Registration successful! Redirecting to login...");

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          "Registration failed. Please try again."
        );
      } else {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center px-4 py-10">

      {/* Decorative Background Elements */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl" />

      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />

      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg">

        {/* Brand / Header */}
        <div className="text-center mb-7">

          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-200 group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl">🍴</span>
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Tasty<span className="text-orange-500">Bites</span>
            </span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Create your account
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Join TastyBites and discover something delicious.
          </p>

        </div>


        {/* Registration Card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/70 shadow-2xl shadow-orange-100/60 p-6 sm:p-8 md:p-9">

          {/* Small Top Accent */}
          <div className="absolute top-0 left-10 right-10 h-1 rounded-b-full bg-gradient-to-r from-orange-400 via-red-500 to-orange-400" />


          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">

              <div className="w-6 h-6 shrink-0 rounded-full bg-red-100 flex items-center justify-center font-bold">
                !
              </div>

              <p className="leading-6">
                {error}
              </p>

            </div>
          )}


          {/* Success Message */}
          {success && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm">

              <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center font-bold">
                ✓
              </div>

              <p className="leading-6">
                {success}
              </p>

            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-5">

              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>

              <div className="relative">

                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                    />
                  </svg>
                </div>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-gray-50/70 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>


            {/* Email */}
            <div className="mb-5">

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">

                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.92l-7.5 4.687a2.25 2.25 0 01-2.36 0l-7.5-4.688a2.25 2.25 0 01-1.07-1.92V6.75"
                    />
                  </svg>
                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-gray-50/70 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>


            {/* Password */}
            <div className="mb-6">

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <span className="text-xs text-gray-400">
                  Min. 6 characters
                </span>

              </div>

              <div className="relative">

                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V7.125a4.125 4.125 0 00-8.25 0V10.5m-1.125 0h10.5A1.875 1.875 0 0119.5 12.375v6.75A1.875 1.875 0 0117.625 21h-11.25A1.875 1.875 0 014.5 19.125v-6.75A1.875 1.875 0 016.375 10.5z"
                    />
                  </svg>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  required
                  minLength="6"
                  className="w-full bg-gray-50/70 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>


            {/* Terms */}
            <div className="flex items-start gap-3 mb-6">

              <div className="mt-0.5 w-4 h-4 rounded border border-gray-300 bg-gray-50 shrink-0" />

              <p className="text-xs leading-5 text-gray-500">
                By creating an account, you agree to use TastyBites
                responsibly and keep your account information secure.
              </p>

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >

              <span className="relative z-10 flex items-center justify-center gap-2">

                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}

              </span>

            </button>

          </form>


          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Already a member?
            </span>

            <div className="flex-1 h-px bg-gray-200" />

          </div>


          {/* Login Link */}
          <Link
            to="/login"
            className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-200 bg-white/60 text-gray-700 font-semibold text-sm hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200"
          >
            Login to your account
          </Link>

        </div>


        {/* Back to Home */}
        <div className="text-center mt-6">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors"
          >
            <span className="text-lg">←</span>
            Back to Home
          </Link>

        </div>


        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} TastyBites. Made with ❤️ for food lovers.
        </p>

      </div>

    </div>
  );
}

export default Register;
