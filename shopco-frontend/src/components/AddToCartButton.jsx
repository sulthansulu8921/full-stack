import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";

function AddToCartButton({ productId }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addItemToCart(productId));
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}

export default AddToCartButton;
