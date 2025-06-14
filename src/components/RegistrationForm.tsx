
import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface Props {
  language: "en" | "sw";
  type: "business" | "customer";
  isOpen: boolean;
  onClose: () => void;
}

const formCopy = {
  en: {
    businessTitle: "Register Your Business",
    customerTitle: "Register as Customer",
    businessName: "Business Name",
    customerName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    submit: "Complete Registration",
    cancel: "Cancel",
    success: "Registration successful! You'll receive a confirmation SMS shortly.",
    phonePlaceholder: "+254 7XX XXX XXX",
  },
  sw: {
    businessTitle: "Sajili Biashara Yako",
    customerTitle: "Sajili kama Mteja",
    businessName: "Jina la Biashara",
    customerName: "Jina Kamili",
    email: "Barua Pepe",
    phone: "Nambari ya Simu",
    submit: "Maliza Usajili",
    cancel: "Ghairi",
    success: "Usajili umefanikiwa! Utapokea ujumbe wa uthibitisho hivi karibuni.",
    phonePlaceholder: "+254 7XX XXX XXX",
  },
};

const RegistrationForm: React.FC<Props> = ({ language, type, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { login } = useUser();
  const navigate = useNavigate();

  const copy = formCopy[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create user object
    const user = {
      id: Date.now().toString(), // Simple ID generation for demo
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: type
    };

    // Log the user in
    login(user);
    
    // Navigate to appropriate dashboard
    if (type === "business") {
      navigate("/business-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
    
    // Close form and reset
    onClose();
    setFormData({ name: "", email: "", phone: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {type === "business" ? copy.businessTitle : copy.customerTitle}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">
              {type === "business" ? copy.businessName : copy.customerName}
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">{copy.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">{copy.phone}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={copy.phonePlaceholder}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {copy.cancel}
            </Button>
            <Button type="submit" className="flex-1">
              {copy.submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
