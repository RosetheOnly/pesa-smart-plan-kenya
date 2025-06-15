
import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import WelcomeSection from "../components/WelcomeSection";
import PurchasesList from "../components/PurchasesList";
import ReviewsSection from "../components/ReviewsSection";
import ReferralTracker from "../components/ReferralTracker";
import Chatbot from "../components/Chatbot";
import InstallmentSelector from "../components/InstallmentSelector";
import SavingsTracker from "../components/SavingsTracker";
import SMSMessageSchedule from "../components/SMSMessageSchedule";
import BusinessBrowser from "../components/BusinessBrowser";
import PaymentDemo from "../components/PaymentDemo";

const CustomerDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
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

  // Mock business data for chatbot
  const mockBusinessData = [
    {
      id: "1",
      name: "TechHub Electronics",
      category: "Electronics",
      location: "Nairobi, Kenya",
      rating: 4.5,
      products: [
        { id: "1", name: "Samsung Galaxy S24", price: 85000, category: "Smartphones" },
        { id: "2", name: "MacBook Pro", price: 250000, category: "Laptops" },
        { id: "3", name: "iPhone 15", price: 120000, category: "Smartphones" }
      ]
    },
    {
      id: "2", 
      name: "Fashion Forward",
      category: "Clothing",
      location: "Mombasa, Kenya",
      rating: 4.2,
      products: [
        { id: "4", name: "Designer Dress", price: 15000, category: "Clothing" },
        { id: "5", name: "Leather Jacket", price: 25000, category: "Clothing" }
      ]
    }
  ];

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

  const handleReviewSubmit = async (reviewData: any) => {
    console.log("Review submitted:", reviewData);
    // Here you would typically save to Supabase
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
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <WelcomeSection />

        <BusinessBrowser
          language={language}
          businesses={mockBusinessesWithProfiles}
          onBusinessSelect={handleBusinessSelect}
        />

        <InstallmentSelector language={language} />

        <SavingsTracker language={language} />

        <SMSMessageSchedule language={language} />

        <ReferralTracker language={language} referralData={mockReferralData} />

        <ReviewsSection
          language={language}
          reviews={mockReviews}
          onReviewSubmit={handleReviewSubmit}
        />

        <PurchasesList purchases={mockUserData.purchases} />

        <PaymentDemo language={language} />
      </main>

      <Chatbot 
        language={language} 
        userData={mockUserData}
        businessData={mockBusinessData}
      />
    </div>
  );
};

export default CustomerDashboard;
