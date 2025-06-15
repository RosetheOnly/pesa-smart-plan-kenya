
import React, { useState } from "react";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  specialties: string[];
  services: string[];
  workingHours: string;
  image?: string;
}

interface Props {
  language: "en" | "sw";
  businesses: Business[];
  onBusinessSelect: (business: Business) => void;
}

const businessBrowserCopy = {
  en: {
    title: "Find Businesses",
    searchPlaceholder: "Search businesses or services...",
    categories: "Categories",
    allCategories: "All Categories",
    location: "Location",
    allLocations: "All Locations",
    rating: "Rating",
    anyRating: "Any Rating",
    reviews: "reviews",
    viewDetails: "View Details",
    noResults: "No businesses found matching your criteria",
    specialties: "Specialties:",
    services: "Services:",
    hours: "Hours:",
  },
  sw: {
    title: "Tafuta Biashara",
    searchPlaceholder: "Tafuta biashara au huduma...",
    categories: "Makundi",
    allCategories: "Makundi Yote",
    location: "Mahali",
    allLocations: "Maeneo Yote",
    rating: "Daraja",
    anyRating: "Daraja Lolote",
    reviews: "tathmini",
    viewDetails: "Angalia Maelezo",
    noResults: "Hakuna biashara iliyopatikana inayolingana na vigezo vyako",
    specialties: "Utaalamu:",
    services: "Huduma:",
    hours: "Masaa:",
  },
};

const BusinessBrowser: React.FC<Props> = ({ language, businesses, onBusinessSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [minRating, setMinRating] = useState("all");

  const copy = businessBrowserCopy[language];

  // Get unique categories and locations
  const categories = [...new Set(businesses.map(b => b.category))];
  const locations = [...new Set(businesses.map(b => b.location))];

  // Filter businesses based on search criteria
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = !searchTerm || 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      business.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || business.location === selectedLocation;
    const matchesRating = minRating === "all" || business.rating >= parseInt(minRating);

    return matchesSearch && matchesCategory && matchesLocation && matchesRating;
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Search className="w-6 h-6 text-blue-600" />
        {copy.title}
      </h3>

      {/* Search and Filter Controls */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{copy.categories}</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder={copy.allCategories} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{copy.allCategories}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{copy.location}</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder={copy.allLocations} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{copy.allLocations}</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{copy.rating}</label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger>
                <SelectValue placeholder={copy.anyRating} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{copy.anyRating}</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="2">2+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Business Results */}
      <div className="space-y-4">
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>{copy.noResults}</p>
          </div>
        ) : (
          filteredBusinesses.map(business => (
            <div key={business.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold">{business.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{business.location}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {business.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{business.rating}</span>
                    <span className="text-sm text-gray-600">({business.reviewCount} {copy.reviews})</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-3 text-sm">{business.description}</p>

              {business.specialties.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">{copy.specialties} </span>
                  <span className="text-sm text-gray-600">{business.specialties.join(', ')}</span>
                </div>
              )}

              {business.services.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">{copy.services} </span>
                  <span className="text-sm text-gray-600">{business.services.join(', ')}</span>
                </div>
              )}

              {business.workingHours && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700">{copy.hours} </span>
                  <span className="text-sm text-gray-600">{business.workingHours}</span>
                </div>
              )}

              <Button 
                onClick={() => onBusinessSelect(business)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {copy.viewDetails}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusinessBrowser;
