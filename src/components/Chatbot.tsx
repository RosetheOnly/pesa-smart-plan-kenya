
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

interface Props {
  language: "en" | "sw";
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
    },
    botIntro: "Hi! I'm your InstallmentPay assistant. I can help you find the perfect business for your needs. What are you looking for today?",
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
    },
    botIntro: "Hujambo! Mimi ni msaidizi wako wa InstallmentPay. Ninaweza kukusaidia kupata biashara inayofaa mahitaji yako. Unatafuta nini leo?",
  },
};

const Chatbot: React.FC<Props> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const copy = chatCopy[language];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
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

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("business") || message.includes("biashara")) {
      return language === "en" 
        ? "I can help you find businesses! What type of product or service are you looking for? For example, electronics, clothing, or home services?"
        : "Ninaweza kukusaidia kupata biashara! Unatafuta aina gani ya bidhaa au huduma? Kwa mfano, vifaa vya umeme, nguo, au huduma za nyumbani?";
    }
    
    if (message.includes("installment") || message.includes("awamu")) {
      return language === "en"
        ? "With InstallmentPay, you can buy products and pay in installments while building savings! You pay a portion upfront and the rest in scheduled payments. Would you like me to find businesses that offer this?"
        : "Kwa InstallmentPay, unaweza kununua bidhaa na kulipa kwa awamu huku ukijenga akiba! Unalipa sehemu moja mwanzoni na kilichobaki kwa malipo yaliyopangwa. Je, ungependa nipate biashara zinazotoa hii?";
    }
    
    if (message.includes("price") || message.includes("compare") || message.includes("bei")) {
      return language === "en"
        ? "I can help you compare prices from different businesses! What specific product are you interested in? This will help me find the best deals for you."
        : "Ninaweza kukusaidia kulinganisha bei kutoka biashara mbalimbali! Ni bidhaa gani maalum unayoipenda? Hii itanisaidia kupata ofa bora kwa ajili yako.";
    }
    
    return language === "en"
      ? "I understand you're looking for help! Could you be more specific about what you need? I can help you find businesses, compare prices, or explain how our installment system works."
      : "Naelewa unatafuta msaada! Je, unaweza kuwa maalum zaidi kuhusu unachohitaji? Ninaweza kukusaidia kupata biashara, kulinganisha bei, au kuelezea jinsi mfumo wetu wa malipo ya awamu unavyofanya kazi.";
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

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
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
                <span className="text-sm text-gray-600">Typing...</span>
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
