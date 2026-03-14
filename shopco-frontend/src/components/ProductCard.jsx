import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const oldPrice = (product.price * 1.25).toFixed(2);
  const discount = "20%";

  return (
    <Link to={`/products/${product.id}`} className="product-link">
      <div className="product-card">
        <div className="product-img-box">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          />
        </div>

        <h3 className="product-title">{product.name}</h3>

        <div className="rating">
          ⭐⭐⭐⭐☆
          <span>{product.rating?.rate}/5</span>
        </div>

        <div className="price-row">
          <span className="new-price">${product.price}</span>
          <span className="old-price">${oldPrice}</span>
          <span className="discount">-{discount}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
