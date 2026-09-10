
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMenuItems: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [orderStats, setOrderStats] = useState({
    pending: 0,
    confirmed: 0,
    preparing: 0,
    outForDelivery: 0,
    delivered: 0,
    cancelled: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/dashboard/stats",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load dashboard"
        );
      }

      setStats(data.stats);
      setOrderStats(data.orderStats);
      setRecentOrders(data.recentOrders || []);

    } catch (err) {
      console.error(
        "Dashboard error:",
        err
      );

      setError(
        err.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const formatStatus = (status) => {
    return status
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/70 to-rose-50 p-4 sm:p-6 lg:p-8 rounded-2xl">

      {/* Decorative Background */}
      <div className="fixed top-0 right-0 -z-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>


      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <div className="flex items-center gap-3 mb-2">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-200">
              <span className="text-white text-xl">
                📊
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h2>

          </div>

          <p className="text-gray-600 ml-1">
            Overview of your restaurant performance.
          </p>
        </div>


        <button
          onClick={fetchDashboard}
          className="self-start lg:self-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl font-semibold text-gray-700 shadow-sm hover:shadow-md hover:bg-white hover:border-orange-200 transition-all duration-200 active:scale-95"
        >
          <span className="text-lg">↻</span>
          Refresh
        </button>

      </div>


      {/* Error */}
      {error && (
        <div className="relative z-10 mb-7 bg-red-50/90 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl px-5 py-4 shadow-sm flex items-start gap-3">

          <span className="text-lg">
            ⚠️
          </span>

          <div>
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="text-sm mt-1">
              {error}
            </p>
          </div>

        </div>
      )}


      {/* Main Stats */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Users */}
        <div className="group bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Users
              </p>

              <p className="text-3xl font-extrabold text-gray-900 mt-3">
                {stats.totalUsers}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Registered customers
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
              👥
            </div>

          </div>

        </div>


        {/* Menu Items */}
        <div className="group bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Menu Items
              </p>

              <p className="text-3xl font-extrabold text-gray-900 mt-3">
                {stats.totalMenuItems}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Available food items
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-xl">
              🍽️
            </div>

          </div>

        </div>


        {/* Orders */}
        <div className="group bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Orders
              </p>

              <p className="text-3xl font-extrabold text-gray-900 mt-3">
                {stats.totalOrders}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Orders received
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
              🛍️
            </div>

          </div>

        </div>


        {/* Revenue */}
        <div className="group bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-white">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-orange-100">
                Total Revenue
              </p>

              <p className="text-3xl font-extrabold mt-3">
                ₹{stats.totalRevenue}
              </p>

              <p className="text-xs text-orange-100 mt-2">
                Overall restaurant revenue
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
              ₹
            </div>

          </div>

        </div>

      </div>


      {/* Order Status */}
      <div className="relative z-10 bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Order Status
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Current order distribution
            </p>
          </div>

          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-orange-50 items-center justify-center">
            📦
          </div>

        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">

          {/* Pending */}
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-100 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-amber-700">
                Pending
              </p>
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900 mt-3">
              {orderStats.pending}
            </p>
          </div>


          {/* Confirmed */}
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-100 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-blue-700">
                Confirmed
              </p>
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900 mt-3">
              {orderStats.confirmed}
            </p>
          </div>


          {/* Preparing */}
          <div className="rounded-xl p-4 bg-purple-50 border border-purple-100 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-purple-700">
                Preparing
              </p>
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900 mt-3">
              {orderStats.preparing}
            </p>
          </div>


          {/* Out for Delivery */}
          <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-100 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-indigo-700">
                Out for Delivery
              </p>
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900 mt-3">
              {orderStats.outForDelivery}
            </p>
          </div>


          {/* Delivered */}
          <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-100 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-emerald-700">
                Delivered
              </p>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900 mt-3">
              {orderStats.delivered}
            </p>
          </div>


          {/* Cancelled */}
          <div className="rounded-xl p-4 bg-red-50 border border-red-100 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-red-700">
                Cancelled
              </p>
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900 mt-3">
              {orderStats.cancelled}
            </p>
          </div>

        </div>

      </div>


      {/* Recent Orders */}
      <div className="relative z-10 bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl overflow-hidden shadow-sm">

        <div className="p-5 sm:p-6 border-b border-gray-100">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Recent Orders
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Latest customer orders.
              </p>
            </div>

            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-orange-50 items-center justify-center">
              🧾
            </div>

          </div>

        </div>


        {recentOrders.length === 0 ? (

          <div className="p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 flex items-center justify-center text-2xl mb-4">
              📭
            </div>

            <p className="font-semibold text-gray-700">
              No orders available
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Recent customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[760px]">

              <thead className="bg-orange-50/60">

                <tr>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">
                    Order
                  </th>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">
                    Total
                  </th>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-t border-gray-100 hover:bg-orange-50/30 transition-colors"
                  >

                    <td className="px-6 py-5">

                      <p className="font-bold text-gray-800">
                        #{order._id.slice(-8)}
                      </p>

                    </td>


                    <td className="px-6 py-5">

                      <p className="font-semibold text-gray-800">
                        {order.user?.name ||
                          "Unknown"}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {order.user?.email ||
                          ""}
                      </p>

                    </td>


                    <td className="px-6 py-5">

                      <span className="font-bold text-gray-800">
                        ₹{order.totalAmount}
                      </span>

                    </td>


                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold
                          ${
                            order.orderStatus === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : order.orderStatus === "confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : order.orderStatus === "preparing"
                              ? "bg-purple-100 text-purple-700"
                              : order.orderStatus === "out_for_delivery"
                              ? "bg-indigo-100 text-indigo-700"
                              : order.orderStatus === "delivered"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.orderStatus === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>

                        {formatStatus(
                          order.orderStatus
                        )}
                      </span>

                    </td>


                    <td className="px-6 py-5 text-sm text-gray-500">
                      {formatDate(
                        order.createdAt
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;
