
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MenuDetails() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMenuItem = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Menu item not found"
        );
      }

      setMenuItem(data.menuItem);

    } catch (error) {
      console.error(
        "Fetch menu item error:",
        error
      );

      setError(
        error.message || "Unable to load menu item"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItem();
  }, [id]);


  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center px-6">

        <div className="text-center">

          {/* Loading Spinner */}
          <div className="relative mx-auto mb-5 w-14 h-14">

            <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>

            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>

          </div>

          <p className="text-gray-600 font-medium">
            Loading menu item...
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Preparing something delicious
          </p>

        </div>

      </div>
    );
  }


  // Error
  if (error || !menuItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center px-6">

        <div className="w-full max-w-lg">

          <div className="relative bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl p-8 md:p-10 text-center">

            {/* Decorative Circle */}
            <div className="mx-auto w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6">

              <span className="text-3xl">
                🍽️
              </span>

            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
              TastyBites
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Menu Item Not Found
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              {error || "This menu item does not exist."}
            </p>


            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg shadow-gray-900/10 hover:bg-orange-500 hover:shadow-orange-500/20 transition-all duration-300"
              >
                <span>←</span>
                Back to Menu
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 bg-white text-gray-700 rounded-xl font-medium hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
              >
                <span>⌂</span>
                Return to Home
              </Link>

            </div>

          </div>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>


      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">

        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 lg:mb-10">

          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white/75 backdrop-blur-md border border-white/80 rounded-xl text-gray-700 font-medium shadow-sm hover:bg-white hover:text-orange-600 hover:shadow-md transition-all duration-300"
          >

            <span className="text-lg group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>

            Back to Menu

          </Link>


          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg shadow-gray-900/10 hover:bg-orange-500 hover:shadow-orange-500/20 transition-all duration-300"
          >

            <span>
              TastyBites
            </span>

            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>

          </Link>

        </div>


        {/* Main Details Card */}
        <div className="bg-white/75 backdrop-blur-xl border border-white/80 rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/10">

          <div className="grid grid-cols-1 lg:grid-cols-2">


            {/* ================= IMAGE ================= */}
            <div className="relative h-[320px] sm:h-[420px] lg:h-[650px] overflow-hidden">

              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />


              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>


              {/* Category Floating Badge */}
              <div className="absolute top-5 left-5">

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-gray-800 text-sm font-semibold shadow-lg">

                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>

                  {menuItem.category}

                </span>

              </div>


              {/* Bottom Image Label */}
              <div className="absolute bottom-5 left-5 right-5">

                <div className="flex items-end justify-between gap-4">

                  <div>

                    <p className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">
                      TastyBites Special
                    </p>

                    <p className="text-white text-xl sm:text-2xl font-bold mt-1">
                      Freshly prepared for you
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= DETAILS ================= */}
            <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">

              {/* Small Heading */}
              <div className="flex items-center gap-3 mb-5">

                <div className="h-px w-10 bg-orange-400"></div>

                <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.2em]">
                  Our Menu
                </span>

              </div>


              {/* Name */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">

                {menuItem.name}

              </h1>


              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-8 mt-6 max-w-xl">

                {menuItem.description}

              </p>


              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-orange-200 via-gray-200 to-transparent my-8"></div>


              {/* Price + Availability */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                {/* Price */}
                <div>

                  <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
                    Price
                  </p>

                  <div className="flex items-baseline gap-1">

                    <span className="text-lg text-orange-500 font-semibold">
                      ₹
                    </span>

                    <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                      {menuItem.price}
                    </span>

                  </div>

                </div>


                {/* Availability */}
                <div>

                  {menuItem.availability ? (

                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-semibold">

                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>

                      Available

                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-gray-500 text-sm font-semibold">

                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>

                      Currently Unavailable

                    </span>

                  )}

                </div>

              </div>


              {/* Availability Message */}
              {!menuItem.availability && (
                <div className="mt-7 p-5 bg-gray-50 border border-gray-200 rounded-2xl">

                  <div className="flex gap-3">

                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">

                      <span>
                        ℹ
                      </span>

                    </div>

                    <div>

                      <p className="text-sm font-semibold text-gray-800">
                        Currently unavailable
                      </p>

                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        This item is currently unavailable.
                        Please check back later.
                      </p>

                    </div>

                  </div>

                </div>
              )}


              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 mt-8">

                <span className="px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-lg text-xs font-medium text-orange-700">
                  Fresh Ingredients
                </span>

                <span className="px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-lg text-xs font-medium text-amber-700">
                  Chef Crafted
                </span>

                <span className="px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-lg text-xs font-medium text-rose-700">
                  TastyBites
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 lg:mt-10">

          <Link
            to="/menu"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/80 backdrop-blur-md border border-white rounded-xl text-gray-700 font-semibold shadow-sm hover:bg-white hover:text-orange-600 hover:shadow-lg transition-all duration-300"
          >

            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>

            Explore More Menu

          </Link>


          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-900 text-white rounded-xl font-semibold shadow-lg shadow-gray-900/10 hover:bg-orange-500 hover:shadow-orange-500/20 transition-all duration-300"
          >

            Return to Home

            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>

          </Link>

        </div>


        {/* Footer Accent */}
        <div className="text-center mt-10">

          <p className="text-xs text-gray-400 tracking-wide">
            Crafted with care • TastyBites
          </p>

        </div>

      </section>

    </div>
  );
}

export default MenuDetails;
