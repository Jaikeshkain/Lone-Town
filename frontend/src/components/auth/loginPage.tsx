import { useState } from "react";
import { Heart, Mail, Lock, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { LoginAPI } from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "@/redux/slice/authSlice";

export default function LoginPage() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const mutation=useMutation({
    mutationFn:(body:any)=>LoginAPI(body),
    mutationKey:["login"],
  })

  const handleSubmit = async () => {
   const body={email,password}
    mutation
      .mutateAsync(body)
      .then((data) => {
        dispatch(loginAction({ id: data.user._id, token: data.user.token }));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ id: data.user._id, token: data.user.token })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate("/");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 flex items-center justify-center p-4">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-rose-200 animate-bounce">
          <Heart className="w-4 h-4 fill-current" />
        </div>
        <div className="absolute top-40 right-32 text-pink-200 animate-pulse">
          <Heart className="w-3 h-3 fill-current" />
        </div>
        <div className="absolute bottom-32 left-40 text-red-200 animate-bounce delay-700">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div className="absolute top-60 right-20 text-rose-300 animate-pulse delay-1000">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-200/50 p-8 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-pink-50/30 rounded-3xl"></div>

          <div className="relative z-10">
            {/* Header with heart icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white fill-current animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Welcome Back, Love
              </h1>
              <p className="text-rose-500/80 text-sm">
                Your heart's journey continues here ✨
              </p>
            </div>

            {/* Login form */}
            <div className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-rose-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-white/70 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300 placeholder-rose-300 text-rose-800"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-rose-700 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-white/70 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300 placeholder-rose-300 text-rose-800"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Forgot password link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-rose-500 hover:text-rose-600 transition-colors duration-200"
                >
                  Forgot your password? 💕
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                onClick={handleSubmit}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Sign In with Love</span>
                <Heart
                  className={`w-5 h-5 fill-current ${
                    isHovered ? "animate-pulse" : ""
                  }`}
                />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-rose-500/70 text-sm">
                Don't have an account?
                <a
                  href="/register"
                  className="text-rose-600 hover:text-rose-700 font-medium ml-1 transition-colors duration-200"
                >
                  Create one with love 💖
                </a>
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-rose-200">
              <Heart className="w-6 h-6 fill-current opacity-30" />
            </div>
            <div className="absolute bottom-4 left-4 text-pink-200">
              <Heart className="w-4 h-4 fill-current opacity-20" />
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-6">
          <p className="text-rose-400 text-sm font-medium">
            Made with 💝 for hearts that connect
          </p>
        </div>
      </div>
    </div>
  );
}
