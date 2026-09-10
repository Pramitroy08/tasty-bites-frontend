import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // =========================
  // GET CART
  // =========================

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Please login to view your cart.");
        return;
      }

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      setCart(data.cart);
    } catch (error) {
      console.error("Fetch cart error:", error);

      setError(error.message || "Unable to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = async (menuItemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      setUpdatingId(menuItemId);

      const response = await fetch(
        `${API_URL}/update/${menuItemId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity");
      }

      setCart(data.cart);
    } catch (error) {
      console.error("Update quantity error:", error);

      alert(error.message || "Failed to update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (menuItemId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingId(menuItemId);

      const response = await fetch(
        `${API_URL}/remove/${menuItemId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove item");
      }

      setCart(data.cart);
    } catch (error) {
      console.error("Remove item error:", error);

      alert(error.message || "Failed to remove item");
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = async () => {
    if (!cart || cart.items.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire cart?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setClearing(true);

      const response = await fetch(`${API_URL}/clear`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to clear cart");
      }

      setCart(data.cart);
    } catch (error) {
      console.error("Clear cart error:", error);

      alert(error.message || "Failed to clear cart");
    } finally {
      setClearing(false);
    }
  };

  // =========================
  // CALCULATE TOTAL
  // =========================

  const grossTotal =
    cart?.items?.reduce((total, item) => {
      return total + item.menuItem.price * item.quantity;
    }, 0) || 0;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-xl px-10 py-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin"></div>

          <p className="text-gray-600 font-medium">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // NOT LOGGED IN / ERROR
  // =========================

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl border border-red-100 shadow-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center text-3xl">
            🔒
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Login Required
          </h2>

          <p className="text-red-500 mb-7">
            {error}
          </p>

          <Link
            to="/login"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-gray-200"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8 sm:mb-10">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <span>🛒</span>
                Shopping Cart
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
                Your Cart
              </h1>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Review your selected items before placing your order.
              </p>
            </div>

            {cart?.items?.length > 0 && (
              <button
                onClick={clearCart}
                disabled={clearing}
                className="self-start sm:self-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-300 shadow-sm disabled:opacity-50"
              >
                <span className="text-base">
                  {clearing ? "⏳" : "🗑️"}
                </span>

                {clearing ? "Clearing..." : "Clear Cart"}
              </button>
            )}
          </div>
        </div>

        {/* =========================
            EMPTY CART
        ========================= */}

        {!cart?.items || cart.items.length === 0 ? (
          <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl shadow-orange-100/40 p-8 sm:p-14 lg:p-20 text-center">

            <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl"></div>

            <div className="relative">

              <div className="w-24 h-24 mx-auto mb-7 rounded-3xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-5xl shadow-inner">
                🛒
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mt-3 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything yet. Explore our menu
                and discover something delicious.
              </p>

              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-gray-200"
              >
                Browse Menu
                <span>→</span>
              </Link>

            </div>
          </div>
        ) : (

          /* =========================
             CART CONTENT
          ========================= */

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* =========================
                CART ITEMS
            ========================= */}

            <div className="lg:col-span-2 space-y-4">

              {cart.items.map((item) => {

                const menuItem = item.menuItem;

                const itemTotal =
                  menuItem.price * item.quantity;

                const isUpdating =
                  updatingId === menuItem._id;

                return (
                  <div
                    key={menuItem._id}
                    className="group bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white shadow-lg shadow-orange-100/30 p-4 sm:p-5 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300"
                  >

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">

                      {/* Image */}

                      <div className="relative w-full sm:w-32 lg:w-36 h-52 sm:h-32 lg:h-36 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">

                        <img
                          src={menuItem.image}
                          alt={menuItem.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                      </div>

                      {/* Details */}

                      <div className="flex-1 min-w-0">

                        <div className="flex justify-between gap-3">

                          <div className="min-w-0">

                            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-orange-600 font-bold">
                              {menuItem.category}
                            </p>

                            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-1 truncate">
                              {menuItem.name}
                            </h3>

                          </div>

                          <button
                            onClick={() =>
                              removeItem(menuItem._id)
                            }
                            disabled={isUpdating}
                            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-40"
                            title="Remove item"
                          >
                            🗑️
                          </button>

                        </div>

                        <p className="text-gray-500 text-sm mt-2">
                          ₹{menuItem.price} per item
                        </p>

                        {/* Bottom Controls */}

                        <div className="flex flex-col xs:flex-row sm:flex-row sm:items-end sm:justify-between gap-4 mt-5">

                          {/* Quantity */}

                          <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
                              Quantity
                            </p>

                            <div className="inline-flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    menuItem._id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={
                                  isUpdating ||
                                  item.quantity <= 1
                                }
                                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors disabled:opacity-30"
                              >
                                −
                              </button>

                              <div className="w-12 h-10 flex items-center justify-center bg-white border-x border-gray-200 text-sm font-bold text-gray-900">
                                {isUpdating
                                  ? "..."
                                  : item.quantity}
                              </div>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    menuItem._id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={isUpdating}
                                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors disabled:opacity-30"
                              >
                                +
                              </button>

                            </div>
                          </div>

                          {/* Item Total */}

                          <div className="sm:text-right">

                            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                              Item Total
                            </p>

                            <p className="font-extrabold text-xl text-gray-900">
                              ₹{itemTotal}
                            </p>

                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* =========================
                ORDER SUMMARY
            ========================= */}

            <div>

              <div className="bg-gray-900 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-gray-300/50 sticky top-6 overflow-hidden relative">

                {/* Decorative elements */}

                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl"></div>

                <div className="relative">

                  <div className="flex items-center justify-between mb-7">

                    <div>
                      <p className="text-orange-400 text-xs uppercase tracking-[0.2em] font-bold">
                        Order
                      </p>

                      <h2 className="text-2xl font-extrabold text-white mt-1">
                        Summary
                      </h2>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                      🧾
                    </div>

                  </div>

                  <div className="space-y-5">

                    <div className="flex justify-between items-center text-gray-300">

                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                          🛍️
                        </span>

                        <span>
                          Items
                        </span>
                      </div>

                      <span className="font-semibold text-white">
                        {cart.items.reduce(
                          (total, item) =>
                            total + item.quantity,
                          0
                        )}
                      </span>

                    </div>

                    <div className="flex justify-between items-center text-gray-300">

                      <span>
                        Gross Total
                      </span>

                      <span className="font-semibold text-white">
                        ₹{grossTotal}
                      </span>

                    </div>

                    <div className="border-t border-white/10 pt-5">

                      <div className="flex justify-between items-end">

                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider">
                            Total Amount
                          </p>

                          <p className="text-white text-3xl font-extrabold mt-1">
                            ₹{grossTotal}
                          </p>
                        </div>

                        <span className="text-xs text-green-400 font-semibold mb-1">
                          ✓ Final
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Checkout */}

                  <Link
                    to="/checkout"
                    className="group mt-7 flex items-center justify-center gap-3 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-900/30 hover:from-orange-400 hover:to-amber-400 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Proceed to Checkout

                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>

                  <Link
                    to="/menu"
                    className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <span>←</span>
                    Continue Shopping
                  </Link>

                </div>
              </div>

              {/* Small reassurance card */}

              <div className="mt-4 bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-4 flex items-start gap-3 shadow-sm">

                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Secure checkout
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Your order information is protected.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;