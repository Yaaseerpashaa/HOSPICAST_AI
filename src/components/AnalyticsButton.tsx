import React, { useState } from 'react';
import { HospitalPredictionService } from '../services/predictionService';
import { toast } from 'react-hot-toast';

interface AnalyticsButtonProps {
  predictionService: HospitalPredictionService;
  dataset: any;
  onAnalysisComplete: (results: any) => void;
}

export const AnalyticsButton: React.FC<AnalyticsButtonProps> = ({
  predictionService,
  dataset,
  onAnalysisComplete
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      const results = await predictionService.analyzeHospitalMetrics(dataset);
      onAnalysisComplete(results);
      toast.success('Analysis completed successfully');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to complete analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <button
      onClick={handleAnalysis}
      disabled={isAnalyzing}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
    >
      {isAnalyzing ? (
        <span className="animate-spin">⌛</span>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )}
      Run Analysis
    </button>
  );
};