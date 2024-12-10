import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import ProductItems from "./ProductItems";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();
  const backEndURL = useContext(ShopContext);

  // Fetch products from the API
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        console.log(backEndURL.backendUrl);

        // Make GET request using Axios
        const response = await axios.get(`${backEndURL.backendUrl}/products/sellerlatest/10`);
        console.log("Axios response:", response);

        // Extract the latestProducts array from the response
        if (response.data && response.data.success && response.data.data.latestProducts) {
          setLatestProducts(response.data.data.latestProducts);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching latest products:", error.message);
        alert("Failed to fetch products. Please try again later.");
      }
    };

    fetchLatestProducts();
  }, [backEndURL]);

  // Handle product click
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 10);
  };

  return (
    <div className="my-20 px-6 lg:px-20">
      {/* Title Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 uppercase tracking-wide">
          LATEST COLLECTION
        </h2>
        <p className="w-3/4 sm:w-3/5 lg:w-1/2 m-auto text-lg sm:text-xl md:text-2xl font-semibold text-gray-600 mt-4">
          Explore our newest arrivals with exclusive designs and the best quality.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8 mt-10">
        {latestProducts.map((product) => (
          <div
            key={product._id}
            className="transform transition-transform duration-300 hover:scale-105"
            onClick={() => handleProductClick(product._id)} // Add click handler
          >
            <ProductItems
              id={product._id}
              image={`${backEndURL.backendUrl}/products/${product.imageURL}`} // Use `imageURL` for the image
              name={product.productName} // Use `productName` for the name
              price={product.price} // Use `price` for the price
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
