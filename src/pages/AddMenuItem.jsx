
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/api/menu-items`;

function AddMenuItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Main Course",
    price: "",
    availability: true,
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ---------------------------------------------------------
      // 1. Get JWT token
      // ---------------------------------------------------------
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "You are not logged in as an admin."
        );
      }

      // ---------------------------------------------------------
      // 2. Basic frontend validation
      // ---------------------------------------------------------
      if (!formData.name.trim()) {
        throw new Error("Please enter the menu item name.");
      }

      if (!formData.description.trim()) {
        throw new Error("Please enter the description.");
      }

      if (!formData.price || Number(formData.price) < 0) {
        throw new Error("Please enter a valid price.");
      }

      if (!formData.image.trim()) {
        throw new Error("Please enter an image URL.");
      }

      // ---------------------------------------------------------
      // 3. Send request to backend
      // ---------------------------------------------------------
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          price: Number(formData.price),
          availability: formData.availability,
          image: formData.image.trim()
        })
      });

      // ---------------------------------------------------------
      // 4. Read response safely
      //
      // IMPORTANT:
      // response.json() can fail if the backend sends an empty
      // response or HTML/text instead of JSON.
      // ---------------------------------------------------------
      const responseText = await response.text();

      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Backend returned invalid JSON:",
            responseText
          );

          throw new Error(
            `Server returned an invalid response (${response.status}).`
          );
        }
      }

      // ---------------------------------------------------------
      // 5. Handle HTTP errors
      // ---------------------------------------------------------
      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to create menu item. Server returned ${response.status}.`
        );
      }

      // ---------------------------------------------------------
      // 6. Success
      // ---------------------------------------------------------
      alert("Menu item added successfully!");

      navigate("/admin/menu-items");

    } catch (error) {
      console.error("Add menu item error:", error);

      setError(
        error.message ||
          "Something went wrong while adding the menu item."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 px-4 py-6 sm:px-6 lg:px-8">

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />

        <div className="absolute -bottom-32 right-1/3 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />

      </div>


      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <Link
            to="/admin/menu-items"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-600"
          >
            <span className="text-lg">
              ←
            </span>

            Back to Menu Items
          </Link>


          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-orange-700 shadow-sm backdrop-blur">

                <span className="h-2 w-2 rounded-full bg-orange-500" />

                MENU MANAGEMENT

              </div>


              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Add Menu Item
              </h2>


              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Create a new dish and add it to your restaurant menu.
                Provide accurate details so customers can easily discover it.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            MAIN CARD
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/85 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">

          {/* Card Header */}

          <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50/80 to-amber-50/60 px-5 py-5 sm:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl shadow-sm">
                🍽️
              </div>


              <div>

                <h3 className="text-lg font-bold text-gray-900">
                  Item Information
                </h3>

                <p className="text-sm text-gray-500">
                  Enter the details of your new menu item below.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              FORM
          ================================================== */}

          <div className="p-5 sm:p-8 lg:p-10">

            {/* Error */}

            {error && (

              <div className="mb-7 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                  !
                </div>


                <div>

                  <p className="font-semibold">
                    Unable to add menu item
                  </p>


                  <p className="mt-1 text-red-600">
                    {error}
                  </p>

                </div>

              </div>

            )}


            <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* =================================================
                    NAME
                ================================================== */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Item Name
                  </label>


                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                      🍴
                    </span>


                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Classic Cheeseburger"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                  </div>

                </div>


                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Description
                  </label>


                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the ingredients, taste, preparation style, or special features..."
                    rows="4"
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />


                  <p className="mt-2 text-xs text-gray-400">
                    Keep the description clear and appealing to customers.
                  </p>

                </div>


                {/* =================================================
                    CATEGORY
                ================================================== */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Category
                  </label>


                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg">
                      🏷️
                    </span>


                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 pl-12 pr-10 text-sm text-gray-800 outline-none transition hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
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


                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      ▾
                    </span>

                  </div>

                </div>


                {/* =================================================
                    PRICE
                ================================================== */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Price
                  </label>


                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-600">
                      ₹
                    </span>


                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="299"
                      min="0"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                  </div>

                </div>


                {/* =================================================
                    IMAGE URL
                ================================================== */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Image URL
                  </label>


                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                      🖼️
                    </span>


                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/..."
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                  </div>


                  <p className="mt-2 text-xs text-gray-400">
                    Use a direct image URL for the menu item.
                  </p>

                </div>


                {/* =================================================
                    AVAILABILITY
                ================================================== */}

                <div className="md:col-span-2">

                  <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-lg">
                        ✓
                      </div>


                      <div>

                        <p className="text-sm font-semibold text-gray-800">
                          Item Availability
                        </p>


                        <p className="mt-0.5 text-xs text-gray-500">

                          {formData.availability
                            ? "Customers can currently order this item."
                            : "This item will be hidden from available menu items."}

                        </p>

                      </div>

                    </div>


                    {/* Switch */}

                    <label className="relative inline-flex cursor-pointer items-center">

                      <input
                        type="checkbox"
                        name="availability"
                        checked={formData.availability}
                        onChange={handleChange}
                        className="peer sr-only"
                      />


                      <div className="h-7 w-12 rounded-full bg-gray-300 transition peer-checked:bg-green-500 peer-focus:ring-4 peer-focus:ring-green-100 after:absolute after:left-[3px] after:top-[3px] after:h-[22px] after:w-[22px] after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:after:translate-x-5" />

                    </label>

                  </div>

                </div>

              </div>


              {/* =================================================
                  BOTTOM ACTIONS
              ================================================== */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:justify-end">

                <Link
                  to="/admin/menu-items"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  Cancel
                </Link>


                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:shadow-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading ? (

                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                      Adding...
                    </>

                  ) : (

                    <>
                      <span className="text-base">
                        +
                      </span>

                      Add Menu Item
                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>


        {/* Footer Hint */}

        <div className="mt-5 text-center text-xs text-gray-400">
          Make sure all item details are accurate before adding it to the menu.
        </div>

      </div>

    </div>
  );
}

export default AddMenuItem;
