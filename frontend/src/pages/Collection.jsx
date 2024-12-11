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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [itemsPerPage] = useState(5); // Số sản phẩm trên mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${backEndURL.backendUrl}/products/page/?page=${currentPage}&limit=${itemsPerPage}`
        );

        // Set sản phẩm và tổng số trang từ API response
        if (response.data && response.data.data) {
          setProducts(response.data.data.docs);
          setTotalPages(response.data.data.totalPages || 1); // Dùng tổng số trang nếu có
        } else {
          throw new Error("Invalid response format: Missing 'products' or 'totalPages'.");
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
        alert("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, [backEndURL, currentPage]);

  // Các bộ lọc
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const toggleBrand = (e) => {
    const value = e.target.value;
    setBrand((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }

    if (brand.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        brand.includes(product.brand)
      );
    }

    return productsCopy;
  };

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

  useEffect(() => {
    let filteredProducts = applyFilter();
    filteredProducts = sortProducts(filteredProducts);
    setFilterProducts(filteredProducts);
  }, [category, brand, sortType, products, search, showSearch]);

  // Xử lý click vào sản phẩm
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
              <input type="checkbox" value="Laptop" onChange={toggleCategory} /> Laptop
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value="Gaming" onChange={toggleCategory} /> Laptop Gaming
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value="Graphics" onChange={toggleCategory} /> Laptop Graphic
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
              <input type="checkbox" value="Asus" onChange={toggleBrand} /> Asus
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value="MSI" onChange={toggleBrand} /> MSI
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value="Lenovo" onChange={toggleBrand} /> Lenovo
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value="Dell" onChange={toggleBrand} /> Dell
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
          {filterProducts.map((product) => {
            // Kiểm tra xem sản phẩm có đầy đủ dữ liệu không
            if (!product._id || !product.productName || !product.price || !product.imageURL) {
              console.warn("Invalid product data:", product);
              return null;
            }

            return (
              <div
                key={product._id}
                className="transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleProductClick(product._id)}
              >
                <ProductItems
                  id={product._id}
                  image={`${backEndURL.backendUrl}/products/${product.imageURL}`}
                  name={product.productName}
                  price={product.price}
                />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="pagination flex gap-2">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
              </li>
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${currentPage === pageNumber + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Collection;
