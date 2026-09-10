import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Menu from "./pages/menu";
import MenuDetails from "./pages/MenuDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenuItems from "./pages/AdminMenuItems";
import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";
import AdminUsers from "./pages/AdminUsers";

import ProtectedRoute from "./components/ProtectedRoute";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

// Shared layout for user/public pages that renders the global Navbar once
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          {/* PUBLIC & USER PAGES WITH GLOBAL NAVBAR WRAPPER */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuDetails />} />
          </Route>

          {/* AUTHENTICATION PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/cart"
              element={<Cart />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>

            <Route
              path="/checkout"
              element={<Checkout />}
            />

          </Route>
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route element={<ProtectedRoute />}>

            <Route
              path="/orders"
              element={<Orders />}
            />

          </Route>

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN ROUTES */}
          {/* PROTECTED ADMIN ROUTES */}
          <Route element={<ProtectedRoute adminOnly={true} />}>

            <Route element={<AdminLayout />}>

              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/menu-items"
                element={<AdminMenuItems />}
              />

              <Route
                path="/admin/menu-items/add"
                element={<AddMenuItem />}
              />

              <Route
                path="/admin/menu-items/edit/:id"
                element={<EditMenuItem />}
              />

              <Route
                path="/admin/users"
                element={<AdminUsers />}
              />

              <Route
                path="/admin/orders"
                element={<AdminOrders />}
              />

            </Route>

          </Route>

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;