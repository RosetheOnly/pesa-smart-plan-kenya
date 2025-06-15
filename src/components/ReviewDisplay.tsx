
import React from "react";
import { Star, User } from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  mediaUrls?: string[];
  createdAt: string;
}

interface Props {
  language: "en" | "sw";
  reviews: Review[];
}

const reviewCopy = {
  en: {
    noReviews: "No reviews yet",
    beFirst: "Be the first to leave a review!",
  },
  sw: {
    noReviews: "Hakuna tathmini bado",
    beFirst: "Kuwa wa kwanza kutoa tathmini!",
  },
};

const ReviewDisplay: React.FC<Props> = ({ language, reviews }) => {
  const copy = reviewCopy[language];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-medium">{copy.noReviews}</p>
        <p className="text-sm">{copy.beFirst}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4 bg-white">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-gray-400" />
              <span className="font-medium">{review.customerName}</span>
            </div>
            <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`w-4 h-4 ${
                  value <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
          </div>
          
          <p className="text-gray-700 mb-3">{review.comment}</p>
          
          {review.mediaUrls && review.mediaUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {review.mediaUrls.map((url, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  {url.includes('video') ? (
                    <video
                      src={url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={url}
                      alt={`Review media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewDisplay;
