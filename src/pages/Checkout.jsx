
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ORDER_API = "http://localhost:5000/api/orders";

function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

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
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login before placing an order."
        );
      }

      const response = await fetch(ORDER_API, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          ...formData,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      navigate("/order-success", {
        state: {
          order: data.order,
        },
      });

    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while placing the order."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 px-4 py-8 sm:px-6 lg:px-8">

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 -z-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl"></div>

      <div className="fixed bottom-0 right-0 -z-0 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl"></div>


      <div className="relative z-10 mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 sm:mb-10">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm backdrop-blur">

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
              🛒
            </span>

            Secure Checkout

          </div>


          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Complete Your Order
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Enter your delivery details and choose your
            preferred payment method to place your order.
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-red-700 shadow-sm">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
              ⚠️
            </div>

            <div>
              <p className="font-semibold">
                Unable to place order
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>

          </div>
        )}


        {/* ================= MAIN CARD ================= */}

        <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/75 shadow-[0_20px_60px_rgba(120,70,30,0.10)] backdrop-blur-xl">

          {/* Top Accent */}
          <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500"></div>


          <div className="p-5 sm:p-8 lg:p-10">

            <form onSubmit={handleSubmit}>

              {/* ================= DELIVERY INFORMATION ================= */}

              <div className="mb-8">

                <div className="mb-6 flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-2xl shadow-sm">
                    📍
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      Delivery Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Where should we deliver your food?
                    </p>
                  </div>

                </div>


                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Name */}

                  <div className="group">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <div className="relative">

                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        👤
                      </span>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                  </div>


                  {/* Phone */}

                  <div className="group">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <div className="relative">

                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        📞
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                  </div>


                  {/* Address */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Delivery Address
                    </label>

                    <div className="relative">

                      <span className="pointer-events-none absolute left-4 top-4 text-gray-400">
                        🏠
                      </span>

                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="House number, street, area"
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                  </div>


                  {/* City */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      City
                    </label>

                    <div className="relative">

                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        🌆
                      </span>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Enter city"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                  </div>


                  {/* Pincode */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Pincode
                    </label>

                    <div className="relative">

                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        📮
                      </span>

                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        placeholder="Enter pincode"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* Divider */}

              <div className="my-8 border-t border-gray-200"></div>


              {/* ================= PAYMENT ================= */}

              <div>

                <div className="mb-6 flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl shadow-sm">
                    💳
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      Payment Method
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Choose how you want to pay.
                    </p>
                  </div>

                </div>


                {/* COD Option */}

                <label
                  className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all duration-200 ${
                    paymentMethod === "COD"
                      ? "border-orange-400 bg-orange-50 shadow-md shadow-orange-100"
                      : "border-gray-200 bg-gray-50/70 hover:border-orange-200 hover:bg-orange-50/50"
                  }`}
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-5 w-5 accent-orange-500"
                  />


                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    💵
                  </div>


                  <div className="min-w-0 flex-1">

                    <p className="font-bold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay when your order arrives at your doorstep.
                    </p>

                  </div>


                  {paymentMethod === "COD" && (
                    <div className="hidden h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-sm text-white sm:flex">
                      ✓
                    </div>
                  )}

                </label>

              </div>


              {/* ================= SECURITY INFO ================= */}

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">

                <span className="text-lg">
                  🔒
                </span>

                <div>

                  <p className="text-sm font-semibold text-emerald-800">
                    Safe & Secure Checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Your delivery information is securely
                    processed and used only for fulfilling
                    your order.
                  </p>

                </div>

              </div>


              {/* ================= SUBMIT ================= */}

              <button
                type="submit"
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-orange-600 hover:to-rose-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order
                    <span className="text-lg">
                      →
                    </span>
                  </>
                )}

              </button>


              {/* Footer Note */}

              <p className="mt-4 text-center text-xs text-gray-500">
                By placing your order, you confirm that
                your delivery information is correct.
              </p>

            </form>

          </div>

        </div>


        {/* ================= BOTTOM TRUST SECTION ================= */}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/70 bg-white/50 p-4 text-center backdrop-blur">
            <div className="mb-1 text-xl">
              🚚
            </div>

            <p className="text-xs font-semibold text-gray-700">
              Fast Delivery
            </p>
          </div>


          <div className="rounded-2xl border border-white/70 bg-white/50 p-4 text-center backdrop-blur">
            <div className="mb-1 text-xl">
              🥗
            </div>

            <p className="text-xs font-semibold text-gray-700">
              Freshly Prepared
            </p>
          </div>


          <div className="rounded-2xl border border-white/70 bg-white/50 p-4 text-center backdrop-blur">
            <div className="mb-1 text-xl">
              ❤️
            </div>

            <p className="text-xs font-semibold text-gray-700">
              Made With Care
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
