import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Star, Gift, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import ReviewForm from "../components/ReviewForm";
import ReviewDisplay from "../components/ReviewDisplay";
import ReferralTracker from "../components/ReferralTracker";
import Chatbot from "../components/Chatbot";
import InstallmentSelector from "../components/InstallmentSelector";
import SavingsTracker from "../components/SavingsTracker";
import SMSMessageSchedule from "../components/SMSMessageSchedule";
import BusinessBrowser from "../components/BusinessBrowser";

const CustomerDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [language] = useState<"en" | "sw">("en");

  // Mock data for demonstration with media URLs
  const mockReviews = [
    {
      id: "1",
      customerName: "John Doe",
      rating: 5,
      comment: "Excellent service and quality products. The installment plan made it very affordable!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop"
      ],
      createdAt: "2024-06-10T10:00:00Z",
    },
    {
      id: "2", 
      customerName: "Jane Smith",
      rating: 4,
      comment: "Good experience overall. Fast delivery and helpful customer support.",
      mediaUrls: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop"
      ],
      createdAt: "2024-06-08T15:30:00Z",
    }
  ];

  const mockReferralData = {
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarnings: 35,
    pendingEarnings: 15,
    referralCode: "REF123XYZ",
  };

  // Mock user data for chatbot
  const mockUserData = {
    purchases: [
      {
        id: "1",
        productName: "Samsung Galaxy Phone",
        businessName: "Electronics Store ABC",
        amount: 25000,
        paymentsCompleted: 3,
        totalPayments: 6,
        status: 'active' as const
      },
      {
        id: "2", 
        productName: "Nike Running Shoes",
        businessName: "Sports Store XYZ",
        amount: 8500,
        paymentsCompleted: 4,
        totalPayments: 4,
        status: 'completed' as const
      }
    ],
    savings: 5500,
    totalSpent: 33500
  };

  // Mock business data with profiles
  const mockBusinessesWithProfiles = [
    {
      id: "1",
      name: "TechHub Electronics",
      category: "Electronics",
      location: "Nairobi, Kenya",
      rating: 4.5,
      reviewCount: 24,
      description: "Leading electronics store offering the latest smartphones, laptops, and accessories with flexible payment options.",
      specialties: ["Smartphones", "Laptops", "Gaming Accessories", "Smart Home Devices"],
      services: ["Free Delivery", "Installation", "2-Year Warranty", "24/7 Support"],
      workingHours: "Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM",
    },
    {
      id: "2",
      name: "Fashion Forward",
      category: "Clothing",
      location: "Mombasa, Kenya",
      rating: 4.2,
      reviewCount: 18,
      description: "Trendy fashion store with the latest styles for men and women. Affordable luxury with installment options.",
      specialties: ["Designer Clothing", "Casual Wear", "Formal Attire", "Accessories"],
      services: ["Personal Styling", "Alterations", "Home Delivery", "Return Policy"],
      workingHours: "Mon-Sat 9AM-7PM, Sun 10AM-5PM",
    },
    {
      id: "3",
      name: "Home & Garden Plus",
      category: "Home & Garden",
      location: "Kisumu, Kenya",
      rating: 4.7,
      reviewCount: 31,
      description: "Complete home improvement solutions from furniture to garden supplies. Transform your space with our installment plans.",
      specialties: ["Furniture", "Garden Tools", "Home Decor", "Appliances"],
      services: ["Assembly Service", "Design Consultation", "Bulk Discounts", "Seasonal Sales"],
      workingHours: "Mon-Fri 7AM-6PM, Sat 8AM-5PM",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleReviewSubmit = async (reviewData: any) => {
    console.log("Review submitted:", reviewData);
    // Here you would typically save to Supabase
    setShowReviewForm(false);
  };

  const handleBusinessSelect = (business: any) => {
    console.log("Selected business:", business);
    // Here you could navigate to a detailed business page or show more info
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
          <h2 className="text-2xl font-bold mb-2">Customer Dashboard</h2>
          <p className="text-gray-600">Manage your purchases, reviews, and referrals</p>
        </div>

        {/* Business Browser */}
        <BusinessBrowser
          language={language}
          businesses={mockBusinessesWithProfiles}
          onBusinessSelect={handleBusinessSelect}
        />

        {/* Installment Plan Selector */}
        <InstallmentSelector language={language} />

        {/* Savings Tracker */}
        <SavingsTracker language={language} />

        {/* SMS Message Schedule */}
        <SMSMessageSchedule language={language} />

        {/* Referral Tracker */}
        <ReferralTracker language={language} referralData={mockReferralData} />

        {/* Reviews Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Product Reviews
            </h3>
            <Button onClick={() => setShowReviewForm(true)} className="bg-green-600 hover:bg-green-700">
              <Star size={16} className="mr-2" />
              Write Review
            </Button>
          </div>
          <ReviewDisplay language={language} reviews={mockReviews} />
        </div>

        {/* Recent Purchases */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-bold mb-4">Recent Purchases</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Samsung Galaxy Phone</p>
                <p className="text-sm text-gray-600">Electronics Store ABC</p>
              </div>
              <div className="text-right">
                <p className="font-bold">KSh 25,000</p>
                <p className="text-sm text-green-600">3/6 payments made</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Nike Running Shoes</p>
                <p className="text-sm text-gray-600">Sports Store XYZ</p>
              </div>
              <div className="text-right">
                <p className="font-bold">KSh 8,500</p>
                <p className="text-sm text-blue-600">Paid in full</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          language={language}
          productId="sample-product-id"
          businessId="sample-business-id"
          onSubmit={handleReviewSubmit}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      {/* Enhanced Intelligent Chatbot */}
      <Chatbot 
        language={language} 
        userData={mockUserData}
        businessData={mockBusinessData}
      />
    </div>
  );
};

export default CustomerDashboard;
