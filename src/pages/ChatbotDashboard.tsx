import React from 'react';
import { MessageCircle, Heart, Activity, AlertTriangle } from 'lucide-react';
import SymptomChatbot from '../components/SymptomChatbot';

const ChatbotDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Medical Assistant</h1>
          <p className="text-gray-600">Get instant symptom analysis and health insights</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="text-blue-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-gray-600">24/7 Available</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="text-red-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Health Analysis</h3>
              <p className="text-sm text-gray-600">Quick Results</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="text-green-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Symptom Check</h3>
              <p className="text-sm text-gray-600">Multiple Conditions</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="text-yellow-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Disclaimer</h3>
              <p className="text-sm text-gray-600">Consult Doctor</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SymptomChatbot />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Enter your symptoms one at a time
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Type 'done' when finished entering symptoms
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                This is not a substitute for professional medical advice
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Seek immediate medical attention for severe symptoms
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDashboard;