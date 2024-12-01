import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Title from './Title';
import ProductItems from "../components/ProductItems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  const handleProductClick = (id) => {
    // Navigate to the product detail page
    navigate(`/product/${id}`); // Update with your actual route
    window.scrollTo(0, 0); // Scroll to the top of the page after navigation
  };

  return (
    <div className='my-12 px-4'>
      {/* Title Section */}
      <div className='text-center'>
        <Title 
          text1='BEST ' 
          text2='SELLERS' 
          className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 uppercase tracking-wide'
        />
        <p className='w-4/5 md:w-3/4 lg:w-1/2 mx-auto text-gray-700 text-sm md:text-base mt-2'>
          Discover our top-selling products loved by customers
        </p>
      </div>

      {/* Product Grid Section */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
        {bestSeller.map((item, index) => (
          <div 
            key={index} 
            className='flex justify-center transform transition-transform duration-300 hover:scale-105'
            onClick={() => handleProductClick(item._id)} // Add click event
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
}

export default BestSeller;
