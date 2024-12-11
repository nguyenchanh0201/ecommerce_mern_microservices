import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "",
    price: "",
    original_price: "",
    specifications: {
      ram: "",
      CPU: "",
      VGA: "",
      SSD: "",
      operating_system: "",
      battery: "",
    },
    description: "",
    brand: "",
    tags: "",
    stock: "",
    warranty: "",
    return_policy: "",
  });
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3003/products");
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError("Failed to fetch products");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const productData = {
      productName: newProduct.productName,
      category: newProduct.category,
      price: newProduct.price,
      original_price: newProduct.original_price,
      specifications: newProduct.specifications,
      description: newProduct.description,
      brand: newProduct.brand,
      tags: newProduct.tags.split(",").map((tag) => tag.trim()),
      stock: newProduct.stock,
      warranty: newProduct.warranty,
      return_policy: newProduct.return_policy,
    };

    const formData = new FormData();
    formData.append("productData", JSON.stringify(productData));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3003/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setProducts([...products, response.data.data]);
        resetForm();
        alert("Product added successfully!");
      } else {
        setError("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setError("Error adding product");
    }
  };

  // Hàm xử lý khi gửi form Edit
  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const productData = {
      productName: newProduct.productName,
      category: newProduct.category,
      price: newProduct.price,
      original_price: newProduct.original_price,
      specifications: newProduct.specifications,
      description: newProduct.description,
      brand: newProduct.brand,
      tags: newProduct.tags.split(",").map((tag) => tag.trim()),
      stock: newProduct.stock,
      warranty: newProduct.warranty,
      return_policy: newProduct.return_policy,
    };

    try {
      const response = await axios.put(
        `http://localhost:3003/products/${editingProduct._id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProduct._id ? response.data.data : product
          )
        );
        setEditingProduct(null);
        resetForm();
        alert("Product updated successfully!");
      } else {
        setError("Failed to update product.");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating product.");
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      console.log(`http://localhost:3003/products/${id}`);
      const response = await axios.delete(
        `http://localhost:3003/products/${id}`
      );
      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
    }
  };

  // Reset the form
  const resetForm = () => {
    setEditingProduct(null);
    setNewProduct({
      productName: "",
      category: "",
      price: "",
      original_price: "",
      specifications: {
        ram: "",
        CPU: "",
        VGA: "",
        SSD: "",
        operating_system: "",
        battery: "",
      },
      description: "",
      brand: "",
      tags: "",
      stock: "",
      warranty: "",
      return_policy: "",
    });
    setImage(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    // Cập nhật form với thông tin sản phẩm được chỉnh sửa
    setNewProduct({
      productName: product.productName,
      category: product.category,
      price: product.price,
      original_price: product.original_price,
      specifications: product.specifications,
      description: product.description,
      brand: product.brand,
      tags: product.tags.join(", "),
      stock: product.stock,
      warranty: product.warranty,
      return_policy: product.return_policy,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Management</h1>
      <div className="card p-3">
        <h5>{editingProduct ? "Edit Product" : "Add New Product"}</h5>
        <form
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          className="mb-3"
        >
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Product Name"
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Original Price"
            value={newProduct.original_price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, original_price: e.target.value })
            }
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Tags (comma-separated)"
            value={newProduct.tags}
            onChange={(e) =>
              setNewProduct({ ...newProduct, tags: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Warranty"
            value={newProduct.warranty}
            onChange={(e) =>
              setNewProduct({ ...newProduct, warranty: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Return Policy"
            value={newProduct.return_policy}
            onChange={(e) =>
              setNewProduct({ ...newProduct, return_policy: e.target.value })
            }
          />
          <h6>Specifications</h6>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="RAM"
            value={newProduct.specifications.ram}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specifications: {
                  ...newProduct.specifications,
                  ram: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="CPU"
            value={newProduct.specifications.CPU}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specifications: {
                  ...newProduct.specifications,
                  CPU: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="VGA"
            value={newProduct.specifications.VGA}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specifications: {
                  ...newProduct.specifications,
                  VGA: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="SSD"
            value={newProduct.specifications.SSD}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specifications: {
                  ...newProduct.specifications,
                  SSD: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Operating System"
            value={newProduct.specifications.operating_system}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specifications: {
                  ...newProduct.specifications,
                  operating_system: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Battery"
            value={newProduct.specifications.battery}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specifications: {
                  ...newProduct.specifications,
                  battery: e.target.value,
                },
              })
            }
          />
          <h6>Upload Image</h6>
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" className="btn btn-primary">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <h5 className="mt-4">Product List</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Ratings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.averageRatings}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
