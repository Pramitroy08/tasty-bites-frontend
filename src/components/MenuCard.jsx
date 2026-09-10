import { useState } from "react";
import { Link } from "react-router-dom";

function MenuCard({ item }) {
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    // User must be logged in
    if (!token) {
      setMessage("Please login to add items to cart.");
      return;
    }

    try {
      setAdding(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/cart/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            menuItemId: item._id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add item to cart"
        );
      }

      setMessage("Added to cart ✓");

    } catch (error) {
      console.error("Add to cart error:", error);

      setMessage(
        error.message || "Something went wrong"
      );

    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-gray-200/80 bg-white shadow-[0_8px_35px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.14)]">

      {/* =====================================================
          IMAGE SECTION
      ====================================================== */}
      <div className="relative h-56 overflow-hidden sm:h-60 md:h-56 lg:h-60 xl:h-64">

        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Dark Image Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/5" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


        {/* =====================================================
            CATEGORY BADGE
        ====================================================== */}
        {item.category && (
          <div className="absolute left-4 top-4">

            <span className="inline-flex items-center rounded-full border border-white/30 bg-black/45 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md sm:text-[11px]">
              {item.category}
            </span>

          </div>
        )}


        {/* =====================================================
            AVAILABILITY BADGE
        ====================================================== */}
        <div className="absolute right-4 top-4">

          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-bold shadow-lg backdrop-blur-md sm:text-[11px] ${
              item.availability
                ? "border-green-300/30 bg-green-500/90 text-white"
                : "border-red-300/30 bg-red-500/90 text-white"
            }`}
          >

            <span
              className={`h-1.5 w-1.5 rounded-full ${
                item.availability
                  ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "bg-white"
              }`}
            />

            {item.availability
              ? "Available"
              : "Unavailable"}

          </span>

        </div>


        {/* =====================================================
            PRICE OVERLAY
        ====================================================== */}
        <div className="absolute bottom-4 left-4">

          <div className="rounded-2xl border border-white/20 bg-black/55 px-4 py-2.5 shadow-xl backdrop-blur-md">

            <p className="text-[10px] font-medium uppercase tracking-wider text-white/65">
              Price
            </p>

            <p className="mt-0.5 text-xl font-extrabold tracking-tight text-white">
              ₹{item.price}
            </p>

          </div>

        </div>


        {/* =====================================================
            VIEW DETAILS FLOATING BUTTON
        ====================================================== */}
        <Link
          to={`/menu/${item._id}`}
          className="absolute bottom-4 right-4 flex translate-y-3 items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-3.5 py-2.5 text-xs font-bold text-gray-900 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-orange-500 hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12Z"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          View Details

        </Link>

      </div>


      {/* =====================================================
          CONTENT SECTION
      ====================================================== */}
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">

        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative">

          {/* Food Name */}
          <h3 className="line-clamp-1 text-xl font-extrabold tracking-tight text-gray-900 sm:text-[23px]">
            {item.name}
          </h3>


          {/* Description */}
          {item.description && (
            <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500 sm:text-[15px]">
              {item.description}
            </p>
          )}

        </div>


        {/* =====================================================
            PRICE + ACTION SECTION
        ====================================================== */}
        <div className="relative mt-auto pt-6">

          <div className="flex flex-col gap-4">

            {/* Price */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m3-9.5c0-1.1-1.34-2-3-2s-3 .9-3 2 1.34 2 3 2 3 .9 3 2-1.34 2-3 2-3-.9-3-2"
                    />
                  </svg>

                </div>


                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Starting from
                  </p>

                  <p className="text-xl font-extrabold tracking-tight text-gray-900">
                    ₹{item.price}
                  </p>

                </div>

              </div>


              {/* Availability Text */}
              <div
                className={`hidden rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:block ${
                  item.availability
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {item.availability
                  ? "In Stock"
                  : "Unavailable"}
              </div>

            </div>


            {/* =================================================
                ACTION BUTTONS
            ================================================== */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[auto_1fr]">

              {/* View Details Button */}
              <Link
                to={`/menu/${item._id}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 active:translate-y-0"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12Z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <span>View Details</span>

              </Link>


              {/* Add To Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={adding || !item.availability}
                className={`group/button flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition-all duration-300 ${
                  !item.availability
                    ? "cursor-not-allowed bg-gray-200 text-gray-500"
                    : adding
                    ? "cursor-wait bg-gray-800 text-white"
                    : "bg-gradient-to-r from-gray-950 to-gray-800 text-white hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-500 hover:shadow-lg hover:shadow-orange-500/20 active:translate-y-0"
                }`}
              >

                {!item.availability ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 5.636 5.636 18.364M5.636 5.636l12.728 12.728"
                      />
                    </svg>

                    <span>Unavailable</span>
                  </>
                ) : adding ? (
                  <>
                    {/* Loading Spinner */}
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    {/* Cart Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover/button:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0a2.25 2.25 0 0 0-2.25 2.25v.75h13.5v-.75a2.25 2.25 0 0 0-2.25-2.25m-9.75 0L5.106 5.272m0 0h14.268c.857 0 1.494.793 1.32 1.632l-1.5 7.125a1.125 1.125 0 0 1-1.1.893H7.5M7.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9.75 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                      />
                    </svg>

                    <span>Add to Cart</span>
                  </>
                )}

              </button>

            </div>

          </div>


          {/* =================================================
              SUCCESS / ERROR MESSAGE
          ================================================== */}
          {message && (
            <div
              className={`mt-4 flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm font-medium ${
                message === "Added to cart ✓"
                  ? "border-green-100 bg-green-50 text-green-700"
                  : "border-red-100 bg-red-50 text-red-600"
              }`}
            >

              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  message === "Added to cart ✓"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {message === "Added to cart ✓"
                  ? "✓"
                  : "!"}
              </span>

              <span>{message}</span>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default MenuCard;