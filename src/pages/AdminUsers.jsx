
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users"
        );
      }

      setUsers(data.users || []);

    } catch (error) {
      console.error("Fetch users error:", error);

      setError(
        error.message || "Unable to load users"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  const handleStatusChange = async (user) => {
    const newStatus =
      user.status === "active"
        ? "inactive"
        : "active";

    const action =
      newStatus === "active"
        ? "activate"
        : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${user.name}?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/${user._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item._id === user._id
            ? {
                ...item,
                status: newStatus
              }
            : item
        )
      );

    } catch (error) {
      alert(
        error.message || "Failed to update user"
      );
    }
  };


  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete user"
        );
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (item) => item._id !== user._id
        )
      );

      alert("User deleted successfully!");

    } catch (error) {
      alert(
        error.message || "Failed to delete user"
      );
    }
  };


  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/50 px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur">

                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>

                ADMINISTRATION

              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Users
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage registered users, monitor account status,
                and control access to the platform.
              </p>

            </div>


            {/* User Count */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  />
                </svg>

              </div>

              <div>

                <p className="text-xs font-medium text-slate-400">
                  Total Users
                </p>

                <p className="text-lg font-bold text-slate-800">
                  {users.length}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Search Card */}

        <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur sm:p-5">

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div className="w-full md:max-w-xl">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Search Users
              </label>

              <div className="relative">

                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path
                    strokeLinecap="round"
                    d="M20 20l-4-4"
                  />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search by name, email or role..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    ×
                  </button>
                )}

              </div>

            </div>


            <div className="text-sm text-slate-500">

              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredUsers.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {users.length}
              </span>{" "}
              users

            </div>

          </div>

        </div>


        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-12 text-center shadow-sm backdrop-blur">

            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

            <p className="text-sm font-medium text-slate-600">
              Loading users...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Please wait while we retrieve the user accounts.
            </p>

          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50/70 p-10 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">

              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M10.3 3.9L2.6 17a2 2 0 001.7 3h15.4a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
                />
              </svg>

            </div>

            <p className="mb-1 text-lg font-semibold text-red-700">
              Unable to load users
            </p>

            <p className="mb-5 text-sm text-red-500">
              {error}
            </p>

            <button
              onClick={fetchUsers}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
            >
              Try Again
            </button>

          </div>
        )}


        {/* Users Table */}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur">

            {/* Table Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

              <div>

                <h3 className="text-base font-bold text-slate-800">
                  Registered Users
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Account management and access controls
                </p>

              </div>

              <div className="hidden rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 sm:block">
                {filteredUsers.length} Records
              </div>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px] text-left">

                <thead className="border-b border-slate-100 bg-slate-50/80">

                  <tr>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      User
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredUsers.length > 0 ? (

                    filteredUsers.map((user) => (

                      <tr
                        key={user._id}
                        className="group transition hover:bg-indigo-50/30"
                      >

                        {/* User */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 text-sm font-bold text-indigo-700">

                              {user.name
                                ? user.name
                                    .charAt(0)
                                    .toUpperCase()
                                : "U"}

                            </div>

                            <div>

                              <p className="font-semibold text-slate-800">
                                {user.name}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                User account
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Email */}

                        <td className="px-6 py-5">

                          <span className="text-sm text-slate-600">
                            {user.email}
                          </span>

                        </td>


                        {/* Role */}

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
                                : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                            }`}
                          >

                            {user.role === "admin" && (
                              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-violet-500"></span>
                            )}

                            {user.role}

                          </span>

                        </td>


                        {/* Status */}

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                              user.status === "active"
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                                : "bg-amber-50 text-amber-700 ring-amber-100"
                            }`}
                          >

                            <span
                              className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                user.status === "active"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            ></span>

                            {user.status}

                          </span>

                        </td>


                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex flex-wrap gap-2">

                            {user.role !== "admin" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(user)
                                }
                                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition active:scale-[0.97] ${
                                  user.status === "active"
                                    ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                }`}
                              >
                                {user.status === "active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>
                            )}


                            {user.role !== "admin" && (
                              <button
                                onClick={() =>
                                  handleDelete(user)
                                }
                                className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 active:scale-[0.97]"
                              >
                                Delete
                              </button>
                            )}


                            {user.role === "admin" && (
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-400">

                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  viewBox="0 0 24 24"
                                >
                                  <rect
                                    width="18"
                                    height="11"
                                    x="3"
                                    y="10"
                                    rx="2"
                                  />

                                  <path
                                    strokeLinecap="round"
                                    d="M7 10V7a5 5 0 0110 0v3"
                                  />
                                </svg>

                                Protected

                              </span>
                            )}

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="px-6 py-20 text-center"
                      >

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

                          <svg
                            className="h-7 w-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="11"
                              cy="11"
                              r="7"
                            />

                            <path
                              strokeLinecap="round"
                              d="M20 20l-4-4"
                            />
                          </svg>

                        </div>

                        <p className="mt-4 text-sm font-semibold text-slate-700">
                          No users found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing your search criteria.
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* Mobile Scroll Hint */}

            <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 text-center text-xs text-slate-400 sm:hidden">
              Swipe horizontally to view all columns
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminUsers;
