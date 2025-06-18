import {Heart, User, Mail, Lock } from "lucide-react";

const StepBasicInfo = ({
  data,
  onChange,
  next,
}: {
  data: any;
  onChange: (key: string, value: string) => void;
  next: () => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 relative">
        <Heart className="w-8 h-8 text-rose-400 mx-auto mb-2 animate-pulse" />
        <h2 className="text-2xl font-bold text-rose-800">
          Start Your Love Journey
        </h2>
        <p className="text-rose-600">Let's begin with your heart's basics 💕</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-rose-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-rose-500" />
            Your Beautiful Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-200 placeholder-rose-300 text-rose-800"
              placeholder="Tell us your lovely name"
            />
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-rose-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-500" />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-200 placeholder-rose-300 text-rose-800"
              placeholder="your.love@email.com"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-rose-700 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-500" />
            Secure Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={data.password}
              onChange={(e) => onChange("password", e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-200 placeholder-rose-300 text-rose-800"
              placeholder="Create a strong password"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400" />
          </div>
          <p className="text-xs text-rose-500 mt-1 italic">
            Keep your heart safe with a strong password 🔒
          </p>
        </div>

        {/* <div className="relative">
          <label className="block text-sm font-medium text-rose-700 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-500" />
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={data.confirmPassword}
              onChange={(e) => onChange("confirmPassword", e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-200 placeholder-rose-300 text-rose-800"
              placeholder="Confirm your password"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400" />
          </div>
        </div> */}
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-center">
        <Heart className="w-5 h-5 text-rose-500 mx-auto mb-2" />
        <p className="text-sm text-rose-600">
          Your information is safe with us. We protect your heart and your data
          💝
        </p>
      </div>

      <button
        onClick={next}
        className="w-full bg-gradient-to-r from-rose-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-rose-600 hover:to-red-600 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        Continue Your Love Story
        <Heart className="w-4 h-4" />
      </button>

      <div className="text-center">
        <p className="text-xs text-rose-500 italic">
          Ready to find your perfect match? ✨
        </p>
      </div>
    </div>
  );
};

export default StepBasicInfo;
