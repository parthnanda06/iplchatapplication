import React, { useState } from 'react';
import { Key, X, ExternalLink, Shield } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    setIsLoading(true);
    onSubmit(apiKey.trim());
    setIsLoading(false);
    setApiKey('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <Key className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Configure Gemini API</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-blue-200/80 text-sm mb-4">
            To enable AI-powered responses, please provide your Google Gemini API key. 
            This will be stored locally in your browser.
          </p>
          
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-200/90">
                <p className="font-medium mb-1">Privacy & Security:</p>
                <p>Your API key is stored locally and never sent to our servers. It's only used to communicate directly with Google's Gemini API.</p>
              </div>
            </div>
          </div>

          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 text-sm font-medium mb-4 transition-colors"
          >
            <span>Get your free API key from Google AI Studio</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="apiKey" className="block text-white font-medium mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="w-full bg-white/10 backdrop-blur-md text-white placeholder-blue-200/70 outline-none rounded-xl px-4 py-3 border border-white/20 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-xl py-3 px-4 font-medium transition-all duration-300 border border-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!apiKey.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-xl py-3 px-4 font-medium transition-all duration-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Configuring...' : 'Save API Key'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};