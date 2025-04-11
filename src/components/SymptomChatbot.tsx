import React, { useState } from 'react';
import axios from 'axios';
import { MessageCircle, Send, AlertCircle } from 'lucide-react';

const SymptomChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: "👋 Hi! I'm your medical symptom checker. Please describe your symptoms one at a time.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isWaitingForPrediction, setIsWaitingForPrediction] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);

    if (input.toLowerCase() === 'done') {
      if (symptoms.length === 0) {
        setMessages(prev => [...prev, {
          text: "❗ Please enter at least one symptom before typing 'done'.",
          sender: 'bot'
        }]);
      } else {
        setIsWaitingForPrediction(true);
        try {
          const response = await axios.post('http://127.0.0.1:5000/api/predict', {
            symptoms: symptoms
          });
          
          const prediction = response.data.prediction;
          setMessages(prev => [...prev, {
            text: `🏥 Based on your symptoms:\n${symptoms.map(s => `• ${s}`).join('\n')}\n\n📋 Diagnosis: You might have ${prediction}.\n\n⚠️ Please consult a healthcare professional for proper medical advice.`,
            sender: 'bot'
          }]);
          setSymptoms([]);
        } catch (error) {
          setMessages(prev => [...prev, {
            text: "⚕️ I couldn't process your symptoms. Please make sure to enter valid symptoms from the list and try again.",
            sender: 'bot'
          }]);
        }
        setIsWaitingForPrediction(false);
      }
    } else {
      setSymptoms(prev => [...prev, input]);
      setMessages(prev => [...prev, {
        text: `✅ Symptom "${input}" recorded (${symptoms.length + 1}/3). Enter another symptom or type 'done' to get the prediction.`,
        sender: 'bot'
      }]);
    }

    setInput('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-500 p-4 flex items-center gap-2">
        <MessageCircle className="text-white" size={24} />
        <h2 className="text-lg font-semibold text-white">Medical Symptom Checker</h2>
      </div>
      
      <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your symptom..."
            disabled={isWaitingForPrediction}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={isWaitingForPrediction}
          >
            <Send size={20} />
          </button>
        </form>
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
          <AlertCircle size={12} />
          <span>Type 'done' after entering all symptoms</span>
        </div>
      </div>
    </div>
  );
};

export default SymptomChatbot;