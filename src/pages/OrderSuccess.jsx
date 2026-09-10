
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-xl">

        <div className="bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_20px_60px_rgba(120,53,15,0.12)] rounded-3xl px-6 py-8 sm:px-10 sm:py-10 text-center">

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">

              <div className="absolute inset-0 bg-emerald-200 rounded-full blur-xl opacity-50"></div>

              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200/60">

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/50 flex items-center justify-center">

                  <span className="text-3xl sm:text-4xl text-white font-bold leading-none">
                    ✓
                  </span>

                </div>

              </div>

            </div>
          </div>


          {/* Heading */}
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-emerald-600 mb-2">
              Order Confirmed
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Order Placed Successfully!
            </h1>

            <p className="text-gray-500 mt-3 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Thank you for ordering from TastyBites.
              <br className="hidden sm:block" />
              Your delicious meal is now on its way to you.
            </p>
          </div>


          {/* Order Details */}
          {order && (
            <div className="mt-8 text-left">

              <div className="flex items-center justify-between mb-3 px-1">

                <h2 className="text-sm font-bold text-gray-900">
                  Order Summary
                </h2>

                <span className="text-xs font-medium text-gray-400">
                  TastyBites
                </span>

              </div>


              <div className="bg-gradient-to-br from-gray-50 to-orange-50/60 border border-orange-100/80 rounded-2xl p-5 sm:p-6 shadow-sm">

                {/* Order ID */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 pb-4 border-b border-gray-200/70">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      #
                    </div>

                    <span className="text-sm text-gray-500">
                      Order ID
                    </span>

                  </div>

                  <span className="font-semibold text-gray-900 text-xs sm:text-sm break-all sm:text-right">
                    {order._id}
                  </span>

                </div>


                {/* Total */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200/70">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      ₹
                    </div>

                    <span className="text-sm text-gray-500">
                      Total Amount
                    </span>

                  </div>

                  <span className="font-extrabold text-lg text-gray-900">
                    ₹{order.totalAmount}
                  </span>

                </div>


                {/* Payment */}
                <div className="flex items-center justify-between pt-4">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      💳
                    </div>

                    <span className="text-sm text-gray-500">
                      Payment Method
                    </span>

                  </div>

                  <span className="font-semibold text-gray-900 text-sm">
                    {order.paymentMethod}
                  </span>

                </div>

              </div>

            </div>
          )}


          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <Link
              to="/menu"
              className="flex-1 bg-gray-900 text-white py-3.5 px-5 rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-gray-900/10 hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="flex-1 bg-white/70 border border-gray-200 text-gray-800 py-3.5 px-5 rounded-xl font-semibold text-sm sm:text-base hover:bg-white hover:border-gray-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              View My Orders
            </Link>

          </div>


          {/* Footer Note */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">

            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>

            <span>
              Your order has been successfully recorded
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;
