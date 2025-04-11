import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

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
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    if (input.toLowerCase() === "done") {
      if (symptoms.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            text: "❗ Please enter at least one symptom before typing 'done'.",
            sender: "bot",
          },
        ]);
      } else {
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
      }
    } else {
      setSymptoms((prev) => [...prev, input.toLowerCase()]);
      setMessages((prev) => [
        ...prev,
        {
          text: `✅ Symptom "${input}" recorded (${
            symptoms.length + 1
          }/3). Enter another symptom or type 'done' to get the prediction.`,
          sender: "bot",
        },
      ]);
    }

    setInput("");
  };

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
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
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
              isDark ? "bg-gray-800/90" : "bg-white/90"
            } border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } backdrop-blur-sm flex flex-col`}
          >
            {/* header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
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
                    className="flex items-center hover:text-white transition-colors"
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
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-l-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
                placeholder="Enter symptom or type 'done'..."
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotAssistant;
