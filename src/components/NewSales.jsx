import React, { useState } from "react";
import { X, QrCode, Plus, Check, Minus, Filter, Package } from "lucide-react";

const NewSales = () => {
  const [currentView, setCurrentView] = useState("main"); // 'main', 'payment', 'success'
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Brake Pads – Toyota Corolla 2014-201",
      code: "BRK-PRD-001",
      quantity: 1,
      price: 18500,
    },
    {
      id: 2,
      name: "Brake Pads – Toyota Corolla 2014-201",
      code: "BRK-PRD-001",
      quantity: 1,
      price: 18500,
    },
  ]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [paymentForm, setPaymentForm] = useState({
    customerName: "",
    email: "",
    phone: "",
  });

  // Sample products data (replace with Inventory.js data or API in production)
  const products = [
    {
      id: 1,
      name: "Brake Pads - Toyota Corolla 2014-2017",
      code: "SKU: BRK-PAD-TOY-T-PAIR-BP-TOY-T-697",
      price: 4500,
      stock: 8,
    },
    {
      id: 2,
      name: "Oil Filter - Honda Civic 2016-2020",
      code: "SKU: OIL-FLT-HON-C-2016-2020",
      price: 3200,
      stock: 12,
    },
    {
      id: 3,
      name: "Spark Plug - Nissan Altima 2013-2018",
      code: "SKU: SPRK-PLG-NIS-A-2013-2018",
      price: 1500,
      stock: 20,
    },
    {
      id: 4,
      name: "Air Filter - Toyota Camry 2012-2017",
      code: "SKU: AIR-FLT-TOY-C-2012-2017",
      price: 2800,
      stock: 15,
    },
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = totalAmount * 0.075; // 7.5% VAT
  const additionalFee = 1500; // PC27-TCG fee
  const grandTotal = totalAmount + vat + additionalFee;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("NGN", "₦");
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, inStock: product.stock > 0 },
      ]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    const product = products.find((p) => p.id === id);
    if (newQuantity < 1 || newQuantity > product.stock) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handlePaymentInput = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentForm.customerName.trim()) {
      alert("Customer name is required");
      return;
    }
    setCurrentView("success");
  };

  const ShoppingCart = () => (
    <div className="w-full lg:max-w-none bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-xl font-semibold text-gray-800">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-[#E2A48A] text-sm  text-white rounded-md transition-colors "
        >
          Clear All
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 sm:mb-8">
        <input
          type="text"
          placeholder="Search customer by Phone number"
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm sm:text-base"
        />
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6 sm:mb-8">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#414245] rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4  text-white" />
                  </div>
                  <div className="">
                    <div className="flex-1 flex">
                      <div className="">
                        <h3 className="font-medium text-[#838383] mb-1 text-xs ">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#838383]">
                          {item.code}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex items-end space-x-3 sm:space-x-4">
                      <div className="mt-3 sm:mt-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          QUANTITY
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={
                            products.find((p) => p.id === item.id)?.stock || 1
                          }
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-base sm:text-lg font-semibold text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 sm:py-12 text-gray-500">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm sm:text-base">Your cart is empty</p>
          </div>
        )}
      </div>

      {/* Totals */}
      {cartItems.length > 0 && (
        <>
          <div className="border-t border-gray-200 pt-4 sm:pt-6 space-y-3 text-sm sm:text-base">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>PC27-TCG</span>
              <span>{formatPrice(additionalFee)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>VAT (7.5%)</span>
              <span>{formatPrice(vat)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 sm:space-x-4 mt-6 sm:mt-8">
            <button
              onClick={() => setCurrentView("payment")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition-colors text-sm sm:text-base"
              disabled={cartItems.length === 0}
            >
              Check Out
            </button>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition-colors text-sm sm:text-base">
              Save to Draft
            </button>
          </div>
        </>
      )}
    </div>
  );

  const MainView = () => (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-[100%] w-full mx-auto">
        {/* Header */}
        <div className="flex space-x-4 lg:flex-row flex-col">
          <div className="">
            <div
              className="mb-6"
              // style={{ width: "100%", ["--lgWidth"]: "calc(100% - 22rem)" }}
            >
              <div className="bg-[#F5C82F] p-4 rounded-b-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 text-white p-2 rounded">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <h1 className="font-semibold text-gray-800">
                        Spare part Lookup
                      </h1>
                      <p className="text-sm text-[#575757] max-w-sm">
                        Search by Make/Model/Year, or scan barcode for precise
                        part matching.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Search Form */}
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-end max-w-[80%] text-[#4B4848]">
                    <div className="flex-1">
                      <label
                        htmlFor="make"
                        className="block text-base font-medium"
                      >
                        Make
                      </label>
                      <select
                        id="make"
                        className="w-full p-2 rounded bg-white text-sm"
                      >
                        <option>Eg Toyota...</option>
                        {["Toyota", "Honda", "Nissan", "Ford"].map((make) => (
                          <option key={make}>{make}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="model"
                        className="block text-base font-medium"
                      >
                        Model
                      </label>
                      <select
                        id="model"
                        className="w-full p-2 rounded bg-white text-sm"
                      >
                        <option>Eg Hilux...</option>
                        {["Hilux", "Corolla", "Civic", "Altima"].map(
                          (model) => (
                            <option key={model}>{model}</option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Eg Brake Disc"
                        className="w-full p-2 rounded bg-white text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 items-end">
                    <QrCode size={36} className="sm:size-30" />
                    <button className="bg-[#2E3171] text-white px-4 sm:px-6 py-2 rounded font-medium text-sm hover:bg-indigo-700">
                      Start Scanner
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              <div className="p-4 sm:p-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="gap-2">
                    <h2 className="text-lg font-semibold text-[#777171]">
                      Products
                    </h2>
                    <p className="text-sm text-[#777171]">
                      Click on item to add to cart
                    </p>
                  </div>
                  <div className="text-right bg-[#F2F2F2] flex items-center">
                    <div className="p-1">
                      <Filter size={16} className="text-[#777171]" />
                    </div>
                    <input
                      type="text"
                      placeholder="All Categories"
                      className="w-full p-2 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-lg border border-[#EBEBEB]"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="bg-[#414245] text-white p-2 w-10 h-10 flex items-center justify-center">
                          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-medium text-[#838383] mb-1 text-sm">
                                {product.name}
                              </h3>
                              <p className="text-xs text-[#838383] mb-2">
                                {product.code}
                              </p>
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className="text-[#2E3171] bg-[#E8E8E8] w-8 h-8 rounded flex items-center justify-center hover:bg-[#2E3171] hover:text-white"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="flex justify-between items-center mt-3 sm:mt-4">
                            <span className="font-bold text-[#838383]">
                              {formatPrice(product.price)}
                            </span>
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  product.stock > 0
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <span
                                className={`text-xs ${
                                  product.stock > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {product.stock > 0
                                  ? `${product.stock} in stock`
                                  : "Out of stock"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Shopping Cart */}
          <div className="lg:w-84">
            <ShoppingCart />
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 1024px) {
          div[style] {
            width: var(--lgWidth) !important;
          }
        }
      `}</style>
    </div>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center  p-8 justify-center z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Complete Payment
          </h2>
          <button
            onClick={() => setCurrentView("main")}
            className="text-gray-600 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Payment Summary</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {cartItems.length} item(s) • Walk-in Customer
            </span>
            <span className="font-bold text-lg sm:text-xl">
              {formatPrice(grandTotal)}
            </span>
          </div>
        </div>
        <div className="flex space-x-8 justify-between flex-col md:flex-row">
          {/* Payment Methods */}
          <div className="space-y-3 mb-4">
            <button className="w-full p-3 bg-indigo-600 text-white rounded-lg flex items-center gap-3 hover:bg-indigo-700 text-sm">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                <div className="w-3 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="font-medium">Card Payment</span>
            </button>
            <button className="w-full p-3 border-2 border-gray-200 rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-100 text-sm">
              <div className="w-6 h-6 text-indigo-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M3 6h18v12H3V6zm2 2v8h14V8H5z" />
                </svg>
              </div>
              <span>Bank Transfer</span>
            </button>
            <button className="w-full p-3 border-2 border-gray-200 rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-100 text-sm">
              <div className="w-6 h-6 text-indigo-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span>Cash</span>
            </button>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handlePaymentSubmit}
            className="space-y-4 mb-4 flex-1"
          >
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-600 text-left"
              >
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={paymentForm.customerName}
                onChange={handlePaymentInput}
                placeholder="Enter customer name"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 text-left"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={paymentForm.email}
                onChange={handlePaymentInput}
                placeholder="Enter email address"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600 text-left"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={paymentForm.phone}
                onChange={handlePaymentInput}
                placeholder="Enter phone number"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCurrentView("main")}
                className="flex-1 py-3 bg-yellow-400 text-gray-800 rounded-lg font-medium text-sm hover:bg-yellow-500"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700"
              >
                Complete Payment {formatPrice(grandTotal)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-md mx-4 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={40} className="text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Transaction Successful
          </h2>
        </div>
        <button
          onClick={() => {
            setCartItems([]);
            setCurrentView("main");
          }}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700"
        >
          Start New Sale
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {currentView === "main" && <MainView />}
      {currentView === "payment" && <PaymentModal />}
      {currentView === "success" && <SuccessModal />}
    </div>
  );
};

export default NewSales;
