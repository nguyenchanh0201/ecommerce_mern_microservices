import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Kiểm tra dữ liệu hợp lệ
  if (!id || !image || !name || price === undefined) {
    console.warn("Invalid product data:", { id, image, name, price });
    return null;
  }

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img className="hover:scale-110 transition ease-in-out" src={image} alt={name} />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{currency}{price}</p>
    </Link>
  );
};

ProductItems.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductItems;
