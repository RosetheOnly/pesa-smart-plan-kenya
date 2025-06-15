
import React from "react";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

interface BusinessInfo {
  id: string;
  uniqueId: string;
  name: string;
  category: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  description: string;
}

interface Props {
  language: "en" | "sw";
  business: BusinessInfo;
  onSelect: (businessId: string) => void;
}

const businessCopy = {
  en: {
    reviews: "reviews",
    contact: "Contact",
    select: "Select Business",
  },
  sw: {
    reviews: "tathmini",
    contact: "Wasiliana",
    select: "Chagua Biashara",
  },
};

const BusinessIdentifier: React.FC<Props> = ({ language, business, onSelect }) => {
  const copy = businessCopy[language];

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-lg">{business.name}</h3>
            <p className="text-sm text-gray-600">ID: {business.uniqueId}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`text-xs ${
                  value <= business.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-600 ml-1">
              ({business.reviewCount} {copy.reviews})
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-3 text-sm">{business.description}</p>

      <div className="space-y-1 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{business.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{business.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{business.email}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {business.category}
        </span>
        <button
          onClick={() => onSelect(business.id)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          {copy.select}
        </button>
      </div>
    </div>
  );
};

export default BusinessIdentifier;
