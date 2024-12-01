import { ShopContext } from "../context/ShopContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import ProductItems from "./ProductItems"; 

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    setLatestProducts(products.slice(0, 10)); 
  }, [products]);

  // Function to handle product click and navigate to product detail page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Update this with your actual product detail route
    window.scrollTo(0, 0); // Scroll to the top after navigation
  };

  return (
    <div className="my-20 px-6 lg:px-20">
      {/* Title Section */}
      <div className="text-center py-12">
        {/* Title with moderate size and bold font */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 uppercase tracking-wide">
          LATEST COLLECTION
        </h2>
        <p className="w-3/4 sm:w-3/5 lg:w-1/2 m-auto text-lg sm:text-xl md:text-2xl font-semibold text-gray-600 mt-4">
          Explore our newest arrivals with exclusive designs and the best quality.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8 mt-10">
        {latestProducts.map((item, index) => (
          <div 
            key={index} 
            className="transform transition-transform duration-300 hover:scale-105"
            onClick={() => handleProductClick(item._id)} // Add click handler
          >
            <ProductItems 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
