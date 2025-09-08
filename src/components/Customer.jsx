import React, { useState } from "react";
import { Search, Edit3, User, Plus } from "lucide-react";

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Adebola Johnson",
      phone: "+2348073456976",
      email: "adebola.johnson@gmail.com",
    },
    {
      id: 2,
      name: "Chika Okeke",
      phone: "+2348123456789",
      email: "chika.okeke@gmail.com",
    },
    {
      id: 3,
      name: "Fatima Bello",
      phone: "+2348098765432",
      email: "fatima.bello@gmail.com",
    },
    {
      id: 4,
      name: "Emeka Nwosu",
      phone: "+2348012345678",
      email: "emeka.nwosu@gmail.com",
    },
    {
      id: 5,
      name: "Aisha Mohammed",
      phone: "+2348076543210",
      email: "aisha.mohammed@gmail.com",
    },
    {
      id: 6,
      name: "Tunde Adeyemi",
      phone: "+2348033332211",
      email: "tunde.adeyemi@gmail.com",
    },
    {
      id: 7,
      name: "Ngozi Eze",
      phone: "+2348055554321",
      email: "ngozi.eze@gmail.com",
    },
    {
      id: 8,
      name: "Ifeanyi Okoro",
      phone: "+2348077779999",
      email: "ifeanyi.okoro@gmail.com",
    },
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.fullName.trim()) {
      alert("Full Name is required");
      return;
    }
    const newId = customers.length + 1;
    setCustomers([
      ...customers,
      {
        id: newId,
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.emailAddress,
      },
    ]);
    setFormData({ fullName: "", phoneNumber: "", emailAddress: "" });
  };

  const filteredCustomers = customers.filter((customer) =>
    (customer.name || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6 md:p-0">
      <div className="max-w-[100%] w-full mx-auto">
        {/* Header */}
        <div
          className="mb-10"
          style={{ width: "100%", ["--lgWidth"]: "calc(100% - 22rem)" }}
        >
          <h1 className="text-xl sm:text-2xl font-bold text-[#353535] mb-1">
            Customer Management
          </h1>
          <p className="text-sm sm:text-base text-[#353535]">
            Manage your customer profiles and track interactions
          </p>
          {/* Search Bar */}
          <div className="relative my-3">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search customers"
              className="w-full pl-10 pr-4 py-2 border border-[#6E6E6E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#56418C] text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-[#F1F1F18F] border border-[#F4F4F4] rounded-lg p-4 sm:p-6">
              {/* Table Header */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 text-xs border-b border-[#D0CFCF] pb-4 font-medium text-[#595858] uppercase tracking-wide">
                <div className="sm:col-span-1">Customer</div>
                <div className="hidden sm:block sm:col-span-1">
                  Phone Number
                </div>
                <div className="hidden sm:block sm:col-span-1">
                  Email Address
                </div>
                <div className="sm:col-span-1 text-right">Action</div>
              </div>

              {/* Customer List */}
              <div className="space-y-3">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center py-3 hover:bg-[#F2F2F2]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#8D7EB1] rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">
                          {customer.name}
                        </div>
                        <div className="text-xs text-gray-500 sm:hidden">
                          {customer.phone}
                        </div>
                        <div className="text-xs text-gray-500 sm:hidden">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-800 hidden sm:block">
                      {customer.phone}
                    </div>
                    <div className="text-sm text-gray-800 hidden sm:block">
                      {customer.email}
                    </div>
                    <div className="flex justify-end">
                      <button className="text-[#595858] hover:text-[#56418C]">
                        <Edit3 className="w-4 sm:w-5 h-4 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Customer Form */}
          <div className="lg:w-80">
            <div className="bg-[#EAEED9] rounded-lg p-4 sm:p-6">
              <div className="flex space-x-4 items-center">
                <Plus className="w-5 h-5 text-[#202020]" />
                <h2 className="text-base sm:text-lg font-bold text-[#202020]">
                  Quick Add Customer
                </h2>
              </div>
              <h2 className="text-sm font-bold text-[#595858] mb-4">
                Create new customer profile
              </h2>
              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#595858] text-left"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="mt-1 w-full px-3 py-2 border border-[#D4D4D4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#56418C] text-sm bg-[#F2F2F2]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-[#595858] text-left"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="mt-1 w-full px-3 py-2 border border-[#D4D4D4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#56418C] text-sm bg-[#F2F2F2]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-medium text-[#595858] text-left"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="mt-1 w-full px-3 py-2 border border-[#D4D4D4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#56418C] text-sm bg-[#F2F2F2]"
                  />
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        fullName: "",
                        phoneNumber: "",
                        emailAddress: "",
                      })
                    }
                    className="px-4 py-2 bg-[#DDD7E9] text-black rounded-lg hover:bg-[#DDD7E9]/80 text-sm"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F5C82F] text-[#202020] rounded-lg  text-sm"
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
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
};

export default Customer;
