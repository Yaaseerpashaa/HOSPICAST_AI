import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AtSign, Lock, Loader2, AlertCircle, LogIn, UserPlus, ChevronRight } from 'lucide-react';
import BackgroundPattern from '../components/BackgroundPattern';

const Login: React.FC = () => {
  const { user, signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message || 'Failed to sign in. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error: signUpError } = await signUp(email, password, email.split('@')[0]); // Using email username as name for signup
      
      if (signUpError) {
        setError(signUpError.message || 'Failed to create an account. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4 overflow-hidden relative">
      <BackgroundPattern variant="auth" />
      
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row h-[600px] md:h-[500px]">
          {/* Left Side - Branding/Welcome */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
              </svg>
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
            </div>
            
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">HospiCast AI</h1>
              <p className="text-blue-100 text-lg mb-6">
                Advanced hospital management with AI-driven insights and resource optimization
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-blue-100">Real-time patient admission forecasting</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-blue-100">Resource optimization and staff allocation</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-blue-100">Data-driven healthcare decisions</p>
                </div>
              </div>
              
              <p className="text-sm text-blue-200 mt-auto">
                © 2025 HospiCast AI. All rights reserved.
              </p>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {isSignUp 
                    ? 'Join us and transform your healthcare operations' 
                    : 'Sign in to continue to your analytics dashboard'}
                </p>
              </div>
              
              {error && (
                <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                  <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="you@hospital.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                      Password
                    </label>
                    {!isSignUp && (
                      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      {isSignUp ? (
                        <>
                          <UserPlus className="h-5 w-5" />
                          <span>Create Account</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="h-5 w-5" />
                          <span>Sign In</span>
                        </>
                      )}
                    </>
                  )}
                </button>
                
                <div className="relative flex items-center justify-center my-6">
                  <div className="border-t border-gray-300 dark:border-gray-700 absolute w-full"></div>
                  <div className="bg-white dark:bg-gray-800 px-3 relative text-sm text-gray-500 dark:text-gray-400">
                    or continue with
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  <button 
                    type="button"
                    className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path 
                        fill="currentColor" 
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.09.682-.218.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                      />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path 
                        fill="#4285F4" 
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path 
                        fill="#34A853" 
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path 
                        fill="#FBBC05" 
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path 
                        fill="#EA4335" 
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path 
                        fill="#1877F2" 
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path 
                        fill="#0A66C2" 
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </button>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isSignUp 
                      ? 'Already have an account?' 
                      : 'Don\'t have an account?'} 
                    <button 
                      type="button"
                      onClick={toggleMode} 
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {isSignUp ? 'Sign in' : 'Create one'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;