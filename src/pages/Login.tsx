import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AtSign, Lock, Loader2, Sun, Moon, RotateCcw } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        setError(
          signInError.message ||
            "Failed to sign in. Please check your credentials."
        );
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(
        err?.message || "Failed to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signUpError } = await signUp(
        email,
        password,
        email.split("@")[0]
      );

      if (signUpError) {
        setError(
          signUpError.message ||
            "Failed to create an account. Please try again."
        );
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(
        err?.message || "Failed to create an account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Dummy provider login that redirects directly to dashboard
  const handleProviderLogin = (provider: string) => {
    setLoading(true);
    console.log(`Attempting to log in with ${provider}`);

    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-white"
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-opacity-50 z-10"
      >
        {darkMode ? (
          <Sun className="h-6 w-6 text-yellow-300" />
        ) : (
          <Moon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Left Side - Information */}
      <div
        className={`hidden md:flex w-1/2 ${
          darkMode
            ? "bg-gray-800"
            : "bg-gradient-to-br from-blue-400 to-blue-500"
        } p-10 flex-col justify-center relative`}
      >
        <div className="mb-8">
          <div
            className={`${
              darkMode ? "bg-gray-700" : "bg-white"
            } rounded-full p-3 inline-block mb-4`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                fill={darkMode ? "#60a5fa" : "#2563EB"}
              />
              <path
                d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z"
                stroke={darkMode ? "#60a5fa" : "#2563EB"}
                strokeWidth="2"
              />
            </svg>
          </div>
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-blue-300" : "text-white"
            } mb-2`}
          >
            Welcome to HospiCastAI
          </h1>
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-blue-100"
            } text-lg`}
          >
            Your health journey begins with secure access to your medical
            information
          </p>
        </div>

        {/* CSS Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Animated medical cross */}
            <div
              className={`absolute ${
                darkMode ? "bg-blue-500" : "bg-blue-600"
              } w-6 h-24 rounded-md animate-pulse`}
            ></div>
            <div
              className={`absolute ${
                darkMode ? "bg-blue-500" : "bg-blue-600"
              } w-24 h-6 rounded-md animate-pulse`}
            ></div>

            {/* Animated ring */}
            <div className="absolute w-32 h-32 rounded-full border-4 border-blue-300 opacity-75 animate-spin"></div>

            {/* Pulsing circle */}
            <div className="absolute w-40 h-40 rounded-full border-2 border-blue-200 animate-ping opacity-40"></div>

            {/* HekathCare text overlay */}
            <div className="absolute z-10 bg-blue-500 bg-opacity-80 px-4 py-2 rounded-lg shadow-lg">
              <div
                className={`text-xl font-bold ${
                  darkMode ? "text-blue-100" : "text-white"
                }`}
              >
                HealthCare
              </div>
            </div>
          </div>
        </div>

        <p className={`${darkMode ? "text-gray-300" : "text-blue-100"} mb-6`}>
          Experience our AI-powered healthcare platform
        </p>

        <div className="space-y-6 mb-10">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={darkMode ? "text-blue-300" : "text-blue-100"}
              >
                <path
                  d="M4 15V18H7L16 9L13 6L4 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className={darkMode ? "text-blue-300" : "text-white"}>
                AI Health Monitoring
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-blue-100"}>
                Track your vitals with AI-powered insights
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 mr-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={darkMode ? "text-blue-300" : "text-blue-100"}
              >
                <path
                  d="M9 14H19M9 14C9 15.1046 8.10457 16 7 16C5.89543 16 5 15.1046 5 14C5 12.8954 5.89543 12 7 12C8.10457 12 9 12.8954 9 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h3 className={darkMode ? "text-blue-300" : "text-white"}>
                Smart Medical Records
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-blue-100"}>
                Securely access with predictive analytics
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 mr-3">
              <RotateCcw
                className={darkMode ? "text-blue-300" : "text-blue-100"}
              />
            </div>
            <div>
              <h3 className={darkMode ? "text-blue-300" : "text-white"}>
                3D Diagnostics
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-blue-100"}>
                Revolutionary imaging technology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center p-8 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            {isSignUp ? (
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
                <div
                  className={`tab-inactive ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } font-medium pb-2 cursor-pointer`}
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </div>
                <div
                  className={`tab-active border-b-2 border-blue-500 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } font-medium pb-2 cursor-pointer`}
                >
                  Sign Up
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
                <div
                  className={`tab-active border-b-2 border-blue-500 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } font-medium pb-2 cursor-pointer`}
                >
                  Login
                </div>
                <div
                  className={`tab-inactive ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } font-medium pb-2 cursor-pointer`}
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </div>
              </div>
            )}
          </div>

          {/* Avatar for sign-up mode */}
          {isSignUp && (
            <div className="flex justify-center mb-6">
              <div
                className={`${
                  darkMode ? "bg-blue-900" : "bg-blue-100"
                } rounded-full p-4`}
              >
                <svg
                  className={`h-12 w-12 ${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          )}

          {error && (
            <div
              className={`mb-4 p-3 ${
                darkMode
                  ? "bg-red-900 border-red-800 text-red-300"
                  : "bg-red-50 border-red-100 text-red-600"
              } border rounded text-sm`}
            >
              {error}
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleProviderLogin("google")}
              className={`w-full p-3 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              } border rounded-lg flex items-center justify-center transition-all`}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
              <span className={darkMode ? "text-gray-300" : ""}>
                Sign in with Google
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleProviderLogin("facebook")}
              className={`w-full p-3 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              } border rounded-lg flex items-center justify-center transition-all`}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className={darkMode ? "text-gray-300" : ""}>
                Sign in with Facebook
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleProviderLogin("github")}
              className={`w-full p-3 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              } border rounded-lg flex items-center justify-center transition-all`}
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                fill={darkMode ? "white" : "currentColor"}
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.09.682-.218.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className={darkMode ? "text-gray-300" : ""}>
                Sign in with GitHub
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleProviderLogin("apple")}
              className={`w-full p-3 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              } border rounded-lg flex items-center justify-center transition-all`}
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                fill={darkMode ? "white" : "currentColor"}
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
              </svg>
              <span className={darkMode ? "text-gray-300" : ""}>
                Sign in with Apple
              </span>
            </button>
          </div>

          <div
            className={`text-center ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } my-4`}
          >
            OR CONTINUE WITH
          </div>

          <form
            onSubmit={isSignUp ? handleSignUp : handleLogin}
            className="space-y-4"
          >
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <AtSign className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 py-3 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-400 focus:border-blue-400"
                      : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } 
                    border rounded-lg focus:ring-2`}
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 py-3 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-400 focus:border-blue-400"
                      : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } 
                    border rounded-lg focus:ring-2`}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } 
                text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </span>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>

            {!isSignUp && (
              <div className="text-center">
                <a
                  href="#"
                  className={`text-sm ${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  } hover:underline`}
                >
                  Forgot password?
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;