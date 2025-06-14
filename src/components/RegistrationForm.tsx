
import React, { useState } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
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

interface ValidationErrors {
  name: string;
  email: string;
  phone: string;
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
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid Kenyan phone number",
    requiredField: "This field is required",
    phoneFormat: "Format: +254XXXXXXXXX or 07XXXXXXXX",
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
    invalidEmail: "Tafadhali ingiza barua pepe sahihi",
    invalidPhone: "Tafadhali ingiza nambari ya simu ya Kenya sahihi",
    requiredField: "Sehemu hii inahitajika",
    phoneFormat: "Mfumo: +254XXXXXXXXX au 07XXXXXXXX",
  },
};

const RegistrationForm: React.FC<Props> = ({ language, type, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();
  const copy = formCopy[language];

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Kenyan phone number validation
  const validatePhone = (phone: string): boolean => {
    // Remove all spaces and special characters except +
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Kenyan phone number patterns:
    // +254XXXXXXXXX (9 digits after country code)
    // 254XXXXXXXXX 
    // 07XXXXXXXX or 01XXXXXXXX (local format)
    const patterns = [
      /^\+254[7][0-9]{8}$/, // +254 7XXXXXXXX
      /^254[7][0-9]{8}$/,   // 254 7XXXXXXXX
      /^0[17][0-9]{8}$/     // 07XXXXXXXX or 01XXXXXXXX
    ];
    
    return patterns.some(pattern => pattern.test(cleanPhone));
  };

  // Real-time validation
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      name: "",
      email: "",
      phone: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = copy.requiredField;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = copy.requiredField;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = copy.invalidEmail;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = copy.requiredField;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = copy.invalidPhone;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create user object
    const user = {
      id: Date.now().toString(),
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
    setErrors({ name: "", email: "", phone: "" });
    setIsSubmitting(false);
  };

  const getFieldIcon = (field: keyof ValidationErrors) => {
    if (!formData[field]) return null;
    
    if (errors[field]) {
      return <AlertCircle size={16} className="text-red-500" />;
    }
    
    // Show check mark for valid fields
    if (field === 'email' && validateEmail(formData[field])) {
      return <CheckCircle size={16} className="text-green-500" />;
    }
    if (field === 'phone' && validatePhone(formData[field])) {
      return <CheckCircle size={16} className="text-green-500" />;
    }
    if (field === 'name' && formData[field].trim()) {
      return <CheckCircle size={16} className="text-green-500" />;
    }
    
    return null;
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
            <div className="relative">
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? "border-red-500" : ""}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getFieldIcon('name')}
              </div>
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email">{copy.email}</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getFieldIcon('email')}
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">{copy.phone}</Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder={copy.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getFieldIcon('phone')}
              </div>
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">{copy.phoneFormat}</p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {copy.cancel}
            </Button>
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : copy.submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
