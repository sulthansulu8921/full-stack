import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { loadCart } from "../features/cart/cartSlice";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${query}`);
    }
  };

  const { token } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (token) {
      dispatch(loadCart());
    }
  }, [token, dispatch]);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="shop-navbar">
        <div className="nav-container">

          {/* LEFT */}
          <div className="nav-left">
            <button
              className="hamburger"
              onClick={() => setOpen(!open)}
            >
              <i className="bi bi-list"></i>
            </button>

            <Link to="/" className="logo">SHOP.CO</Link>
          </div>

          {/* CENTER (DESKTOP MENU) */}
          <ul className="nav-menu">
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/">On Sale</Link></li>
            <li><Link to="/">New Arrivals</Link></li>
            <li><Link to="/">Brands</Link></li>
          </ul>


          {/* RIGHT */}
          <div className="nav-right">

            {/* DESKTOP SEARCH */}
            <form className="search-box" onSubmit={handleSearch}>
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>

            {/* MOBILE SEARCH ICON */}
            <button
              className="icon-btn mobile-search"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </button>

            {/* CART */}
            <Link to="/cart" className="icon-btn cart-icon">
              <i className="bi bi-cart"></i>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>

            {/* USER ICON */}
            <Link to="/orders" className="icon-btn">
              <i className="bi bi-person"></i>
            </Link>

            {token && (
              <button onClick={handleLogout} className="icon-btn logout-btn">
                <i className="bi bi-box-arrow-right"></i>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setOpen(false)}>Shop</Link></li>
          <li><Link to="/" onClick={() => setOpen(false)}>On Sale</Link></li>
          <li><Link to="/" onClick={() => setOpen(false)}>New Arrivals</Link></li>
          <li><Link to="/" onClick={() => setOpen(false)}>Brands</Link></li>
          <li><Link to="/cart" onClick={() => setOpen(false)}>
            Cart ({cartCount})
          </Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
