import { Link, useLocation } from "react-router-dom";
import "../styles/breadcrumb.css";

const LABELS = {
  products: "Shop",
  shop: "Shop",
  men: "Men",
  women: "Women",
  tshirts: "T-shirts",
  "t-shirts": "T-shirts",
};

function Breadcrumb() {
  const location = useLocation();
  const HIDE_ON = ["/", "/login"];

  if (HIDE_ON.includes(location.pathname)) return null;

  const pathnames = location.pathname.split("/").filter(Boolean);

  const isProductId = (value) => /^\d+$/.test(value);
  const productName = localStorage.getItem("breadcrumbProduct");

  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>

          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            const label = isProductId(value)
              ? productName || "Product"
              : LABELS[value.toLowerCase()] || value.replace("-", " ");

            return (
              <span key={to} className="breadcrumb-item">
                <span className="separator">›</span>
                {isLast ? (
                  <span className="current">{label}</span>
                ) : (
                  <Link to={to} className="breadcrumb-link">
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
