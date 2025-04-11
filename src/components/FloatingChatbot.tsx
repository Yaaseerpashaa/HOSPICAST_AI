import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingChatbot: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chatbot-assistant');
  };

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
      {isHovered && (
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          <span className="text-sm text-gray-700 dark:text-gray-200">Medical Assistant</span>
        </div>
      )}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
      >
        <Bot size={24} className="group-hover:animate-bounce" />
      </button>
    </div>
  );
};

export default FloatingChatbot;