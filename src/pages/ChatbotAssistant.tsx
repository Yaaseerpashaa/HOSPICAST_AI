import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// Animation keyframes component for background
const AnimatedBackground: React.FC<{isDark: boolean}> = ({ isDark }) => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating medical icons */}
        <div className="absolute w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full ${
                isDark ? 'bg-blue-500/10' : 'bg-blue-600/5'
              }`}
              style={{
                width: `${Math.floor(Math.random() * 60) + 20}px`,
                height: `${Math.floor(Math.random() * 60) + 20}px`,
                top: `${Math.floor(Math.random() * 100)}%`,
                left: `${Math.floor(Math.random() * 100)}%`,
                animation: `float ${Math.floor(Math.random() * 20) + 30}s linear infinite`,
                animationDelay: `${Math.floor(Math.random() * 10)}s`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>
        
        {/* Gradient orbs that slowly move */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '500px',
            height: '500px',
            background: isDark ? 'radial-gradient(circle, rgba(30,64,175,0.15) 0%, rgba(30,58,138,0) 70%)' : 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0) 70%)',
            top: '10%',
            left: '20%',
            animation: 'orb1 40s ease-in-out infinite alternate',
          }}
        />
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '600px',
            height: '600px',
            background: isDark ? 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(67,56,202,0) 70%)' : 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)',
            bottom: '5%',
            right: '5%',
            animation: 'orb2 50s ease-in-out infinite alternate',
          }}
        />
      </div>
      
      {/* Base background with pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: isDark 
            ? `url('https://img.freepik.com/free-vector/abstract-medical-background-with-hexagons-pattern_1017-26432.jpg')`
            : `url('https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61802.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
        
        @keyframes orb1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(100px, 50px);
          }
        }
        
        @keyframes orb2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-100px, -50px);
          }
        }
      `}} />
    </>
  );
};

const ChatbotAssistant: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "bot" }>
  >([
    {
      text: "👋 Hi! I'm your medical assistant. Please describe your symptoms one at a time.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [showConsultation, setShowConsultation] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [email, setEmail] = useState("");
  const [emailError] = useState("");
  const [bookingStep, setBookingStep] = useState<
    "time" | "email" | "confirmation"
  >("time");

  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        dates.push(formattedDate);
      }
    }

    return dates;
  };

  const availableDates = generateDates();
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);

  const handleConsultRequest = () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.text.includes("Recommended doctor")) {
      setMessages((prev) => [
        ...prev,
        { text: "❗ Please describe symptoms first", sender: "bot" },
      ]);
      return;
    }
    setShowConsultation(true);
    setSelectedDoctor(
      lastMessage.text.split("Recommended doctor:")[1].split("\n")[0].trim()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userInput = input.trim();
    if (!userInput) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { 
      text: userInput, 
      sender: "user" 
    }]);
    
    // Clear input
    setInput("");
    
    // Process input
    processUserInput(userInput);
  };

  // Process user input
  const processUserInput = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Check if the input is "done" or similar phrases to finalize symptoms
    if (lowercaseInput === "done" || 
        lowercaseInput.includes("i'm done") || 
        lowercaseInput.includes("that's all") || 
        lowercaseInput.includes("finish") || 
        lowercaseInput.includes("complete")) {
      
      if (symptoms.length === 0) {
        const response = "❗ Please tell me at least one symptom before saying 'done'.";
        setMessages((prev) => [
          ...prev,
          { text: response, sender: "bot" },
        ]);
      } else {
        processSymptomsAndRespond();
      }
    } 
    // Check for greetings or introduction
    else if (lowercaseInput.includes("hello") || 
             lowercaseInput.includes("hi there") || 
             lowercaseInput.includes("hey") || 
             lowercaseInput.includes("good day")) {
      
      const response = "👋 Hello! I'm your medical assistant. I'm here to help you identify possible conditions based on your symptoms. Please describe any symptoms you're experiencing.";
      setMessages((prev) => [
        ...prev,
        { text: response, sender: "bot" },
      ]);
    }
    // Check for help requests
    else if (lowercaseInput.includes("help") || 
             lowercaseInput.includes("how do") || 
             lowercaseInput.includes("what should") || 
             lowercaseInput.includes("instructions")) {
      
      const response = "To use this medical assistant, simply describe your symptoms one by one. After each symptom I'll confirm it. When you've mentioned all your symptoms, type 'done' and I'll provide a possible diagnosis.";
      setMessages((prev) => [
        ...prev,
        { text: response, sender: "bot" },
      ]);
    }
    // Process as a symptom
    else {
      // Add the symptom
      setSymptoms((prev) => [...prev, userInput.toLowerCase()]);
      
      // Format symptom count message
      const symptomCount = symptoms.length + 1;
      const countText = symptomCount === 1 ? "first" : 
                       symptomCount === 2 ? "second" : 
                       symptomCount === 3 ? "third" : `${symptomCount}th`;
      
      const response = `Symptom "${userInput}" recorded. That's your ${countText} symptom. Tell me another symptom or type 'done' to get a diagnosis.`;
      setMessages((prev) => [
        ...prev,
        { text: `✅ ${response}`, sender: "bot" },
      ]);
    }
    
    // Scroll to bottom whenever a new message is added
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Function to process symptoms and provide a response
  const processSymptomsAndRespond = () => {
    const result = {
      disease: "Common Cold",
      doctor: "Dr. Sarah Johnson",
      location: "Floor 2, General Medicine Ward, Room 205",
      schedule: "9:00 AM - 5:00 PM, Mon-Fri",
    };

    setMessages((prev) => [
      ...prev,
      {
        text: `🏥 Based on your symptoms:\n${symptoms
          .map((s) => `• ${s}`)
          .join("\n")}\n\n📋 Possible condition: ${
          result.disease
        }\n\n👨‍⚕️ Recommended doctor: ${result.doctor}\n📍 Location: ${
          result.location
        }\n⏰ Available: ${
          result.schedule
        }\n\n⚠️ IMPORTANT: This is only a preliminary assessment. Please consult the recommended healthcare professional for accurate diagnosis and treatment.`,
        sender: "bot",
      },
    ]);
    setSymptoms([]);
  };

  // Add scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div
        className={`min-h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        } relative`}
      >
        <AnimatedBackground isDark={isDark} />
        
        <div className="max-w-3xl mx-auto p-4 relative min-h-screen flex flex-col">
          <button
            onClick={() => navigate(-1)}
            className={`mb-4 flex items-center ${
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          {/* Chat UI */}
          <div
            className={`flex-1 rounded-xl shadow-2xl overflow-hidden ${
              isDark ? "bg-gray-800/90" : "bg-white/95"
            } border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } backdrop-blur-md flex flex-col`}
          >
            {/* header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <h1 className="text-white text-xl font-bold">
                      Medical Assistant
                    </h1>
                    <p className="text-blue-100 text-xs">
                      Your 24/7 Healthcare Companion
                    </p>
                  </div>
                </div>
                <div className="text-white/80 text-xs">
                  <button
                    onClick={handleConsultRequest}
                    className="flex items-center hover:text-white transition-colors bg-blue-500/30 px-3 py-1.5 rounded-md"
                  >
                    <span className="mr-1">🎥</span>
                    Request Consultation
                  </button>
                </div>
              </div>
            </div>
            {/* Messages container */}
            <div
              className="flex-1 overflow-y-auto p-4"
              style={{ maxHeight: showConsultation ? "40vh" : "70vh" }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-4/5 rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? `${
                            isDark
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                          }`
                        : `${
                            isDark
                              ? "bg-gray-700 text-gray-100"
                              : "bg-gray-200 text-gray-800"
                          }`
                    }`}
                  >
                    <div style={{ whiteSpace: "pre-wrap" }}>{message.text}</div>
                  </div>
                </div>
              ))}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Consultation booking interface */}
            {showConsultation && (
              <div className={`${isDark ? "bg-gray-700" : "bg-blue-50"} p-4 border-t ${
                isDark ? "border-gray-600" : "border-blue-100"
              }`}>
                {bookingStep === "time" && (
                  <>
                    <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                      Book Consultation with {selectedDoctor}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                          Select Date
                        </label>
                        <select
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={`w-full p-2 rounded border ${
                            isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                          }`}
                        >
                          {availableDates.map((date) => (
                            <option key={date} value={date}>
                              {date}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                          Select Time
                        </label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className={`w-full p-2 rounded border ${
                            isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                          }`}
                        >
                          <option value="">Select a time</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => setBookingStep("email")}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      Continue
                    </button>
                  </>
                )}

                {bookingStep === "email" && (
                  <>
                    <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                      Enter Your Email
                    </h3>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full p-2 rounded border mb-2 ${
                        isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                      }`}
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mb-2">{emailError}</p>
                    )}
                    <button
                      onClick={() => setBookingStep("confirmation")}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      Confirm Booking
                    </button>
                  </>
                )}

                {bookingStep === "confirmation" && (
                  <div className={`text-center ${isDark ? "text-white" : "text-gray-900"}`}>
                    <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
                    <p className="mb-4">
                      Your consultation with {selectedDoctor} is scheduled for {selectedDate} at {selectedTime}.
                      A confirmation email has been sent to {email}.
                    </p>
                    <button
                      onClick={() => setShowConsultation(false)}
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border rounded-l-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type symptom or 'done'..."
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotAssistant;