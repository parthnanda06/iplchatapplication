import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Zap, Users, TrendingUp, Sparkles, Trophy, Calendar, Settings, Key, LogOut, Loader } from 'lucide-react';
import { Message } from './types';
import { geminiService } from './geminiService';
import { ApiKeyModal } from './components/ApiKeyModal';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your IPL AI assistant. Ask me anything about the Indian Premier League - teams, players, stats, matches, history, or predictions!",
      isUser: false,
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="w-12 h-12 text-blue-400 animate-spin" />
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  useEffect(() => {
    // Check if API key is already configured
    setIsApiConfigured(geminiService.isConfigured());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleApiKeySubmit = (apiKey: string) => {
    geminiService.setApiKey(apiKey);
    setIsApiConfigured(true);
    // Store in localStorage for persistence
    localStorage.setItem('gemini_api_key', apiKey);
  };

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      geminiService.setApiKey(storedApiKey);
      setIsApiConfigured(true);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await geminiService.generateResponse(messageToSend);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please make sure your API key is configured correctly.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "Tell me about IPL 2024 season",
    "Show me all IPL winners from 2008-2024",
    "What happened in IPL 2016?",
    "Which venues hosted IPL matches?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  IPL AI Assistant
                </h1>
                <p className="text-blue-300/80 text-sm font-medium">Your premium cricket conversation companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowApiModal(true)}
                className={`flex items-center space-x-2 backdrop-blur-md rounded-full px-4 py-2 border transition-all duration-300 hover:scale-105 ${
                  isApiConfigured
                    ? 'bg-green-500/20 border-green-400/30 text-green-300'
                    : 'bg-orange-500/20 border-orange-400/30 text-orange-300'
                }`}
              >
                <Key className="w-4 h-4" />
                <span className="text-sm font-medium hidden md:block">
                  {isApiConfigured ? 'API Ready' : 'Setup API'}
                </span>
              </button>
              <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">AI Powered</span>
              </div>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex items-center space-x-2 backdrop-blur-md rounded-full px-4 py-2 border border-red-400/30 bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningOut ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span className="text-sm font-medium hidden md:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 h-[calc(100vh-120px)] flex flex-col">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">10</p>
            <p className="text-blue-200/80 text-sm font-medium">Active Teams</p>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">17</p>
            <p className="text-blue-200/80 text-sm font-medium">Seasons</p>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">1000+</p>
            <p className="text-blue-200/80 text-sm font-medium">Matches</p>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">∞</p>
            <p className="text-blue-200/80 text-sm font-medium">Excitement</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.length === 1 && (
            <div className="mb-8 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Welcome to IPL AI Chat!</h3>
                <p className="text-blue-200/80">Get instant answers about teams, players, records, and IPL history</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(question)}
                    className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-left text-blue-100 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="font-medium">{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl rounded-2xl px-6 py-4 shadow-xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/25'
                    : 'bg-white/15 backdrop-blur-xl text-white border border-white/20 shadow-black/20'
                }`}
              >
                <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                <div className="flex items-center justify-between mt-3">
                  <p
                    className={`text-xs font-medium ${
                      message.isUser ? 'text-orange-100' : 'text-blue-200/80'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                  {!message.isUser && (
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-medium">AI</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-blue-200 text-sm font-medium">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about IPL teams, players, records, or history..."
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder-blue-200/70 resize-none outline-none rounded-2xl px-6 py-4 border border-white/20 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 min-h-[56px] max-h-32 font-medium"
                rows={1}
              />
              <div className="absolute bottom-2 right-2 text-xs text-blue-200/60 font-medium">
                Press Enter to send
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-2xl p-4 transition-all duration-300 hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
            >
              <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <ApiKeyModal 
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSubmit={handleApiKeySubmit}
      />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

export default App;