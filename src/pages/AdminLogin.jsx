import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth/login";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Admin login button clicked");

    setError("");
    setLoading(true);

    try {
      console.log("Sending admin login request...");
      console.log("Email:", formData.email);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log("Admin login response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Admin login failed"
        );
      }

      // Check whether the logged-in account is actually admin
      if (data.user.role !== "admin") {
        throw new Error(
          "Access denied. This account is not an admin."
        );
      }

      // Store authentication information
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log("Admin login successful");
      console.log("Admin user:", data.user);
      console.log("JWT token stored");

      alert("Admin login successful!");

      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.message || "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-rose-100 flex items-center justify-center px-4 py-8">

      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-rose-300/25 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>


      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-7">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25 mb-4">

            <span className="text-3xl">
              🍴
            </span>

          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Tasty<span className="text-orange-500">Bites</span>
          </h1>

          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Welcome back to your admin dashboard
          </p>

        </div>


        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/70 rounded-3xl shadow-2xl shadow-orange-900/10 p-6 sm:p-8">

          {/* Card Header */}
          <div className="mb-7">

            <div className="flex items-center gap-3 mb-2">

              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.577 0 4.958.7 7.002 1.92M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Admin Login
                </h2>

                <p className="text-xs text-gray-500">
                  Secure access to management panel
                </p>
              </div>

            </div>

          </div>


          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">

              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>{error}</span>

            </div>
          )}


          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">

                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                    />
                  </svg>

                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@tastybites.com"
                  required
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>


            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">

                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-11V7a4 4 0 10-8 0v4h8z"
                    />
                  </svg>

                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >

              <span className="flex items-center justify-center gap-2">

                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
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

                    Logging in...
                  </>
                ) : (
                  <>
                    Admin Login

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}

              </span>

            </button>

          </form>


          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">

            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 12c0 5.591 3.824 10.29 9 11.622C17.176 22.29 21 17.591 21 12c0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>

            Secure admin authentication

          </div>


          {/* Back to Website */}
          <div className="text-center mt-6 pt-5 border-t border-gray-200/70">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors duration-200"
            >

              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>

              Back to website

            </Link>

          </div>

        </div>


        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 TastyBites. Admin Portal.
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;