import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Edit,
  Package,
  AlertTriangle,
  X,
} from "lucide-react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inventoryData, setInventoryData] = useState([
    {
      id: 1,
      product: "Brake Pads - Toyota Corolla 2014-2017",
      brand: "Bosch",
      articleNumber: "BRK-PRD-001",
      category: "Brakes",
      stock: 22,
      price: "₦18,500",
      value: "₦407,000",
    },
    {
      id: 2,
      product: "Brake Pads - Toyota Corolla 2014-2017",
      brand: "Bosch",
      articleNumber: "BRK-PRD-001",
      category: "Brakes",
      stock: 22,
      price: "₦18,500",
      value: "₦407,000",
    },
    {
      id: 3,
      product: "Brake Pads - Toyota Corolla 2014-2017",
      brand: "Bosch",
      articleNumber: "BRK-PRD-001",
      category: "Brakes",
      stock: 22,
      price: "₦18,500",
      value: "₦407,000",
    },
    {
      id: 4,
      product: "Engine Pads - Toyota Corolla 2014-2017",
      brand: "Bosch",
      articleNumber: "BRK-PRD-001",
      category: "Engine",
      stock: 22,
      price: "₦18,500",
      value: "₦407,000",
    },
    {
      id: 5,
      product: "Suspension - Toyota Corolla 2014-2017",
      brand: "Bosch",
      articleNumber: "BRK-PRD-001",
      category: "Suspension",
      stock: 22,
      price: "₦18,500",
      value: "₦407,000",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    product: "",
    brand: "",
    articleNumber: "",
    category: "",
    stock: "",
    price: "",
  });

  const filteredData = inventoryData.filter(
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || item.category === selectedCategory)
  );

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = inventoryData.length + 1;
    const priceNum = parseFloat(
      newItem.price.replace("₦", "").replace(",", "")
    );
    const stockNum = parseInt(newItem.stock, 10);
    const value = `₦${(priceNum * stockNum).toLocaleString()}`;
    setInventoryData([
      ...inventoryData,
      { ...newItem, id: newId, price: `₦${priceNum.toLocaleString()}`, value },
    ]);
    setNewItem({
      product: "",
      brand: "",
      articleNumber: "",
      category: "",
      stock: "",
      price: "",
    });
    setIsModalOpen(false);
  };

  const handleExport = () => {
    const csv = [
      [
        "ID",
        "Product",
        "Brand",
        "Article Number",
        "Category",
        "Stock",
        "Price",
        "Value",
      ],
      ...filteredData.map((item) => [
        item.id,
        item.product,
        item.brand,
        item.articleNumber,
        item.category,
        item.stock,
        item.price,
        item.value,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory_export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-[100%] w-full mx-auto">
        {/* Total Value Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#E5C35080] rounded-lg p-4 flex items-center">
            <div className="bg-[#E9C13B] p-2 rounded-lg mr-3">
              <Package className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#000000]">
                {inventoryData.length}
              </div>
              <div className="text-[#595858] text-sm">Total Products</div>
            </div>
          </div>
          <div className="bg-[#C4F3CE80] rounded-lg p-4 flex items-center">
            <div className="bg-[#9DD3AD] p-2 rounded-lg mr-3">
              <Package className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#000000]">
                ₦
                {inventoryData
                  .reduce(
                    (sum, item) =>
                      sum +
                      parseFloat(item.value.replace("₦", "").replace(",", "")),
                    0
                  )
                  .toLocaleString()}
              </div>
              <div className="text-[#595858] text-sm">Total Value</div>
            </div>
          </div>
          <div className="bg-[#F9CBC9] rounded-lg p-4 flex items-center">
            <div className="bg-[#E2A48A] p-2 rounded-lg mr-3">
              <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#000000]">
                {inventoryData.filter((item) => item.stock < 5).length}
              </div>
              <div className="text-[#595858] text-sm">Low Stock Items</div>
              <div className="text-[#595858] text-xs">Needs attention</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-black mb-1">
              Inventory List
            </h2>
            <p className="text-[#595858] text-sm sm:text-base">
              Manage your inventory items
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-[#56418C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
            <button
              className="bg-[#DDD7E9] text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-[#DDD7E9]/80"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 text-[#FFA629]" />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search products"
              className="w-full pl-10 pr-4 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none border border-[#6E6E6E] rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Brakes">Brakes</option>
              <option value="Engine">Engine</option>
              <option value="Suspension">Suspension</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Add Item Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-10 z-50">
            <div className="bg-white p-6 h-fit rounded-lg shadow-md w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-lg font-bold text-black">
                  Add New Item
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddItem} className="space-y-3">
                <div>
                  <label
                    htmlFor="product"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Product
                  </label>
                  <input
                    type="text"
                    id="product"
                    name="product"
                    value={newItem.product}
                    onChange={(e) =>
                      setNewItem({ ...newItem, product: e.target.value })
                    }
                    placeholder="Enter product name"
                    className="mt-1 w-full px-3 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={newItem.brand}
                    onChange={(e) =>
                      setNewItem({ ...newItem, brand: e.target.value })
                    }
                    placeholder="Enter brand name"
                    className="mt-1 w-full px-3 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="articleNumber"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Article Number
                  </label>
                  <input
                    type="text"
                    id="articleNumber"
                    name="articleNumber"
                    value={newItem.articleNumber}
                    onChange={(e) =>
                      setNewItem({ ...newItem, articleNumber: e.target.value })
                    }
                    placeholder="Enter article number"
                    className="mt-1 w-full px-3 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    className="mt-1 w-full px-3 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Brakes">Brakes</option>
                    <option value="Engine">Engine</option>
                    <option value="Suspension">Suspension</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={newItem.stock}
                    onChange={(e) =>
                      setNewItem({ ...newItem, stock: e.target.value })
                    }
                    placeholder="Enter stock quantity"
                    className="mt-1 w-full px-3 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                    placeholder="Enter price (e.g., ₦18,500)"
                    className="mt-1 w-full px-3 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-[#DDD7E9] text-black rounded-lg hover:bg-[#DDD7E9]/80 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#56418C] text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Inventory Table Section */}
        <div className="bg-[#F2F2F2] border border-[#F4F4F4] rounded-lg p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#F2F2F2] border-b border-[#D0CFCF]">
                <tr>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-[#595858] uppercase tracking-wider w-[30%] sm:w-[25%]">
                    PRODUCT
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-[#595858] uppercase tracking-wider hidden sm:table-cell w-[15%]">
                    ARTICLE NUMBER
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-[#595858] uppercase tracking-wider w-[15%] sm:w-[10%]">
                    CATEGORY
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-[#595858] uppercase tracking-wider w-[15%] sm:w-[10%]">
                    STOCK
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-[#595858] uppercase tracking-wider hidden sm:table-cell w-[15%]">
                    PRICE
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-[#595858] uppercase tracking-wider hidden sm:table-cell w-[15%]">
                    VALUE
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs font-medium text-[#595858] uppercase tracking-wider w-[10%]">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0CFCF]">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F2F2F2]">
                    <td className="py-2 px-2 sm:px-4 align-middle">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#8D7EB1] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                            {item.product}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {item.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-800 align-middle hidden sm:table-cell">
                      {item.articleNumber}
                    </td>
                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-800 align-middle">
                      {item.category}
                    </td>
                    <td className="py-2 px-2 sm:px-4 align-middle">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-[#C4F3CE80] text-[#595858]">
                        {item.stock}
                      </span>
                    </td>
                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-800 align-middle hidden sm:table-cell">
                      {item.price}
                    </td>
                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-gray-800 align-middle hidden sm:table-cell">
                      {item.value}
                    </td>
                    <td className="py-2 px-2 sm:px-4 align-middle">
                      <button className="text-[#595858] hover:text-[#56418C]">
                        <Edit className="w-4 sm:w-5 h-4 sm:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
