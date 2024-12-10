import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const { search, showSearch } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilters, setShowFilters] = useState(false);
  const backEndURL = useContext(ShopContext);
  const navigate = useNavigate();


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backEndURL.backendUrl}/products`);
      console.log(response.data); // Log the entire response to check its structure

      // Assuming the response data structure contains a `data` property with an array of products
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data); // Set products to the array of products inside the `data` property
      } else {
        throw new Error("Invalid response format: No 'data' array found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      alert("Failed to fetch products. Please try again later.");
    }
  };

  fetchProducts();
}, [backEndURL]);


  // Handle category filter toggle
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  // Handle brand filter toggle
  const toggleBrand = (e) => {
    const value = e.target.value;
    setBrand((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  // Apply filters to the product list
  const applyFilter = () => {
    let productsCopy = products.slice();

    // Filter by search
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }

    // Filter by brand (previously subcategory)
    if (brand.length > 0) {
      productsCopy = productsCopy.filter(
        (product) => brand.includes(product.brand) // Change to item.brand
      );
    }

    return productsCopy;
  };

  // Sort products based on the selected sort type
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

  // Effect to apply filter and sort when dependencies change
  useEffect(() => {
    let filteredProducts = applyFilter();
    filteredProducts = sortProducts(filteredProducts);
    setFilterProducts(filteredProducts);
  }, [category, brand, sortType, products, search, showSearch]);

  // Handle product click and navigate to product detail
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters((prev) => !prev)}
          className="my-2 text-1 flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="toggle"
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Laptop"
                onChange={toggleCategory}
              />
              Laptop
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Gaming"
                onChange={toggleCategory}
              />
              Laptop Gaming
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Graphics"
                onChange={toggleCategory}
              />
              Laptop Graphic
            </p>
          </div>
        </div>

        {/* Brand Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">BRAND</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Asus"
                onChange={toggleBrand}
              />
              Asus
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="MSI"
                onChange={toggleBrand}
              />
              MSI
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Lenovo"
                onChange={toggleBrand}
              />
              Lenovo
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Dell"
                onChange={toggleBrand}
              />
              Dell
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL " text2="COLLECTION" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filterProducts.map((product) => (
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
    </div>
  );
};

export default Collection;
