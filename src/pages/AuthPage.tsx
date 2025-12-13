import React, { useState } from 'react';
import { MessageCircle, Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        await signUp(email, password);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsSignUp(false);
        setError('');
      } else {
        await signIn(email, password);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
            IPL AI Assistant
          </h1>
          <p className="text-blue-300/80 text-center text-sm mb-8 font-medium">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white/10 backdrop-blur-md text-white placeholder-blue-200/70 rounded-2xl px-6 py-3 pl-12 border border-white/20 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 outline-none font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/10 backdrop-blur-md text-white placeholder-blue-200/70 rounded-2xl px-6 py-3 pl-12 border border-white/20 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 outline-none font-medium"
                />
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300/60" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/10 backdrop-blur-md text-white placeholder-blue-200/70 rounded-2xl px-6 py-3 pl-12 border border-white/20 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 outline-none font-medium"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-2xl py-3 font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mt-6"
            >
              {isLoading && <Loader className="w-5 h-5 animate-spin" />}
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center">
            <p className="text-blue-200/80 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
