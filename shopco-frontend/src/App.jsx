import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import Navbar from "./components/Navbar";
import Offer from "./components/offer";
import Breadcrumb from "./components/Breadcrumb";
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <Offer />
      <Navbar />
      <Breadcrumb />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* 🔐 PROTECTED ROUTE */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
