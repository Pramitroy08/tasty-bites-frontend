import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊"
    },
    {
      name: "Menu Items",
      path: "/admin/menu-items",
      icon: "🍔"
    },
    {
      name: "Add Menu Item",
      path: "/admin/menu-items/add",
      icon: "➕"
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👥"
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "📦"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-amber-50/40 to-orange-50/60 text-slate-800 flex flex-col md:flex-row">

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden sticky top-0 z-30 bg-slate-950/95 backdrop-blur-xl text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shadow-xl">

        <div className="flex items-center gap-3">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-all duration-200"
          >
            <span className="text-lg">
              ☰
            </span>
          </button>

          <div>
            <div className="font-extrabold text-lg tracking-tight">
              🍴 TastyBites
            </div>

            <p className="text-[11px] text-slate-400 font-medium">
              Admin Management Suite
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="px-3.5 py-2 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all"
        >
          Logout
        </button>

      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[275px] text-white flex flex-col justify-between overflow-hidden
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        border-r border-white/10 shadow-2xl
        transform transition-transform duration-300 ease-out
        md:translate-x-0 md:sticky md:top-0 md:h-screen md:shadow-xl
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Decorative background */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">

          {/* ================= LOGO AREA ================= */}
          <div className="px-6 py-7 border-b border-white/10">

            <div className="flex items-start justify-between">

              <div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-2xl font-black tracking-tight hover:text-amber-400 transition-colors"
                >
                  <span className="text-2xl">🍴</span>
                  TastyBites
                </Link>

                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    ADMIN MANAGEMENT SUITE
                  </p>
                </div>
              </div>

              {/* Mobile Close */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                ✕
              </button>

            </div>

            {/* Admin badge */}
            <div className="mt-6 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/10">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/20">
                  🛡️
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Administrator
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Full platform access
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ================= NAVIGATION ================= */}
          <nav className="p-4 space-y-2">

            <p className="px-4 mb-3 text-[10px] uppercase tracking-[0.18em] text-slate-500 font-bold">
              Main Navigation
            </p>

            {menuItems.map((item) => {

              const isActive =
                location.pathname === item.path ||
                (item.path !== "/admin/dashboard" &&
                  location.pathname.startsWith(item.path + "/"));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >

                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-white/90" />
                  )}

                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                      isActive
                        ? "bg-white/15"
                        : "bg-white/[0.04] group-hover:bg-white/[0.08]"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="flex-1">
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="text-white/70 text-xs">
                      →
                    </span>
                  )}

                </Link>
              );
            })}

          </nav>

        </div>

        {/* ================= SIDEBAR FOOTER ================= */}
        <div className="relative p-4 border-t border-white/10">

          <Link
            to="/"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:bg-white/[0.06] hover:text-white transition-all"
          >

            <span className="w-9 h-9 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.08] flex items-center justify-center transition">
              ←
            </span>

            <span>
              Back to Website
            </span>

          </Link>

          <div className="mt-4 px-4 text-[10px] text-slate-600 tracking-wide">
            TASTYBITES ADMIN • v1.0
          </div>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ================= DESKTOP TOP BAR ================= */}
        <header className="hidden md:flex bg-white/75 backdrop-blur-xl border-b border-slate-200/70 px-8 py-5 items-center justify-between sticky top-0 z-20 shadow-sm">

          <div>

            <div className="flex items-center gap-2 mb-1">

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                System Online
              </span>

            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your restaurant catalog, users, and platform orders.
            </p>

          </div>

          <div className="flex items-center gap-3">

            {/* Admin Mode */}
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-100/80 px-4 py-2.5 rounded-xl border border-slate-200">
              <span>
                🛡️
              </span>

              <span>
                Admin Mode
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 hover:border-red-200 transition-all duration-200"
            >
              Logout
            </button>

          </div>

        </header>

        {/* ================= PAGE AREA ================= */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <div className="max-w-7xl mx-auto">

            {/* Decorative heading background */}
            <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-7 shadow-xl">

              {/* Glow effects */}
              <div className="absolute -right-20 -top-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl" />

              <div className="absolute -left-20 -bottom-32 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                <div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-amber-300 mb-3">
                    <span>✨</span>
                    TastyBites Control Center
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Welcome back, Admin
                  </h2>

                  <p className="text-sm text-slate-400 mt-2 max-w-xl">
                    Keep your restaurant operations organized and deliver a better experience to every customer.
                  </p>

                </div>

                <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 items-center justify-center text-3xl shadow-xl shadow-orange-500/20">
                  🍽️
                </div>

              </div>

            </div>

            {/* ================= CONTENT CARD ================= */}
            <div className="relative bg-slate-50/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden">

              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />

              <div className="p-5 sm:p-7 lg:p-8 min-h-[70vh]">

                <Outlet />

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;