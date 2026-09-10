import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const userName = user?.name || user?.fullName || "User";

  return (
    <nav className="w-full sticky top-0 z-50">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]" />

      {/* Subtle orange glow */}
      <div className="absolute -top-16 left-1/4 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 right-1/4 w-48 h-48 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[76px] flex items-center justify-between gap-4">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
          >
            {/* Logo Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400/20 blur-lg rounded-full group-hover:bg-orange-400/30 transition-all duration-300" />

              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
                <span className="text-xl sm:text-2xl">🍴</span>
              </div>
            </div>

            {/* Brand Name */}
            <div className="leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
                Tasty<span className="text-orange-500">Bites</span>
              </span>

              <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-gray-400 font-semibold mt-1">
                Taste • Quality • Happiness
              </span>
            </div>
          </Link>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* HOME */}
            <Link
              to="/"
              className="relative text-sm sm:text-base font-semibold text-gray-600 hover:text-orange-500 px-2.5 sm:px-3 py-2 rounded-xl transition-all duration-300 hover:bg-orange-50 group"
            >
              Home

              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-500 rounded-full group-hover:w-5 transition-all duration-300" />
            </Link>

            {/* ================= AUTHENTICATED USER ================= */}
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-3">

                {/* User Greeting */}
                <div className="hidden md:flex items-center gap-2.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200/80 rounded-2xl px-3.5 py-2 shadow-sm">
                  
                  {/* User Avatar */}
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>

                  <div className="leading-tight">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      Welcome back
                    </p>
                    <p className="text-sm font-bold text-gray-800 max-w-[120px] truncate">
                      {userName}
                    </p>
                  </div>
                </div>

                {/* CART */}
                <Link
                  to="/cart"
                  className="relative flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-600 hover:text-orange-600 px-2.5 sm:px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-all duration-300 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    🛒
                  </span>

                  <span className="hidden sm:inline">
                    Cart
                  </span>
                </Link>

                {/* MY ORDERS */}
                <Link
                  to="/orders"
                  className="hidden sm:flex items-center text-sm sm:text-base font-semibold text-gray-600 hover:text-orange-600 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-all duration-300"
                >
                  My Orders
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  className="text-sm sm:text-base font-semibold px-3 sm:px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all duration-300"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">↪</span>
                </button>
              </div>
            ) : (
              /* ================= GUEST USER ================= */
              <div className="flex items-center gap-1.5 sm:gap-2">

                {/* LOGIN */}
                <Link
                  to="/login"
                  className="text-sm sm:text-base font-semibold text-gray-600 hover:text-orange-600 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-all duration-300"
                >
                  Login
                </Link>

                {/* REGISTER */}
                <Link
                  to="/register"
                  className="relative overflow-hidden text-sm sm:text-base font-semibold px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <span className="relative z-10">
                    Register
                  </span>

                  {/* Hover shine */}
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </div>
            )}

            {/* ================= DIVIDER ================= */}
            <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-1" />

            {/* ================= ADMIN ================= */}
            <Link
              to="/admin/login"
              className="group flex items-center gap-1.5 text-sm sm:text-base font-semibold px-3 sm:px-4 py-2.5 rounded-xl border border-gray-200 bg-white/70 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg hover:shadow-gray-900/10 active:scale-95 transition-all duration-300"
            >
              <span className="text-base group-hover:scale-110 transition-transform">
                ⚙️
              </span>

              <span className="hidden xs:inline">
                Admin
              </span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;