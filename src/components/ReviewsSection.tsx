
import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import ReviewForm from "./ReviewForm";
import ReviewDisplay from "./ReviewDisplay";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  mediaUrls: string[];
  createdAt: string;
}

interface Props {
  language: "en" | "sw";
  reviews: Review[];
  onReviewSubmit: (reviewData: any) => void;
}

const ReviewsSection: React.FC<Props> = ({ language, reviews, onReviewSubmit }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = async (reviewData: any) => {
    await onReviewSubmit(reviewData);
    setShowReviewForm(false);
  };

  return (
    <>
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
        <ReviewDisplay language={language} reviews={reviews} />
      </div>

      {showReviewForm && (
        <ReviewForm
          language={language}
          productId="sample-product-id"
          businessId="sample-business-id"
          onSubmit={handleReviewSubmit}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </>
  );
};

export default ReviewsSection;
