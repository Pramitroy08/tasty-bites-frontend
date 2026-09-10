
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminMenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadMenuItems = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch menu items"
          );
        }

        if (!cancelled) {
          setMenuItems(data.menuItems || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch menu items error:", error);

        if (!cancelled) {
          setError(
            error.message || "Unable to load menu items"
          );
          setLoading(false);
        }
      }
    };

    loadMenuItems();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      if (!token) {
        alert("Please login as admin.");
        return;
      }

      const response = await fetch(
        `${API_URL}/${id}`,
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
          data.message || "Failed to delete menu item"
        );
      }

      setMenuItems((items) =>
        items.filter((item) => item._id !== id)
      );

      alert("Menu item deleted successfully!");

    } catch (error) {
      console.error("Delete menu item error:", error);

      alert(
        error.message || "Failed to delete menu item"
      );
    }
  };

  const filteredItems = menuItems.filter((item) =>
    `${item.name} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf5] via-[#f8f7f4] to-[#f1f5f2] -m-6 p-4 sm:p-6 lg:p-8">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-7">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <div className="flex items-center gap-3 mb-2">

                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-900 text-white shadow-lg">
                  <span className="text-xl">🍽️</span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Restaurant Management
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Menu Items
                  </h2>
                </div>

              </div>

              <p className="text-sm sm:text-base text-gray-500 max-w-xl">
                Manage your restaurant menu, prices, availability,
                and item details from one place.
              </p>
            </div>


            {/* Add Button */}
            <Link
              to="/admin/menu-items/add"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-900 text-white rounded-xl font-semibold shadow-md hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              <span className="text-xl leading-none">+</span>
              Add Menu Item
            </Link>

          </div>

        </div>


        {/* Statistics */}
        {!loading && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

            {/* Total */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    Total Items
                  </p>

                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {menuItems.length}
                  </p>
                </div>

                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-100 items-center justify-center text-lg">
                  🍽️
                </div>

              </div>

            </div>


            {/* Available */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    Available
                  </p>

                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">
                    {menuItems.filter((item) => item.availability).length}
                  </p>
                </div>

                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center text-lg">
                  ✓
                </div>

              </div>

            </div>


            {/* Unavailable */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    Out of Stock
                  </p>

                  <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">
                    {menuItems.filter((item) => !item.availability).length}
                  </p>
                </div>

                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-amber-50 items-center justify-center text-lg">
                  !
                </div>

              </div>

            </div>


            {/* Search Results */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    Showing
                  </p>

                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {filteredItems.length}
                  </p>
                </div>

                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-100 items-center justify-center text-lg">
                  🔎
                </div>

              </div>

            </div>

          </div>
        )}


        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm p-4 sm:p-5 mb-6">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            <div className="w-full">

              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Search Menu
              </label>

              <div className="relative w-full lg:max-w-xl">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by item name or category..."
                  className="w-full border border-gray-200 bg-gray-50/80 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-gray-400 focus:ring-4 focus:ring-gray-900/5 transition-all"
                />

              </div>

            </div>


            {search && (
              <div className="text-sm text-gray-500 whitespace-nowrap">
                <span className="font-semibold text-gray-900">
                  {filteredItems.length}
                </span>{" "}
                result{filteredItems.length !== 1 ? "s" : ""}
              </div>
            )}

          </div>

        </div>


        {/* Loading */}
        {loading && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-sm p-12 sm:p-16 text-center">

            <div className="flex justify-center mb-5">

              <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>

            </div>

            <p className="text-gray-600 font-medium">
              Loading menu items...
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Please wait while we fetch your menu.
            </p>

          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-red-100 shadow-sm p-10 sm:p-16 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-5">
              <span className="text-2xl">⚠️</span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Unable to load menu
            </h3>

            <p className="text-red-600 text-sm mb-6">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition"
            >
              Try Again
            </button>

          </div>
        )}


        {/* Table */}
        {!loading && !error && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">

            {/* Table Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-gray-200/80 bg-gray-50/70">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold text-gray-900">
                    All Menu Items
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    View and manage your restaurant menu
                  </p>
                </div>

                <div className="text-xs sm:text-sm text-gray-500">
                  {filteredItems.length} item
                  {filteredItems.length !== 1 ? "s" : ""}
                </div>

              </div>

            </div>


            {/* Responsive Table */}
            <div className="overflow-x-auto">

              <table className="w-full text-left min-w-[800px]">

                <thead className="bg-gray-50/80 border-b border-gray-200">

                  <tr>

                    <th className="px-5 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Image
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Item Name
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Category
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Price
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Availability
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100">

                  {filteredItems.length > 0 ? (

                    filteredItems.map((item) => (

                      <tr
                        key={item._id}
                        className="group hover:bg-gray-50/80 transition-colors duration-150"
                      >

                        {/* Image */}
                        <td className="px-5 sm:px-6 py-4">

                          <div className="relative w-16 h-16">

                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-200"
                            />

                          </div>

                        </td>


                        {/* Name */}
                        <td className="px-5 sm:px-6 py-4">

                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              Menu Item
                            </p>
                          </div>

                        </td>


                        {/* Category */}
                        <td className="px-5 sm:px-6 py-4">

                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold">
                            {item.category}
                          </span>

                        </td>


                        {/* Price */}
                        <td className="px-5 sm:px-6 py-4">

                          <span className="font-bold text-gray-900">
                            ₹{item.price}
                          </span>

                        </td>


                        {/* Availability */}
                        <td className="px-5 sm:px-6 py-4">

                          {item.availability ? (

                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">

                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>

                              In Stock

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">

                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>

                              Out of Stock

                            </span>

                          )}

                        </td>


                        {/* Actions */}
                        <td className="px-5 sm:px-6 py-4">

                          <div className="flex items-center gap-2">

                            <Link
                              to={`/admin/menu-items/edit/${item._id}`}
                              className="inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(item._id)
                              }
                              className="inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="px-6 py-20 text-center"
                      >

                        <div className="max-w-sm mx-auto">

                          <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                            <span className="text-2xl">🍽️</span>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900">
                            No menu items found
                          </h3>

                          <p className="text-sm text-gray-500 mt-2">
                            {search
                              ? "Try searching with a different name or category."
                              : "Your menu is currently empty. Add your first menu item to get started."}
                          </p>

                          {!search && (
                            <Link
                              to="/admin/menu-items/add"
                              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                            >
                              <span>+</span>
                              Add First Item
                            </Link>
                          )}

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* Mobile Scroll Hint */}
            {filteredItems.length > 0 && (
              <div className="md:hidden px-4 py-3 border-t border-gray-100 bg-gray-50/60 text-center">

                <p className="text-xs text-gray-400">
                  ← Swipe horizontally to view all columns →
                </p>

              </div>
            )}

          </div>
        )}


        {/* Footer */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-400">

            <p>
              Showing {filteredItems.length} of {menuItems.length} menu items
            </p>

            <p>
              TastyBites Admin Panel
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminMenuItems;
