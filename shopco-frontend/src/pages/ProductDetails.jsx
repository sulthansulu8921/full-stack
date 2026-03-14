import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProductDetail } from "../features/products/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, items: allProducts } = useSelector((state) => state.products);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [activeSize, setActiveSize] = useState("Large");
  const [activeImage, setActiveImage] = useState("");

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    text: "",
  });

  useEffect(() => {
    dispatch(loadProductDetail(id));
    // Also load all products for "You might also like"
    import("../features/products/productSlice").then(({ loadProducts }) => {
      dispatch(loadProducts());
    });
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      localStorage.setItem("breadcrumbProduct", product.name);
    }
  }, [product]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const related = allProducts.filter((item) => item.id !== Number(id));
      setRelatedProducts(related.slice(0, 6));
    }
  }, [allProducts, id]);

  useEffect(() => {
    // REVIEWS
    fetch(`http://127.0.0.1:8000/reviews/product/${id}/`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  if (!product) return null;

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = async () => {
    // ✅ prevent empty submit
    if (!newReview.text || !newReview.text.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      const token = localStorage.getItem("access");

      const res = await fetch(`http://127.0.0.1:8000/reviews/product/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ send token ONLY if exists
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          rating: newReview.rating,
          text: newReview.text,
        }),
      });

      // ❌ backend error
      if (!res.ok) {
        const error = await res.text();
        console.error("Review error:", error);
        alert("Review submit failed");
        return;
      }

      const savedReview = await res.json();

      // ✅ instantly show review
      setReviews((prev) => [savedReview, ...prev]);

      // reset modal
      setNewReview({ rating: 5, text: "" });
      setShowReviewModal(false);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Server error");
    }
  };

  return (
    <section className="product-details py-5">
      <div className="container">
        {/* ================= TOP SECTION ================= */}
        <div className="row details-top g-5">
          {/* IMAGES */}
          <div className="col-lg-6">
            <div className="details-images d-flex gap-3">
              <div className="thumbs d-flex flex-column gap-2">
                {[1, 2, 3].map((_, i) => (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                ))}
              </div>

              <div className="main-image flex-grow-1 text-center">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="img-fluid"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="col-lg-6 details-info">
            <h1>{product.name}</h1>

            <div className="rating mb-2">
              {"★".repeat(Math.round(product.rating || 4))}
              {"☆".repeat(5 - Math.round(product.rating || 4))}{" "}
              <span className="rating-text">{product.rating || "4.5"}/5</span>
            </div>

            <div className="price-row d-flex gap-3 align-items-center mb-3">
              <span className="price">${product.price}</span>
              {product.original_price && (
                <>
                  <span className="old-price">${product.original_price}</span>
                  <span className="discount">
                    -{Math.round((1 - product.price / product.original_price) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="description mb-4">{product.description}</p>

            {/* SIZE */}
            <div className="option-block mb-4">
              <p>Choose Size</p>
              <div className="sizes d-flex gap-2">
                {["Small", "Medium", "Large", "X-Large"].map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${activeSize === size ? "active" : ""
                      }`}
                    onClick={() => setActiveSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CART */}
            <div className="cart-row-figma">
              <div className="qty-pill">
                <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>

              <button
                className="add-cart-btn"
                onClick={() => dispatch(addItemToCart(product.id))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="details-tabs d-flex gap-4 mt-5 border-bottom pb-2">
          <span className="active">Rating & Reviews</span>
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="reviews-header d-flex justify-content-between mt-4">
          <h3>
            All Reviews <span>({reviews.length})</span>
          </h3>
          <button
            className="write-review-btn"
            onClick={() => setShowReviewModal(true)}
          >
            Write a Review
          </button>
        </div>

        <div className="reviews row g-4 mt-2">
          {reviews.map((review) => (
            <div className="col-md-6" key={review.id}>
              <div className="review-card h-100">
                <div className="stars">{"★".repeat(review.rating)}</div>
                <h4>
                  {review.name || "User"} <span className="verified">●</span>
                </h4>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="like-title text-center mt-5 mb-4">
          YOU MIGHT ALSO LIKE
        </h2>

        <div className="like-scroll">
          <div className="like-grid">
            {relatedProducts.map((item) => (
              <Link
                to={`/products/${item.id}`}
                className="like-card"
                key={item.id}
              >
                <div className="like-img-box">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
                <h4 className="like-name">{item.name}</h4>
                <div className="rating">
                  {"★".repeat(Math.round(item.rating || 4))}
                  {"☆".repeat(5 - Math.round(item.rating || 4))}
                </div>
                <p className="like-price like-price-row">
                  <strong>${item.price}</strong>
                  {item.original_price && (
                    <>
                      <span className="old-price ms-2">${item.original_price}</span>
                      <span className="discount ms-1">-{Math.round((1 - item.price / item.original_price) * 100)}%</span>
                    </>
                  )}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="load-more">Load More Products</button>
        </div>

        {/* ================= REVIEW MODAL ================= */}
        {showReviewModal && (
          <>
            <div
              className="review-overlay"
              onClick={() => setShowReviewModal(false)}
            />

            <div className="review-modal">
              <h3>Write a Review</h3>

              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: Number(e.target.value),
                  })
                }
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {"★".repeat(r)}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review..."
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
              />

              <button className="submit-btn" onClick={submitReview}>
                Submit Review
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
