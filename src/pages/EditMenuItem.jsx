import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/api/menu-items`;

function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Main Course",
    price: "",
    availability: true,
    image: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch menu item
  useEffect(() => {
    let isMounted = true;

    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch menu item"
          );
        }

        const item = data.menuItem;

        if (isMounted) {
          setFormData({
            name: item.name || "",
            description: item.description || "",
            category: item.category || "Main Course",
            price: item.price ?? "",
            availability: item.availability ?? true,
            image: item.image || ""
          });
        }

      } catch (error) {
        console.error("Fetch menu item error:", error);

        if (isMounted) {
          setError(
            error.message || "Unable to load menu item"
          );
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMenuItem();

    return () => {
      isMounted = false;
    };
  }, [id]);


  // Handle form changes
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value
    }));
  };


  // Update menu item
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "You are not logged in as an admin."
        );
      }

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            ...formData,
            price: Number(formData.price)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to update menu item"
        );
      }

      alert(
        "Menu item updated successfully!"
      );

      navigate("/admin/menu-items");

    } catch (error) {
      console.error(
        "Update menu item error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong"
      );

    } finally {
      setSaving(false);
    }
  };


  // Loading
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 rounded-3xl">

        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>

          <p className="text-gray-600 font-medium">
            Loading menu item...
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Please wait a moment
          </p>
        </div>

      </div>
    );
  }


  // Error while loading item
  if (error && !formData.name) {
    return (
      <div className="min-h-[70vh] rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 p-6 md:p-10">

        <Link
          to="/admin/menu-items"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 transition"
        >
          ← Back to Menu Items
        </Link>

        <div className="mt-8 max-w-xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl shadow-orange-100/50 p-8 md:p-12 text-center">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
            ⚠️
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Unable to load menu item
          </h3>

          <p className="text-red-600 mb-6 text-sm">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-gray-200"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/60 to-rose-50 rounded-3xl p-4 sm:p-6 md:p-8">

      {/* Decorative background elements */}
      <div className="relative">

        <div className="absolute -top-10 right-0 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="absolute top-64 -left-10 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl pointer-events-none"></div>


        {/* Header */}
        <div className="relative mb-8 md:mb-10">

          <Link
            to="/admin/menu-items"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 transition-all duration-200 mb-5"
          >
            <span className="text-lg">←</span>
            Back to Menu Items
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-orange-100 text-orange-600 text-xs font-semibold mb-3 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                MENU MANAGEMENT
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Edit Menu Item
              </h2>

              <p className="mt-2 text-gray-500 max-w-xl">
                Update the details, pricing and availability of this menu item.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-white rounded-2xl px-4 py-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                🍽️
              </div>

              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Editing item
                </p>

                <p className="text-sm font-bold text-gray-800">
                  {formData.name || "Menu Item"}
                </p>
              </div>
            </div>

          </div>

        </div>


        {/* Main content */}
        <div className="relative max-w-6xl">

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


            {/* Form Card */}
            <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl shadow-orange-100/40 overflow-hidden">

              {/* Card Header */}
              <div className="px-5 sm:px-7 md:px-8 py-5 border-b border-orange-100/70 bg-white/50">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
                    ✏️
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Item Details
                    </h3>

                    <p className="text-xs text-gray-500 mt-0.5">
                      Make changes to your menu item
                    </p>
                  </div>

                </div>

              </div>


              {/* Form */}
              <div className="p-5 sm:p-7 md:p-8">

                {error && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-start gap-3">

                    <span className="text-lg">
                      ⚠️
                    </span>

                    <p>
                      {error}
                    </p>

                  </div>
                )}


                <form onSubmit={handleSubmit}>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">


                    {/* Name */}
                    <div className="md:col-span-2">

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Item Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Classic Burger"
                        className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      />

                    </div>


                    {/* Description */}
                    <div className="md:col-span-2">

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                        placeholder="Describe the ingredients, taste or special features..."
                        className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 resize-none"
                      />

                    </div>


                    {/* Category */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>

                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 cursor-pointer"
                      >

                        <option value="Starter">
                          Starter
                        </option>

                        <option value="Main Course">
                          Main Course
                        </option>

                        <option value="Dessert">
                          Dessert
                        </option>

                        <option value="Beverage">
                          Beverage
                        </option>

                      </select>

                    </div>


                    {/* Price */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (₹)
                      </label>

                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                          ₹
                        </span>

                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          required
                          placeholder="0"
                          className="w-full bg-gray-50/80 border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                        />

                      </div>

                    </div>


                    {/* Image */}
                    <div className="md:col-span-2">

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Image URL
                      </label>

                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/food-image.jpg"
                        className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      />

                    </div>


                    {/* Availability */}
                    <div className="md:col-span-2">

                      <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5">

                        <label className="flex items-center justify-between gap-4 cursor-pointer">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                              ✓
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                Item Availability
                              </p>

                              <p className="text-xs text-gray-500 mt-0.5">
                                {formData.availability
                                  ? "Customers can currently order this item."
                                  : "This item is currently unavailable."
                                }
                              </p>
                            </div>

                          </div>

                          <input
                            type="checkbox"
                            name="availability"
                            checked={formData.availability}
                            onChange={handleChange}
                            className="w-5 h-5 accent-orange-500 cursor-pointer"
                          />

                        </label>

                      </div>

                    </div>

                  </div>


                  {/* Buttons */}
                  <div className="mt-8 pt-6 border-t border-orange-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

                    <Link
                      to="/admin/menu-items"
                      className="px-6 py-3.5 border border-gray-200 bg-white text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                      disabled={saving}
                      className="px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-200 hover:from-orange-600 hover:to-amber-600 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                  </div>

                </form>

              </div>

            </div>


            {/* Preview Card */}
            <div className="xl:col-span-1">

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl shadow-orange-100/40 overflow-hidden sticky top-6">

                <div className="px-5 py-5 border-b border-orange-100/70 bg-white/50">

                  <h3 className="font-bold text-gray-900">
                    Live Preview
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    See how the item looks
                  </p>

                </div>


                {/* Preview image */}
                <div className="p-5">

                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">

                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt={formData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div className="text-4xl mb-2">
                            🍽️
                          </div>

                          <p className="text-sm">
                            No image available
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 right-3">

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${
                          formData.availability
                            ? "bg-green-500/90 text-white"
                            : "bg-gray-800/80 text-white"
                        }`}
                      >
                        {formData.availability
                          ? "Available"
                          : "Unavailable"}
                      </span>

                    </div>

                  </div>


                  {/* Preview details */}
                  <div className="pt-5">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <span className="inline-block px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-xs font-semibold mb-2">
                          {formData.category}
                        </span>

                        <h4 className="text-xl font-bold text-gray-900">
                          {formData.name || "Menu Item Name"}
                        </h4>

                      </div>

                      <div className="shrink-0">

                        <p className="text-lg font-extrabold text-orange-600">
                          ₹{formData.price || "0"}
                        </p>

                      </div>

                    </div>


                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                      {formData.description ||
                        "Your menu item description will appear here."}
                    </p>


                    {/* Preview footer */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">

                      <span className="text-xs text-gray-400">
                        TastyBites Menu
                      </span>

                      <span className="text-xs font-medium text-orange-500">
                        Fresh & Delicious
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditMenuItem;