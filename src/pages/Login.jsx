
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Normal user login must NOT accept admin accounts
      if (data.user.role === "admin") {
        throw new Error(
          "Admin account detected. Please use the Admin Login page."
        );
      }

      // Context login functionality remains unchanged
      login(data.token, data.user);

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fffaf5] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

      {/* Decorative background elements */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-100/50 rounded-full blur-3xl" />

      {/* Main container */}
      <div className="relative w-full max-w-5xl">

        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_25px_80px_rgba(120,53,15,0.12)]">

          {/* LEFT - Branding / Visual Section */}
          <div className="hidden lg:flex relative min-h-[650px] overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-12 flex-col justify-between text-white">

            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
            <div className="absolute bottom-20 -left-28 w-72 h-72 rounded-full bg-white/10" />
            <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-white/10" />

            {/* Branding */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl">
                  🍴
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    TastyBites
                  </h1>
                  <p className="text-orange-100 text-xs">
                    Taste. Comfort. Happiness.
                  </p>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-md">

              <div className="text-6xl mb-8">
                🍕
              </div>

              <h2 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
                Good food.
                <br />
                Great moments.
              </h2>

              <p className="mt-6 text-orange-50/90 text-base leading-7 max-w-sm">
                Discover delicious meals, explore your favorites, and
                experience food that makes every moment special.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm backdrop-blur-sm">
                  ✨ Freshly prepared
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm backdrop-blur-sm">
                  ❤️ Made with love
                </span>
              </div>
            </div>

            {/* Bottom text */}
            <div className="relative z-10 text-sm text-orange-100">
              © {new Date().getFullYear()} TastyBites
            </div>
          </div>

          {/* RIGHT - Login Form */}
          <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex items-center">

            <div className="w-full max-w-md mx-auto">

              {/* Mobile branding */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl shadow-lg shadow-orange-200">
                  🍴
                </div>

                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    TastyBites
                  </h1>

                  <p className="text-xs text-gray-500">
                    Taste. Comfort. Happiness.
                  </p>
                </div>

              </div>

              {/* Header */}
              <div className="text-center lg:text-left">

                <p className="text-orange-600 font-semibold text-sm tracking-wide uppercase">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-gray-500 text-sm sm:text-base">
                  Continue your delicious journey with TastyBites.
                </p>

              </div>

              {/* Error message */}
              {error && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600">

                  <span className="text-base mt-0.5">
                    ⚠️
                  </span>

                  <p className="leading-5">
                    {error}
                  </p>

                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email address
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      ✉
                    </span>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full h-13 border border-gray-200 bg-gray-50/70 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />

                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      🔒
                    </span>

                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className="w-full h-13 border border-gray-200 bg-gray-50/70 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />

                  </div>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </span>

                </button>

              </form>

              {/* Divider */}
              <div className="relative my-7">

                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs text-gray-400">
                    New to TastyBites?
                  </span>
                </div>

              </div>

              {/* Register */}
              <p className="text-center text-sm text-gray-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-4 transition-colors"
                >
                  Create an account
                </Link>

              </p>

              {/* Trust indicator */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span className="text-green-500">
                  ●
                </span>
                Secure account authentication
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
