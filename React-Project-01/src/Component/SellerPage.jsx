import React, { useState, useEffect } from "react";

function SellerPage() {
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("sellerItems")) || [];
    setProducts(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("sellerItems", JSON.stringify(products));
  }, [products]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      productId,
      Selling_Price: price,
      Product_Name: productName,
      _id: Date.now().toString(),
    };

    setProducts([...products, newProduct]);
    resetForm();
  };

  const resetForm = () => {
    setProductId("");
    setPrice("");
    setProductName("");
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updatedProducts);
  };
  
  const calculateTotalValue = () => {
    const totalValue = products.reduce((sum, product) => {
      return sum + parseFloat(product.Selling_Price);
    }, 0);
  
    return totalValue.toFixed(2);
  };
  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500">
        <h1 className="text-white text-2xl text-center">Add Product</h1>
        <br />
        <h2 className="text-center">Product ID</h2>
        <div className="flex shadow rounded-lg overflow-hidden md-4">
          <input
            type="number"
            className="outline-none w-full py-1 px-1"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <br />
        <h2 className="text-center">Selling Price</h2>
        <div className="flex shadow rounded-lg overflow-hidden md-4">
          <input
            type="number"
            className="outline-none w-full py-1 px-1"
            placeholder="Selling Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <br />
        <h2 className="text-center">Product Name</h2>
        <div className="flex shadow rounded-lg overflow-hidden md-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-1"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <button
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 rounded-lg my-3"
          onClick={handleFormSubmit}
        >
          Add Product
        </button>

        <div className="w-full max-w-full mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-green-500 text-black-500">
          <h2 className="text-white text-center text-3xl">Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                Product ID: {product.productId}, Selling Price:{" "}
                {product.Selling_Price}, Product Name: {product.Product_Name}
                <button className="utline-none bg-red-600 text-white px-2 py-0.1 shrink-0 rounded-lg my-2" onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-full mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-green-500 text-Red-500">
          <h2 className="text-white">Total Value Worth of Product :</h2>
          <p className="text-white text-center text-3*1">RS : {calculateTotalValue()}</p>
        </div>
      </div>
    </>
  );
}

export default SellerPage;
