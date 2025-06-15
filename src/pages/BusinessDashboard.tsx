import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Building2, Star, Users, TrendingUp, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import BusinessIdentifier from "../components/BusinessIdentifier";
import ReviewDisplay from "../components/ReviewDisplay";
import ProductManager from "../components/ProductManager";
import BusinessProfile from "../components/BusinessProfile";

const BusinessDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [language] = useState<"en" | "sw">("en");

  // Mock business data
  const mockBusinessInfo = {
    id: "business-123",
    uniqueId: "BIZ-00001-KE",
    name: "TechHub Electronics",
    category: "Electronics",
    location: "Nairobi, Kenya",
    phone: "+254712345678",
    email: "info@techhub.co.ke",
    rating: 4.5,
    reviewCount: 24,
    description: "Leading electronics store offering the latest smartphones, laptops, and accessories with flexible payment options.",
  };

  const mockBusinessReviews = [
    {
      id: "1",
      customerName: "Alice Johnson",
      rating: 5,
      comment: "Amazing store with great customer service! The installment plan helped me get the laptop I needed for work.",
      mediaUrls: ["https://example.com/review1.jpg"],
      createdAt: "2024-06-12T14:20:00Z",
    },
    {
      id: "2",
      customerName: "Michael Ochieng",
      rating: 4,
      comment: "Good selection of products. Payment process was smooth and staff was helpful.",
      createdAt: "2024-06-10T09:15:00Z",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBusinessSelect = (businessId: string) => {
    console.log("Business selected:", businessId);
  };

  const handleProfileSave = (profileData: any) => {
    console.log("Business profile saved:", profileData);
    // Here you would typically save to your backend/database
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/a5afb001-a130-4e74-b93c-b7a74c46ebd9.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-[#0455fc]">InstallmentPay</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-2xl font-bold mb-2">Business Dashboard</h2>
          <p className="text-gray-600">Manage your business profile, reviews, and sales</p>
        </div>

        {/* Business Profile */}
        <BusinessProfile
          language={language}
          onSave={handleProfileSave}
        />

        {/* Business Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">KSh 145,000</p>
                <p className="text-sm text-gray-600">This Month Sales</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">87</p>
                <p className="text-sm text-gray-600">Active Customers</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">4.5</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product/Service Management */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-purple-600" />
            Products & Services
          </h3>
          <ProductManager language={language} />
        </div>

        {/* Business Identifier */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Your Business Profile
          </h3>
          <BusinessIdentifier
            language={language}
            business={mockBusinessInfo}
            onSelect={handleBusinessSelect}
          />
        </div>

        {/* Reviews Management */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Customer Reviews
          </h3>
          <ReviewDisplay language={language} reviews={mockBusinessReviews} />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Order #12345</p>
                <p className="text-sm text-gray-600">Customer: John Doe</p>
              </div>
              <div className="text-right">
                <p className="font-bold">KSh 15,000</p>
                <p className="text-sm text-green-600">Payment 2/4 received</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Order #12344</p>
                <p className="text-sm text-gray-600">Customer: Jane Smith</p>
              </div>
              <div className="text-right">
                <p className="font-bold">KSh 8,500</p>
                <p className="text-sm text-blue-600">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;
