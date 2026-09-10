
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
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

  const formatStatus = (status) => {
    return status
      .split("_")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-slate-100 text-slate-700 border border-slate-200";

      case "confirmed":
        return "bg-blue-50 text-blue-700 border border-blue-100";

      case "preparing":
        return "bg-amber-50 text-amber-700 border border-amber-100";

      case "out_for_delivery":
        return "bg-purple-50 text-purple-700 border border-purple-100";

      case "delivered":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";

      case "cancelled":
        return "bg-red-50 text-red-700 border border-red-100";

      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>

          <p className="mt-5 text-sm font-medium text-slate-600">
            Loading your orders...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-[#fffaf3] to-rose-50">

      {/* Decorative Background */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute top-[35%] -left-40 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute bottom-0 right-[10%] w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>


      {/* Header */}
      <header className="relative border-b border-orange-100/70 bg-white/60 backdrop-blur-xl">

        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/70 text-orange-700 text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                TastyBites
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mt-5">
                My Orders
              </h1>

              <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-xl">
                Track your delicious orders, check their status and
                review your order details.
              </p>

            </div>

            {orders.length > 0 && !error && (
              <div className="self-start sm:self-auto bg-white/80 backdrop-blur-sm border border-orange-100 rounded-2xl px-5 py-4 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Orders
                </p>

                <p className="text-2xl font-black text-slate-900 mt-1">
                  {orders.length}
                </p>

              </div>
            )}

          </div>

        </div>

      </header>


      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-5 sm:px-6 py-8 sm:py-12">


        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50/90 backdrop-blur-sm px-5 py-4 shadow-sm">

            <div className="flex items-start gap-3">

              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-red-600 font-bold">!</span>
              </div>

              <div>
                <p className="font-semibold text-red-800">
                  Unable to load orders
                </p>

                <p className="text-sm text-red-600 mt-1">
                  {error}
                </p>
              </div>

            </div>

          </div>
        )}


        {/* No Orders */}
        {!error && orders.length === 0 && (

          <div className="relative bg-white/75 backdrop-blur-xl border border-white rounded-3xl shadow-xl shadow-orange-100/40 p-8 sm:p-16 text-center overflow-hidden">

            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400"></div>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 flex items-center justify-center">

              <span className="text-4xl">
                🍽️
              </span>

            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-6">
              No orders yet
            </h2>

            <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm sm:text-base">
              Your order history will appear here once you place
              your first order.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center justify-center mt-7 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-orange-500/20"
            >
              Explore Menu
              <span className="ml-2">→</span>
            </Link>

          </div>

        )}


        {/* Orders */}
        {!error && orders.length > 0 && (

          <div className="space-y-7">

            {orders.map((order) => (

              <article
                key={order._id}
                className="group relative bg-white/80 backdrop-blur-xl border border-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300"
              >

                {/* Top Accent */}
                <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400"></div>


                {/* Order Header */}
                <div className="p-5 sm:p-7 border-b border-slate-100">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div className="min-w-0">

                      <div className="flex items-center gap-2 mb-2">

                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>

                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Order ID
                        </p>

                      </div>

                      <p className="font-bold text-slate-900 text-sm sm:text-base break-all">
                        #{order._id}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Placed on {formatDate(order.createdAt)}
                      </p>

                    </div>


                    <span
                      className={`inline-flex self-start lg:self-center items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >

                      <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>

                      {formatStatus(order.orderStatus)}

                    </span>

                  </div>

                </div>


                {/* Items */}
                <div className="p-5 sm:p-7">

                  <div className="flex items-center justify-between mb-5">

                    <h2 className="font-bold text-slate-900">
                      Order Items
                    </h2>

                    <span className="text-xs font-medium text-slate-400">
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1 ? "item" : "items"}
                    </span>

                  </div>


                  <div className="space-y-3">

                    {order.items?.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-orange-50/50 hover:border-orange-100 transition-colors"
                      >

                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                          {item.menuItem?.image ? (

                            <img
                              src={item.menuItem.image}
                              alt={item.name}
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 shadow-sm"
                            />

                          ) : (

                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400 shrink-0">
                              No Image
                            </div>

                          )}

                          <div className="min-w-0">

                            <p className="font-semibold text-slate-900 truncate">
                              {item.name}
                            </p>

                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                              ₹{item.price} × {item.quantity}
                            </p>

                          </div>

                        </div>


                        <p className="font-bold text-slate-900 whitespace-nowrap">
                          ₹{item.subtotal}
                        </p>

                      </div>

                    ))}

                  </div>


                  {/* Total */}
                  <div className="mt-7 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/10">

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                          Total Amount
                        </p>

                        <p className="text-sm text-slate-300 mt-1">
                          Final order total
                        </p>

                      </div>

                      <span className="text-2xl sm:text-3xl font-black">
                        ₹{order.totalAmount}
                      </span>

                    </div>

                  </div>


                  {/* Payment */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-orange-50/70 border border-orange-100 p-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          💳
                        </div>

                        <div>

                          <p className="text-[11px] uppercase tracking-widest font-bold text-orange-600">
                            Payment Method
                          </p>

                          <p className="font-semibold text-slate-900 mt-1">
                            {order.paymentMethod}
                          </p>

                        </div>

                      </div>

                    </div>


                    <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          ✓
                        </div>

                        <div>

                          <p className="text-[11px] uppercase tracking-widest font-bold text-emerald-600">
                            Payment Status
                          </p>

                          <p className="font-semibold text-slate-900 mt-1">
                            {formatStatus(order.paymentStatus)}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Delivery Address */}
                  <div className="mt-6 rounded-2xl bg-slate-50/80 border border-slate-100 p-5 sm:p-6">

                    <div className="flex items-start gap-4">

                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                        📍
                      </div>

                      <div className="min-w-0">

                        <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
                          Delivery Address
                        </p>

                        <p className="font-bold text-slate-900 mt-2">
                          {order.shippingAddress?.name}
                        </p>

                        <p className="text-sm text-slate-600 mt-1">
                          {order.shippingAddress?.phone}
                        </p>

                        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                          {order.shippingAddress?.address}
                        </p>

                        <p className="text-sm text-slate-600">
                          {order.shippingAddress?.city},{" "}
                          {order.shippingAddress?.pincode}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>


      {/* Footer Navigation */}
      <footer className="relative max-w-6xl mx-auto px-5 sm:px-6 pb-10 sm:pb-14">

        <div className="border-t border-orange-100 pt-7">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <span className="text-lg">←</span>
            Back to Home
          </Link>

        </div>

      </footer>

    </div>
  );
}

export default Orders;
