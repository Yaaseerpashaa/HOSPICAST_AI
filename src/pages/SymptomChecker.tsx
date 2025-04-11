import React from 'react';
import SymptomChatbot from '../components/SymptomChatbot';

const SymptomChecker: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Symptom Checker</h1>
      <SymptomChatbot />
    </div>
  );
};

export default SymptomChecker;