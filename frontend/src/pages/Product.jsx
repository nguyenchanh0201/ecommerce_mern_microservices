import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";

const Product = () => {
  const { productId } = useParams(); // Using productId directly from useParams
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [comments, setComments] = useState([]); // Initialize with an empty array
  const [newComment, setNewComment] = useState("");
  const backEndURL = useContext(ShopContext);

  // Fetch product data using API
  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${backEndURL.backendUrl}/products/${productId}`); // Use productId here
      const product = response.data.data; // Assuming product data is in 'data' property
      setProductData(product);
      setImage(`${backEndURL.backendUrl}/products/${product.imageURL}`); // Default image set from the product data

      // Set comments from productData.reviews
      if (product.reviews) {
        setComments(product.reviews); // Assuming reviews is an array of { username, comment }
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("Failed to fetch product details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]); // Dependency on productId to fetch data when it changes

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newReview = { username: "CurrentUser", comment: newComment };

    // Add the new comment locally
    setComments([...comments, newReview]);

    // Optionally, send the new comment to the backend (if supported)
    setNewComment("");
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full"></div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="Product main" />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.productName}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_dull_icon} alt="Star" className="w-3" />
            <p className="text-gray-500 text-sm">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Add to Cart Button */}
          <button onClick={() => addToCart(productData._id)} className="mt-5 bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>

          {/* Product Warranty and Return Policy */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Genuine warranty for 24 months.</p>
            <p>Support for exchange within 7 days.</p>
            <p>Integrated licensed Windows.</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      

      {/* Comment Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-medium mb-4">Comments</h2>
        <div className="flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-medium">{comment.username}</p>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          ))}
        </div>
        {/* Add Comment */}
        <div className="mt-6">
          <textarea
            className="border w-full p-3 rounded text-sm"
            rows="4"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 active:bg-blue-700"
          >
            Add Comment
          </button>
        </div>
      </div>
      <RelatedProducts category={productData.category} brand={productData.brand} />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
