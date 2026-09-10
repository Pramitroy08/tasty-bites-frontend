
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";

const API_URL = "http://localhost:5000/api/menu-items";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch menu items from MongoDB
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch menu items"
        );
      }

      setMenuItems(data.menuItems || []);

    } catch (error) {
      console.error("Fetch menu items error:", error);

      setError(
        error.message || "Unable to load menu items"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Get unique categories from MongoDB data
  const categories = [
    "All",
    ...new Set(
      menuItems
        .map((item) => item.category)
        .filter(Boolean)
    )
  ];

  // Search + category filtering
  const filteredItems = menuItems.filter((item) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      item.name?.toLowerCase().includes(searchText) ||
      item.description?.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-gray-900 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="absolute top-[35%] right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="absolute bottom-0 left-[35%] w-96 h-96 bg-orange-100/30 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />


      {/* Header */}
      <section className="relative bg-[#111111] text-white overflow-hidden">

        {/* Header Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#17120f] to-[#2b180d]" />

        <div className="absolute -top-32 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-1/3 w-72 h-40 bg-amber-500/10 rounded-full blur-3xl" />


        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">

          {/* Navigation */}
          <div className="mb-10">

            <Link
              to="/"
              className="
                inline-flex items-center gap-2
                px-4 sm:px-5 py-2.5
                rounded-full
                border border-white/15
                bg-white/5
                backdrop-blur-md
                text-sm sm:text-base
                text-gray-300
                hover:bg-white/10
                hover:text-white
                hover:border-white/25
                transition-all duration-300
              "
            >
              <span className="text-base">←</span>
              Return to Home
            </Link>

          </div>


          {/* Header Content */}
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 mb-5">

              <span className="w-8 h-px bg-orange-400" />

              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-orange-300 font-medium">
                TastyBites
              </p>

              <span className="w-8 h-px bg-orange-400" />

            </div>


            <h1 className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              tracking-tight
              leading-[1.05]
            ">
              Our Menu
            </h1>


            <p className="
              mt-5
              text-base
              sm:text-lg
              md:text-xl
              text-gray-400
              leading-relaxed
              max-w-2xl
            ">
              Discover delicious dishes crafted with fresh ingredients,
              bold flavors, and a passion for great food.
            </p>


            {/* Small Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-8">

              <div>
                <p className="text-2xl font-semibold text-white">
                  {menuItems.length}
                </p>

                <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                  Dishes
                </p>
              </div>


              <div className="h-8 w-px bg-white/10" />


              <div>
                <p className="text-2xl font-semibold text-white">
                  {categories.length > 1 ? categories.length - 1 : 0}
                </p>

                <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                  Categories
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Menu Content */}
      <section className="
        relative
        max-w-7xl
        mx-auto
        px-5 sm:px-6 lg:px-8
        py-8 sm:py-12 lg:py-16
      ">


        {/* Search + Category */}
        <div className="
          relative
          rounded-2xl
          sm:rounded-3xl
          border border-[#e4ddd2]
          bg-[#fffaf3]/80
          backdrop-blur-xl
          shadow-[0_15px_45px_rgba(70,45,20,0.07)]
          p-5 sm:p-7
          mb-8 sm:mb-10
        ">

          {/* Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-orange-600 font-semibold mb-1">
                Explore
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Find your favorite
              </h2>

            </div>


            {!loading && !error && (
              <p className="text-sm text-gray-500">
                {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "items"} available
              </p>
            )}

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Search */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                Search dishes
              </label>

              <div className="relative">

                <span className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  text-lg
                  pointer-events-none
                ">
                  ⌕
                </span>


                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by dish or description..."
                  className="
                    w-full
                    bg-[#f8f3eb]
                    border border-[#ded5c8]
                    rounded-xl
                    pl-11 pr-4
                    py-3.5
                    text-sm sm:text-base
                    text-gray-900
                    placeholder:text-gray-400
                    outline-none
                    transition-all duration-300
                    focus:bg-white
                    focus:border-orange-400
                    focus:ring-4
                    focus:ring-orange-500/10
                  "
                />

              </div>

            </div>


            {/* Category */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                Category
              </label>

              <div className="relative">

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    appearance-none
                    w-full
                    bg-[#f8f3eb]
                    border border-[#ded5c8]
                    rounded-xl
                    px-4 pr-11
                    py-3.5
                    text-sm sm:text-base
                    text-gray-800
                    outline-none
                    cursor-pointer
                    transition-all duration-300
                    focus:bg-white
                    focus:border-orange-400
                    focus:ring-4
                    focus:ring-orange-500/10
                  "
                >

                  {categories.map((itemCategory) => (
                    <option
                      key={itemCategory}
                      value={itemCategory}
                    >
                      {itemCategory}
                    </option>
                  ))}

                </select>


                <span className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  pointer-events-none
                ">
                  ▾
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* Loading */}
        {loading && (
          <div className="
            py-24
            text-center
            rounded-3xl
            border border-[#e4ddd2]
            bg-[#fffaf3]/70
          ">

            <div className="
              mx-auto
              w-12 h-12
              rounded-full
              border-4
              border-orange-100
              border-t-orange-500
              animate-spin
            " />

            <p className="text-gray-500 mt-5 font-medium">
              Preparing our menu...
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Please wait a moment
            </p>

          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="
            bg-[#fffaf3]
            border border-red-100
            rounded-3xl
            p-8 sm:p-12
            text-center
            shadow-[0_15px_45px_rgba(70,45,20,0.06)]
          ">

            <div className="
              mx-auto
              w-14 h-14
              rounded-full
              bg-red-50
              flex items-center justify-center
              text-red-500
              text-2xl
            ">
              !
            </div>


            <h3 className="text-xl sm:text-2xl font-bold mt-5">
              Unable to Load Menu
            </h3>


            <p className="text-red-600 mt-2 text-sm sm:text-base">
              {error}
            </p>


            <button
              onClick={fetchMenuItems}
              className="
                mt-7
                px-6 py-3
                bg-gray-900
                text-white
                rounded-xl
                font-medium
                hover:bg-orange-600
                active:scale-95
                transition-all duration-300
                shadow-lg shadow-gray-900/10
              "
            >
              Try Again
            </button>

          </div>
        )}


        {/* Menu Items */}
        {!loading && !error && (

          filteredItems.length > 0 ? (

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5 sm:gap-6 lg:gap-7
            ">

              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="
                    group
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >

                  <MenuCard
                    item={item}
                  />

                </div>
              ))}

            </div>

          ) : (

            <div className="
              bg-[#fffaf3]/80
              backdrop-blur-xl
              border border-[#e4ddd2]
              rounded-3xl
              px-6
              py-16 sm:py-20
              text-center
              shadow-[0_15px_45px_rgba(70,45,20,0.06)]
            ">

              <div className="
                mx-auto
                w-16 h-16
                rounded-2xl
                bg-[#f1e8dc]
                flex items-center justify-center
                text-3xl
                mb-6
              ">
                🍽
              </div>


              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                No menu items found
              </h3>


              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                We couldn't find anything matching your search.
                Try another dish or category.
              </p>


              {/* Return Home */}
              <Link
                to="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-7
                  px-6 py-3
                  bg-gray-900
                  text-white
                  rounded-xl
                  font-medium
                  hover:bg-orange-600
                  active:scale-95
                  transition-all duration-300
                  shadow-lg shadow-gray-900/10
                "
              >
                ← Return to Home
              </Link>

            </div>

          )

        )}

      </section>


      {/* Bottom Navigation */}
      {!loading && !error && filteredItems.length > 0 && (

        <div className="
          relative
          max-w-7xl
          mx-auto
          px-5 sm:px-6 lg:px-8
          pb-12 sm:pb-16
        ">

          <div className="
            flex
            justify-center
            pt-3
          ">

            <Link
              to="/"
              className="
                group
                inline-flex
                items-center
                gap-2
                px-6 sm:px-7
                py-3.5
                bg-gray-900
                text-white
                rounded-xl
                font-semibold
                text-sm sm:text-base
                hover:bg-orange-600
                active:scale-95
                transition-all duration-300
                shadow-xl shadow-gray-900/10
              "
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>

              Return to Home

            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Menu;
