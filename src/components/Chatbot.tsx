
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface BusinessData {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  products: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
  }>;
}

interface UserPurchase {
  id: string;
  productName: string;
  businessName: string;
  amount: number;
  paymentsCompleted: number;
  totalPayments: number;
  status: 'active' | 'completed';
}

interface Props {
  language: "en" | "sw";
  userData?: {
    purchases: UserPurchase[];
    savings: number;
    totalSpent: number;
  };
  businessData?: BusinessData[];
}

const chatCopy = {
  en: {
    title: "InstallmentPay Assistant",
    placeholder: "Ask me about products, services, or businesses...",
    send: "Send",
    suggestions: {
      findBusiness: "Find businesses near me",
      compareProducts: "Compare product prices",
      howItWorks: "How does installment payment work?",
      bestDeals: "Show me the best deals",
      myPurchases: "Show my purchase status",
      savingsGoal: "Help me with savings goals",
    },
    botIntro: "Hi! I'm your InstallmentPay assistant. I can help you find businesses, track your purchases, and manage your savings. What would you like to know?",
  },
  sw: {
    title: "Msaidizi wa InstallmentPay",
    placeholder: "Niulize kuhusu bidhaa, huduma, au biashara...",
    send: "Tuma",
    suggestions: {
      findBusiness: "Tafuta biashara karibu nami",
      compareProducts: "Linganisha bei za bidhaa",
      howItWorks: "Jinsi malipo ya awamu yanavyofanya kazi?",
      bestDeals: "Nionyeshe ofa bora",
      myPurchases: "Onyesha hali ya ununuzi wangu",
      savingsGoal: "Nisaidie na malengo ya akiba",
    },
    botIntro: "Hujambo! Mimi ni msaidizi wako wa InstallmentPay. Ninaweza kukusaidia kupata biashara, kufuatilia ununuzi wako, na kusimamia akiba yako. Ungependa kujua nini?",
  },
};

const Chatbot: React.FC<Props> = ({ 
  language, 
  userData = { purchases: [], savings: 0, totalSpent: 0 },
  businessData = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const copy = chatCopy[language];

  // Mock business and product data for demonstration
  const mockBusinessData: BusinessData[] = [
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

  const allBusinessData = businessData.length > 0 ? businessData : mockBusinessData;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        text: copy.botIntro,
        isBot: true,
        timestamp: new Date(),
        suggestions: Object.values(copy.suggestions),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, copy]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateIntelligentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Purchase status inquiries
    if (message.includes("purchase") || message.includes("order") || message.includes("ununuzi")) {
      if (userData.purchases.length === 0) {
        return language === "en" 
          ? "You haven't made any purchases yet. Would you like me to show you available products and businesses?"
          : "Bado hujafanya ununuzi wowote. Je, ungependa nionyeshe bidhaa na biashara zilizopo?";
      }
      
      const activePurchases = userData.purchases.filter(p => p.status === 'active');
      const completedPurchases = userData.purchases.filter(p => p.status === 'completed');
      
      return language === "en"
        ? `You have ${activePurchases.length} active purchases and ${completedPurchases.length} completed ones. Your latest purchase is ${userData.purchases[0]?.productName} from ${userData.purchases[0]?.businessName} with ${userData.purchases[0]?.paymentsCompleted}/${userData.purchases[0]?.totalPayments} payments completed.`
        : `Una ununuzi ${activePurchases.length} unaoendelea na ${completedPurchases.length} uliomaliza. Ununuzi wako wa hivi karibuni ni ${userData.purchases[0]?.productName} kutoka ${userData.purchases[0]?.businessName} na malipo ${userData.purchases[0]?.paymentsCompleted}/${userData.purchases[0]?.totalPayments} yamekamilika.`;
    }

    // Savings inquiries
    if (message.includes("saving") || message.includes("akiba")) {
      return language === "en"
        ? `You've saved KSh ${userData.savings.toLocaleString()} so far through our installment system! You've spent a total of KSh ${userData.totalSpent.toLocaleString()}. Would you like tips on how to save more?`
        : `Umehifadhi KSh ${userData.savings.toLocaleString()} hadi sasa kupitia mfumo wetu wa malipo ya awamu! Umetumia jumla ya KSh ${userData.totalSpent.toLocaleString()}. Je, ungependa vidokezo vya jinsi ya kuhifadhi zaidi?`;
    }

    // Business search
    if (message.includes("business") || message.includes("biashara") || message.includes("store")) {
      const availableCategories = [...new Set(allBusinessData.map(b => b.category))];
      const businessList = allBusinessData.map(b => `${b.name} (${b.category}, Rating: ${b.rating})`).join(", ");
      
      return language === "en"
        ? `I found ${allBusinessData.length} businesses: ${businessList}. Available categories: ${availableCategories.join(", ")}. Which type interests you?`
        : `Nimepata biashara ${allBusinessData.length}: ${businessList}. Makundi yaliyopo: ${availableCategories.join(", ")}. Ni aina gani inakuvutia?`;
    }

    // Product search and comparison
    if (message.includes("product") || message.includes("price") || message.includes("compare") || message.includes("bidhaa")) {
      const allProducts = allBusinessData.flatMap(b => 
        b.products.map(p => ({ ...p, businessName: b.name, businessRating: b.rating }))
      );
      
      if (message.includes("phone") || message.includes("smartphone") || message.includes("simu")) {
        const phones = allProducts.filter(p => p.category.toLowerCase().includes("smartphone"));
        if (phones.length > 0) {
          const phoneList = phones.map(p => `${p.name}: KSh ${p.price.toLocaleString()} at ${p.businessName}`).join(", ");
          return language === "en"
            ? `Available smartphones: ${phoneList}. The cheapest is KSh ${Math.min(...phones.map(p => p.price)).toLocaleString()}.`
            : `Simu zilizopo: ${phoneList}. Rahisi zaidi ni KSh ${Math.min(...phones.map(p => p.price)).toLocaleString()}.`;
        }
      }
      
      if (message.includes("laptop") || message.includes("computer")) {
        const laptops = allProducts.filter(p => p.category.toLowerCase().includes("laptop"));
        if (laptops.length > 0) {
          const laptopList = laptops.map(p => `${p.name}: KSh ${p.price.toLocaleString()} at ${p.businessName}`).join(", ");
          return language === "en"
            ? `Available laptops: ${laptopList}. All support installment payments!`
            : `Laptops zilizopo: ${laptopList}. Zote zinasaidia malipo ya awamu!`;
        }
      }

      const topProducts = allProducts.sort((a, b) => b.businessRating - a.businessRating).slice(0, 3);
      const productList = topProducts.map(p => `${p.name}: KSh ${p.price.toLocaleString()}`).join(", ");
      
      return language === "en"
        ? `Top-rated products: ${productList}. All available with flexible payment plans. Which interests you?`
        : `Bidhaa bora zaidi: ${productList}. Zote zinapatikana na mipango ya malipo rahisi. Ni ipi inakuvutia?`;
    }

    // Best deals
    if (message.includes("deal") || message.includes("cheap") || message.includes("offer") || message.includes("ofa")) {
      const allProducts = allBusinessData.flatMap(b => 
        b.products.map(p => ({ ...p, businessName: b.name }))
      );
      const cheapestProducts = allProducts.sort((a, b) => a.price - b.price).slice(0, 3);
      const dealsList = cheapestProducts.map(p => `${p.name} at ${p.businessName}: KSh ${p.price.toLocaleString()}`).join(", ");
      
      return language === "en"
        ? `Best deals right now: ${dealsList}. All can be paid in installments starting from as low as 25% down payment!`
        : `Ofa bora sasa hivi: ${dealsList}. Zote zinaweza kulipwa kwa awamu kuanzia malipo ya kwanza ya chini ya 25%!`;
    }

    // Installment explanation
    if (message.includes("installment") || message.includes("awamu") || message.includes("how") || message.includes("work")) {
      return language === "en"
        ? "With InstallmentPay, you pay 25-50% upfront and the rest in 2-6 monthly installments. While paying, you also build savings! No interest charges, just a small service fee. You get the product immediately and build financial discipline."
        : "Kwa InstallmentPay, unalipa 25-50% mwanzoni na kilichobaki kwa awamu za kila mwezi 2-6. Huku ukilipa, pia unajenga akiba! Hakuna riba, tu ada ndogo ya huduma. Unapata bidhaa mara moja na kujenga nidhamu ya kifedha.";
    }

    // Location-based recommendations
    if (message.includes("near") || message.includes("location") || message.includes("karibu")) {
      const nairobiBusinesses = allBusinessData.filter(b => b.location.includes("Nairobi"));
      const mombasaBusinesses = allBusinessData.filter(b => b.location.includes("Mombasa"));
      
      return language === "en"
        ? `In Nairobi: ${nairobiBusinesses.map(b => b.name).join(", ")}. In Mombasa: ${mombasaBusinesses.map(b => b.name).join(", ")}. Which location are you interested in?`
        : `Nairobi: ${nairobiBusinesses.map(b => b.name).join(", ")}. Mombasa: ${mombasaBusinesses.map(b => b.name).join(", ")}. Ni eneo gani linakuvutia?`;
    }

    // Default intelligent response
    return language === "en"
      ? `I understand you're looking for help! I have access to ${allBusinessData.length} businesses with ${allBusinessData.reduce((total, b) => total + b.products.length, 0)} products. I can help you find the best deals, compare prices, track your purchases, or explain our installment system. What specific information do you need?`
      : `Naelewa unatafuta msaada! Nina ufikiaji wa biashara ${allBusinessData.length} zenye bidhaa ${allBusinessData.reduce((total, b) => total + b.products.length, 0)}. Ninaweza kukusaidia kupata ofa bora, kulinganisha bei, kufuatilia ununuzi wako, au kuelezea mfumo wetu wa malipo ya awamu. Ni habari gani maalum unahitaji?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateIntelligentResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-semibold">{copy.title}</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.isBot 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-blue-600 text-white'
            }`}>
              <div className="flex items-start gap-2">
                {message.isBot && <Bot size={16} className="mt-1 text-blue-600" />}
                {!message.isBot && <User size={16} className="mt-1" />}
                <p className="text-sm">{message.text}</p>
              </div>
              
              {message.suggestions && (
                <div className="mt-2 space-y-1">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left text-xs bg-white text-blue-600 px-2 py-1 rounded border hover:bg-blue-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-1">
                <Bot size={16} className="text-blue-600" />
                <span className="text-sm text-gray-600">Analyzing your data...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={copy.placeholder}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
