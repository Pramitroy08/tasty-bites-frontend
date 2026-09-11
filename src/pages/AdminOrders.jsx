
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/admin/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/admin/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderStatus: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update order status"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
              }
            : order
        )
      );
    } catch (err) {
      console.error("Update order status error:", err);

      setError(
        err.message || "Failed to update order status"
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatStatus = (status) => {
    return status
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-slate-100 text-slate-700 border-slate-200";

      case "confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "preparing":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "out_for_delivery":
        return "bg-violet-50 text-violet-700 border-violet-200";

      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>

          <p className="text-sm font-medium text-slate-600">
            Loading orders...
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Please wait while we fetch the latest orders
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 px-3 sm:px-5 lg:px-8 py-6 lg:py-8">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Order Management
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Orders
              </h2>

              <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
                View, monitor and manage all customer orders from one place.
              </p>
            </div>

            <button
              onClick={fetchOrders}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold shadow-lg shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h5M20 20v-5h-5M5.05 19A9 9 0 1019 5.05"
                />
              </svg>

              Refresh Orders
            </button>

          </div>
        </div>


        {/* Error */}
        {error && (
          <div className="mb-7 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl px-5 py-4 shadow-sm">

            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16a2 2 0 001.73 3z"
                />
              </svg>
            </div>

            <div>
              <p className="font-semibold text-sm">
                Something went wrong
              </p>

              <p className="text-sm mt-0.5">
                {error}
              </p>
            </div>

          </div>
        )}


        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mb-8">

          {/* Total */}
          <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">

            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-slate-100 group-hover:scale-110 transition-transform"></div>

            <div className="relative">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Orders
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {orders.length}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                All customer orders
              </p>
            </div>

          </div>


          {/* Pending */}
          <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-amber-200/70 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">

            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-amber-50 group-hover:scale-110 transition-transform"></div>

            <div className="relative">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pending Orders
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {
                      orders.filter(
                        (order) =>
                          order.orderStatus === "pending"
                      ).length
                    }
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Orders awaiting confirmation
              </p>

            </div>
          </div>


          {/* Delivered */}
          <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-emerald-200/70 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">

            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-emerald-50 group-hover:scale-110 transition-transform"></div>

            <div className="relative">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Delivered Orders
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {
                      orders.filter(
                        (order) =>
                          order.orderStatus === "delivered"
                      ).length
                    }
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Successfully completed orders
              </p>

            </div>
          </div>

        </div>


        {/* Orders */}
        {orders.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 sm:p-16 text-center shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-5">

              <svg
                className="w-7 h-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h13m-3 4a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>

            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No orders yet
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Customer orders will appear here once they are placed.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order._id}
                className="group bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300"
              >

                {/* Order Header */}
                <div className="px-5 sm:px-6 lg:px-7 py-5 bg-gradient-to-r from-slate-50/90 to-blue-50/40 border-b border-slate-200">

                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                    {/* Order Information */}
                    <div className="min-w-0">

                      <div className="flex items-center gap-2 mb-2">

                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Order ID
                        </p>

                      </div>

                      <p className="font-bold text-slate-900 break-all text-sm sm:text-base">
                        #{order._id}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        {formatDate(order.createdAt)}
                      </p>

                    </div>


                    {/* Customer */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold uppercase">
                          {(order.user?.name || "U")
                            .charAt(0)}
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                            Customer
                          </p>

                          <p className="font-semibold text-slate-900 mt-0.5">
                            {order.user?.name || "Unknown User"}
                          </p>

                          <p className="text-xs text-slate-500 truncate max-w-[220px]">
                            {order.user?.email || ""}
                          </p>
                        </div>

                      </div>


                      <span
                        className={`inline-flex items-center justify-center px-3.5 py-2 rounded-full border text-xs font-semibold whitespace-nowrap ${getStatusClass(
                          order.orderStatus
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>

                        {formatStatus(order.orderStatus)}
                      </span>

                    </div>

                  </div>

                </div>


                {/* Order Body */}
                <div className="p-5 sm:p-6 lg:p-7">

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Items */}
                    <div className="xl:col-span-2">

                      <div className="flex items-center justify-between mb-5">

                        <div>
                          <h3 className="font-bold text-slate-900">
                            Order Items
                          </h3>

                          <p className="text-xs text-slate-400 mt-1">
                            {order.items?.length || 0} item
                            {order.items?.length === 1 ? "" : "s"}
                          </p>
                        </div>

                      </div>


                      <div className="space-y-3">

                        {order.items?.map(
                          (item, index) => (

                            <div
                              key={index}
                              className="flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition"
                            >

                              <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                                {item.menuItem?.image ? (

                                  <img
                                    src={item.menuItem.image}
                                    alt={item.name}
                                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0 shadow-sm"
                                  />

                                ) : (

                                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-200 flex items-center justify-center text-[10px] text-slate-400 flex-shrink-0">
                                    No Image
                                  </div>

                                )}


                                <div className="min-w-0">

                                  <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                                    {item.name}
                                  </p>

                                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    ₹{item.price} ×{" "}
                                    {item.quantity}
                                  </p>

                                </div>

                              </div>


                              <p className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">
                                ₹{item.subtotal}
                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>


                    {/* Summary */}
                    <div>

                      <h3 className="font-bold text-slate-900 mb-5">
                        Order Summary
                      </h3>

                      <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 p-5">

                        <div className="space-y-4 text-sm">

                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              Payment
                            </span>

                            <span className="font-semibold text-slate-800 text-right">
                              {order.paymentMethod}
                            </span>

                          </div>


                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              Payment Status
                            </span>

                            <span className="font-semibold text-slate-800 text-right">
                              {formatStatus(
                                order.paymentStatus
                              )}
                            </span>

                          </div>


                          <div className="border-t border-slate-200 pt-4 flex items-end justify-between gap-4">

                            <span className="font-semibold text-slate-700">
                              Total Amount
                            </span>

                            <span className="text-2xl font-extrabold text-slate-900">
                              ₹{order.totalAmount}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Delivery Address */}
                  <div className="mt-8 pt-7 border-t border-slate-200">

                    <div className="flex items-center gap-2 mb-4">

                      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 21a2 2 0 01-2.828 0l-4.243-4.343a8 8 0 1111.314 0z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          Delivery Address
                        </h3>

                        <p className="text-xs text-slate-400">
                          Customer delivery information
                        </p>
                      </div>

                    </div>


                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 sm:p-5">

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Name
                          </p>

                          <p className="text-sm font-semibold text-slate-800">
                            {order.shippingAddress?.name}
                          </p>
                        </div>


                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Phone
                          </p>

                          <p className="text-sm font-medium text-slate-700">
                            {order.shippingAddress?.phone}
                          </p>
                        </div>


                        <div className="sm:col-span-2">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Address
                          </p>

                          <p className="text-sm text-slate-700">
                            {order.shippingAddress?.address}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.pincode}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Status Management */}
                  <div className="mt-8 pt-7 border-t border-slate-200">

                    <div className="rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200 p-5 sm:p-6">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>

                          <div className="flex items-center gap-2">

                            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">

                              <svg
                                className="w-4 h-4 text-slate-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 4v5h5M20 20v-5h-5M5.05 19A9 9 0 1019 5.05"
                                />
                              </svg>

                            </div>

                            <h3 className="font-bold text-slate-900">
                              Update Order Status
                            </h3>

                          </div>

                          <p className="text-xs sm:text-sm text-slate-500 mt-2">
                            Change the current order status to keep the customer updated.
                          </p>

                        </div>


                        <div className="w-full md:w-auto">

                          <select
                            value={order.orderStatus}
                            disabled={
                              updatingOrderId === order._id
                            }
                            onChange={(e) =>
                              updateOrderStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            className="w-full md:min-w-[230px] border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 bg-white text-sm font-medium text-slate-700 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition"
                          >

                            <option value="pending">
                              Pending
                            </option>

                            <option value="confirmed">
                              Confirmed
                            </option>

                            <option value="preparing">
                              Preparing
                            </option>

                            <option value="out_for_delivery">
                              Out for Delivery
                            </option>

                            <option value="delivered">
                              Delivered
                            </option>

                            <option value="cancelled">
                              Cancelled
                            </option>

                          </select>

                        </div>

                      </div>


                      {updatingOrderId === order._id && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-4">

                          <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin"></div>

                          Updating order status...

                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminOrders;
