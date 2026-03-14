import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/products/productSlice";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import "../styles/product.css";

function HomeProducts() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = isMobile ? 5 : 4;

  const arrivals = products.slice(0, visibleCount);
  const topSelling = products.slice(4, 4 + visibleCount);

  return (
    <section className="home-products py-5">
      <div className="container">

        {/* NEW ARRIVALS */}
        <div className="product-section mb-5">
          <h2 className="section-title text-center mb-5">NEW ARRIVALS</h2>
          <div className="row g-4 flex-nowrap overflow-auto hide-scrollbar pb-3">
            {arrivals.map((p) => (
              <div key={p.id} className="col-lg-3 col-10 flex-shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/products">
              <button className="view-all-btn">View All</button>
            </Link>
          </div>
        </div>

        <hr className="my-5" />

        {/* TOP SELLING */}
        <div className="product-section mb-5">
          <h2 className="section-title text-center mb-5">TOP SELLING</h2>
          <div className="row g-4 flex-nowrap overflow-auto hide-scrollbar pb-3">
            {topSelling.map((p) => (
              <div key={p.id} className="col-lg-3 col-10 flex-shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/products">
              <button className="view-all-btn">View All</button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HomeProducts;
