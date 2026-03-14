import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/products/productSlice";
import { FiFilter, FiX } from "react-icons/fi";

function Products() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  // FILTER STATES
  const [maxPrice, setMaxPrice] = useState(2000);
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // MOBILE FILTER
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(loadProducts({
      max_price: maxPrice,
      color: activeColor,
      category: activeCategory,
      search: searchQuery,
      // size is tracked but not yet supported by backend - added for future
      size: activeSize,
    }));
  }, [maxPrice, activeColor, activeCategory, activeSize, searchQuery, dispatch]);

  const resetFilters = () => {
    setActiveColor(null);
    setActiveSize(null);
    setActiveCategory(null);
    setMaxPrice(2000);
  };

  return (
    <section className="products-page py-4">
      <div className="container">
        <div className="row g-4">
          {/* DESKTOP FILTER */}
          <div className="col-lg-3 d-none d-lg-block">
            <FilterBox
              {...{
                maxPrice,
                setMaxPrice,
                activeColor,
                setActiveColor,
                activeSize,
                setActiveSize,
                activeCategory,
                setActiveCategory,
                resetFilters,
              }}
            />
          </div>

          {/* PRODUCTS */}
          <div className="col-lg-9">
            <div className="products-header d-flex justify-content-between align-items-center">
              <h2>{searchQuery ? `Search Results for "${searchQuery}"` : (activeCategory || "All Products")}</h2>

              {/* MOBILE FILTER ICON */}
              <button
                className="mobile-filter-btn d-lg-none"
                onClick={() => setShowFilters(true)}
              >
                <FiFilter size={20} />
              </button>
            </div>

            <p className="mb-3">Showing {products.length} Products</p>

            <div className="row g-4">
              {products.map((item) => (
                <div className="col-md-4 col-6" key={item.id}>
                  <div className="product-card">
                    <Link to={`/products/${item.id}`} className="product-link">
                      <div className="product-img-box">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                          }}
                        />
                      </div>
                    </Link>

                    <div className="product-info">
                      <h4 className="product-title">{item.name}</h4>
                      <div className="rating">⭐⭐⭐⭐☆</div>
                      <div className="price">₹{item.price}</div>
                    </div>
                    {/* 
                    <button
                      className="add-btn"
                      onClick={() => addToCart(item, 1)}
                    >
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {showFilters && (
        <>
          <div
            className="filter-overlay"
            onClick={() => setShowFilters(false)}
          />

          <div className="mobile-filter-drawer">
            <div className="filter-header">
              <h5>Filters</h5>
              <FiX size={22} onClick={() => setShowFilters(false)} />
            </div>

            <FilterBox
              {...{
                maxPrice,
                setMaxPrice,
                activeColor,
                setActiveColor,
                activeSize,
                setActiveSize,
                activeCategory,
                setActiveCategory,
                resetFilters,
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}

/* FILTER COMPONENT */
function FilterBox({
  maxPrice,
  setMaxPrice,
  activeColor,
  setActiveColor,
  activeCategory,
  setActiveCategory,
  resetFilters,
}) {
  return (
    <div className="filters-box">
      <ul className="filter-list">
        {['T-shirts', 'Shirts', 'Jeans', 'Accessories'].map((cat) => (
          <li
            key={cat}
            className={activeCategory === cat ? 'active' : ''}
            onClick={() =>
              setActiveCategory((prev) => (prev === cat ? null : cat))
            }
          >
            {cat}
          </li>
        ))}
      </ul>

      <div className="filter-block">
        <h6>Price</h6>
        <input
          type="range"
          min="100"
          max="2000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
        />
        <div className="price-range">
          <span>₹100</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>

      <div className="filter-block">
        <h6>Colors</h6>
        <div className="colors">
          {['Black', 'Red', 'Blue', 'Green', 'Orange'].map((c) => (
            <span
              key={c}
              className={`color ${c.toLowerCase()} ${activeColor === c ? 'active' : ''
                }`}
              onClick={() =>
                setActiveColor((prev) => (prev === c ? null : c))
              }
            />
          ))}
        </div>
      </div>

      <button className="apply-filter" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
}

export default Products;
