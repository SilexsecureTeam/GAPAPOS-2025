import React, { useState } from "react";
import { X, Package } from "lucide-react";

export default function ShoppingCart() {
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

  const [searchPhone, setSearchPhone] = useState("");

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vatRate = 0.075;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("NGN", "₦");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Shopping Cart</h1>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-orange-300 hover:bg-orange-400 text-white rounded-md transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search customer by Phone number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
        />
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.code}</p>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      QUANTITY
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      {cartItems.length > 0 && (
        <>
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>VAT (7.5%)</span>
              <span>{formatPrice(vat)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition-colors">
              Check Out
            </button>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition-colors">
              Save to Draft
            </button>
          </div>
        </>
      )}

      {cartItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Your cart is empty</p>
        </div>
      )}
    </div>
  );
}
