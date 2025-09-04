import React from "react";
import {
  ShoppingCart,
  Users,
  AlertTriangle,
  Plus,
  Package,
  UserPlus,
  FileText,
  ChartSpline,
} from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-[100%] w-full mx-auto">
        {/* Header */}
        <div className="bg-[#594799] rounded-xl p-4 sm:p-6 text-white mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">
            Welcome back to Gapa Auto POS!
          </h1>
          <p className="text-purple-100 text-xs sm:text-sm">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Today's Sales */}
          <div className="bg-[#C4F3CE80] rounded-lg p-4 flex items-center">
            <div className="bg-[#9DD3AD] p-2 rounded-lg mr-3">
              <ChartSpline className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#000000]">
                ₦450,000
              </div>
              <div className="text-[#595858] text-sm">Today's Sales</div>
              <div className="text-[#595858] text-xs">+21% from yesterday</div>
            </div>
          </div>

          {/* Orders Today */}
          <div className="bg-[#E5C35080] rounded-lg p-4 flex items-center">
            <div className="bg-[#E9C13B] p-2 rounded-lg mr-3">
              <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-black">24</div>
              <div className="text-[#595858] text-sm">Orders Today</div>
              <div className="text-[#595858] text-xs">+8% from yesterday</div>
            </div>
          </div>

          {/* Customers */}
          <div className="bg-[#8D7EB180] rounded-lg p-4 flex items-center">
            <div className="bg-[#8D7EB1] p-2 rounded-lg mr-3">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#000000]">
                18
              </div>
              <div className="text-[#595858] text-sm">Customers</div>
              <div className="text-[#595858] text-xs">-1% from yesterday</div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-[#F9CBC9] rounded-lg p-4 flex items-center">
            <div className="bg-[#E2A48A] p-2 rounded-lg mr-3">
              <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#000000]">
                2
              </div>
              <div className="text-[#595858] text-sm">Low Stock Items</div>
              <div className="text-[#595858] text-xs">Needs attention</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-bold text-black mb-1">
            Recent Activity
          </h2>
          <p className="text-[#595858] text-sm sm:text-base mb-4 sm:mb-6">
            Latest transactions and updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-[#F2F2F2] border border-[#F4F4F4] rounded-lg p-4 sm:p-6">
            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-center border border-[#D0CFCF] rounded-xl p-3">
                <div className="flex items-center">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#8D7EB1] rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm sm:text-base">
                      Adebola Johnson
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm">
                      Brake Pads
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    ₦18,500
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">
                    2 minutes ago
                  </div>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-center border border-[#D0CFCF] rounded-xl p-3">
                <div className="flex items-center">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#8D7EB1] rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm sm:text-base">
                      Adebola Johnson
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm">
                      Brake Pads
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    ₦18,500
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">
                    5 minutes ago
                  </div>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-center border border-[#D0CFCF] rounded-xl p-3">
                <div className="flex items-center">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#8D7EB1] rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm sm:text-base">
                      Adebola Johnson
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm">
                      Brake Pads
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    ₦18,500
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">
                    12 minutes ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#F2F2F2] border border-[#C9C9C9] rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-medium text-[#635656] mb-1">
              ⚡ Quick Actions
            </h2>
            <p className="text-[#595858] text-xs sm:text-sm mb-4 sm:mb-6">
              Common tasks and shortcuts
            </p>

            <div className="space-y-3">
              {/* Make New Sale */}
              <button className="w-full bg-[#DDD7E9] hover:bg-[#DDD7E9]/80 text-black rounded-lg p-3 flex items-center transition-colors">
                <div className="w-6 sm:w-7 h-6 sm:h-7 bg-[#E8E8E8] flex items-center justify-center mr-3">
                  <Plus className="w-4 sm:w-5 h-4 sm:h-5 text-[#FFA629]" />
                </div>
                <span className="font-medium text-sm sm:text-base">
                  Make New Sale
                </span>
              </button>

              {/* Add Products */}
              <button className="w-full bg-[#DDD7E9] hover:bg-[#DDD7E9]/80 text-black rounded-lg p-3 flex items-center transition-colors">
                <div className="w-6 sm:w-7 h-6 sm:h-7 bg-[#E8E8E8] flex items-center justify-center mr-3">
                  <Package className="w-4 sm:w-5 h-4 sm:h-5 text-[#FFA629]" />
                </div>
                <span className="font-medium text-sm sm:text-base">
                  Add Products
                </span>
              </button>

              {/* Add Customers */}
              <button className="w-full bg-[#DDD7E9] hover:bg-[#DDD7E9]/80 text-black rounded-lg p-3 flex items-center transition-colors">
                <div className="w-6 sm:w-7 h-6 sm:h-7 bg-[#E8E8E8] flex items-center justify-center mr-3">
                  <UserPlus className="w-4 sm:w-5 h-4 sm:h-5 text-[#FFA629]" />
                </div>
                <span className="font-medium text-sm sm:text-base">
                  Add Customers
                </span>
              </button>

              {/* View Report */}
              <button className="w-full bg-[#DDD7E9] hover:bg-[#DDD7E9]/80 text-black rounded-lg p-3 flex items-center transition-colors">
                <div className="w-6 sm:w-7 h-6 sm:h-7 bg-[#E8E8E8] flex items-center justify-center mr-3">
                  <FileText className="w-4 sm:w-5 h-4 sm:h-5 text-[#FFA629]" />
                </div>
                <span className="font-medium text-sm sm:text-base">
                  View Report
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
