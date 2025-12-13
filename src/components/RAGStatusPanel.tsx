import React, { useState, useEffect } from 'react';
import { Database, Zap, Info, Check, X } from 'lucide-react';
import { geminiService } from '../geminiService';

interface RAGStats {
  totalDocuments: number;
  categories: string[];
  initialized: boolean;
}

interface RAGStatusPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RAGStatusPanel: React.FC<RAGStatusPanelProps> = ({ isOpen, onClose }) => {
  const [ragStats, setRagStats] = useState<RAGStats | null>(null);
  const [ragEnabled, setRagEnabled] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const stats = geminiService.getRAGStats();
      setRagStats(stats);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleRAG = () => {
    const newState = !ragEnabled;
    setRagEnabled(newState);
    geminiService.setRAGMode(newState);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl max-w-lg w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">RAG System Status</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* RAG Status */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">RAG System</span>
              </div>
              {ragStats?.initialized ? (
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Active</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">Initializing...</span>
                </div>
              )}
            </div>
            <p className="text-blue-200/80 text-sm">
              Retrieval-Augmented Generation enhances responses with semantic search through IPL knowledge base.
            </p>
          </div>

          {/* Knowledge Base Stats */}
          {ragStats && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h3 className="text-white font-medium mb-3">Knowledge Base</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-blue-200/80 text-xs mb-1">Documents</p>
                  <p className="text-white text-xl font-bold">{ragStats.totalDocuments}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-blue-200/80 text-xs mb-1">Categories</p>
                  <p className="text-white text-xl font-bold">{ragStats.categories?.length || 0}</p>
                </div>
              </div>
              {ragStats.categories && (
                <div className="mt-3">
                  <p className="text-blue-200/80 text-xs mb-2">Available Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {ragStats.categories.map((cat: string) => (
                      <span
                        key={cat}
                        className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-400/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RAG Toggle */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">Enable RAG</h3>
                <p className="text-blue-200/80 text-xs">
                  Use semantic search for enhanced accuracy
                </p>
              </div>
              <button
                onClick={handleToggleRAG}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  ragEnabled ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    ragEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-200/90">
                <p className="font-medium mb-2">How RAG Works:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Semantic search finds relevant IPL information</li>
                  <li>Context is retrieved from knowledge base</li>
                  <li>LLM generates response using retrieved context</li>
                  <li>Provides more accurate and detailed answers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-3 px-4 font-medium transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
