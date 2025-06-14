
import React, { useState } from "react";
import { X, AlertCircle, LogIn } from "lucide-react";
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

interface LoginErrors {
  email: string;
  password: string;
  general: string;
}

const formCopy = {
  en: {
    businessTitle: "Login to Business Account",
    customerTitle: "Login to Customer Account",
    email: "Email Address",
    password: "Password",
    submit: "Login",
    cancel: "Cancel",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    invalidCredentials: "Invalid email or password",
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email address",
  },
  sw: {
    businessTitle: "Ingia Akaunti ya Biashara",
    customerTitle: "Ingia Akaunti ya Mteja",
    email: "Barua Pepe",
    password: "Neno la Siri",
    submit: "Ingia",
    cancel: "Ghairi",
    forgotPassword: "Umesahau neno la siri?",
    noAccount: "Huna akaunti?",
    invalidCredentials: "Barua pepe au neno la siri si sahihi",
    requiredField: "Sehemu hii inahitajika",
    invalidEmail: "Tafadhali ingiza barua pepe sahihi",
  },
};

const LoginForm: React.FC<Props> = ({ language, type, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({
    email: "",
    password: "",
    general: "",
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

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear errors when user starts typing
    if (errors[field as keyof LoginErrors]) {
      setErrors({ ...errors, [field]: "", general: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {
      email: "",
      password: "",
      general: "",
    };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = copy.requiredField;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = copy.invalidEmail;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = copy.requiredField;
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
    setErrors({ email: "", password: "", general: "" });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple mock authentication - in real app, this would be an API call
    // For demo purposes, we'll create a mock user based on email
    const mockUser = {
      id: Date.now().toString(),
      name: formData.email.split('@')[0],
      email: formData.email,
      phone: "+254712345678",
      type: type
    };

    try {
      // Log the user in
      login(mockUser);
      
      // Navigate to appropriate dashboard
      if (type === "business") {
        navigate("/business-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
      
      // Close form and reset
      onClose();
      setFormData({ email: "", password: "" });
      setErrors({ email: "", password: "", general: "" });
    } catch (error) {
      setErrors({ 
        ...errors, 
        general: copy.invalidCredentials 
      });
    }
    
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LogIn size={20} />
            {type === "business" ? copy.businessTitle : copy.customerTitle}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
            <AlertCircle size={16} />
            <span className="text-sm">{errors.general}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="login-email">{copy.email}</Label>
            <Input
              id="login-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? "border-red-500" : ""}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="login-password">{copy.password}</Label>
            <Input
              id="login-password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? "border-red-500" : ""}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
              {isSubmitting ? "Logging in..." : copy.submit}
            </Button>
          </div>
          
          <div className="text-center pt-2">
            <button 
              type="button" 
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {/* TODO: Implement forgot password */}}
            >
              {copy.forgotPassword}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
