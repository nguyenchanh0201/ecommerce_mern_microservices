import { useContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItems from "./ProductItems"
import { useNavigate } from "react-router-dom"  // Để sử dụng navigate chuyển hướng đến chi tiết sản phẩm

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();  // Hook để điều hướng đến sản phẩm chi tiết

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category && item.subCategory === subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [category, subCategory, products]);

  // Hàm xử lý khi nhấn vào sản phẩm
  const handleProductClick = (id) => {
    // Cuộn trang lên đầu
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Điều hướng đến trang chi tiết sản phẩm
    navigate(`/product/${id}`);
  }

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED " text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <div key={index} onClick={() => handleProductClick(item._id)} className="cursor-pointer">
            <ProductItems 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
};

export default RelatedProducts;
