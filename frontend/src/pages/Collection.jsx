import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import { useNavigate } from 'react-router-dom'; 

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate(); 

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };


  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    return productsCopy;
  };

  // Sort products based on selected sort type
  const sortProducts = (productsCopy) => {
    switch (sortType) {
      case "low-high":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "high-low":
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy; 
    }
  };

  // Effect to apply filter and sort when category, subCategory or sortType changes
  useEffect(() => {
    let filteredProducts = applyFilter();
    filteredProducts = sortProducts(filteredProducts);
    setFilterProducts(filteredProducts);
  }, [category, subCategory, sortType, products, search, showSearch]);

  // Handle product click and navigate to product detail
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Change this to your product detail route
    window.scrollTo(0, 0); // Scroll to the top after navigation
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter */}
      <div className="min-w-60">
        <p onClick={() => setShowFilters(prev => !prev)} className="my-2 text-1 flex items-center cursor-pointer gap-2">
          FILTERS
          <img 
            src={assets.dropdown_icon} 
            alt="toggle" 
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`} 
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Laptop" onChange={toggleCategory} />Laptop
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Gaming" onChange={toggleCategory} />Laptop Gaming
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Graphics" onChange={toggleCategory} />Laptop Graphic
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">BRAND</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Dell" onChange={toggleSubCategory} />Dell
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="MSI" onChange={toggleSubCategory} />MSI
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Lenovo" onChange={toggleSubCategory} />Lenovo
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Asus" onChange={toggleSubCategory} />Asus
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL " text2="COLLECTION" />
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filterProducts.map((item, index) => (
            <div 
              key={index} 
              className="cursor-pointer" 
              onClick={() => handleProductClick(item._id)} // Add click event to navigate and scroll
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
    </div>
  );
};

export default Collection;
