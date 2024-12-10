import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductItems from "../components/ProductItems";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const BestSeller = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const backEndURL = useContext(ShopContext);
  const navigate = useNavigate();

  // Fetch bestseller products from the API
  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        console.log(backEndURL.backendUrl);

        // Make GET request using Axios
        const response = await axios.get(`${backEndURL.backendUrl}/products/sellerlatest/5`);
        console.log("Axios response:", response);

        // Extract bestseller products from the response
        if (response.data && response.data.success && response.data.data.bestSellerProducts) {
          setBestSellerProducts(response.data.data.bestSellerProducts);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching bestseller products:", error.message);
        alert("Failed to fetch products. Please try again later.");
      }
    };

    fetchBestSellerProducts();
  }, [backEndURL]);

  // Handle product click
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="my-12 px-4">
      {/* Title Section */}
      <div className="text-center">
        <Title
          text1="BEST "
          text2="SELLERS"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 uppercase tracking-wide"
        />
        <p className="w-4/5 md:w-3/4 lg:w-1/2 mx-auto text-gray-700 text-sm md:text-base mt-2">
          Discover our top-selling products loved by customers.
        </p>
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {bestSellerProducts.map((product) => (
          <div
            key={product._id}
            className="flex justify-center transform transition-transform duration-300 hover:scale-105"
            onClick={() => handleProductClick(product._id)}
          >
            <ProductItems
              id={product._id}
              image={`${backEndURL.backendUrl}/products/${product.imageURL}`} // Use backend URL with image path
              name={product.productName} // Use productName
              price={product.price} // Use price
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
