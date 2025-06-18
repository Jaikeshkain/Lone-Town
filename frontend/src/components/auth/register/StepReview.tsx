import {
  ChevronLeft,
  Heart,
  User,
  Brain,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StepReview = ({
  data,
  onSubmit,
  prev,
}: {
  data: any;
  onSubmit: () => void;
  prev: () => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 relative">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
          <Sparkles className="w-5 h-5 text-pink-400 animate-bounce" />
          <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-rose-800">Your Love Profile</h2>
        <p className="text-rose-600">
          Review your beautiful heart's details 💕
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-5 shadow-sm">
          <h3 className="font-semibold text-rose-800 mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-rose-600" />
            Your Beautiful Basics
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-rose-100">
              <span className="text-rose-600 font-medium">Name:</span>
              <span className="font-semibold text-rose-800 flex items-center gap-1">
                {data.name}
                <Heart className="w-3 h-3 text-rose-400" />
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-rose-600 font-medium">Email:</span>
              <span className="font-semibold text-rose-800">{data.email}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-5 shadow-sm">
          <h3 className="font-semibold text-rose-800 mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-rose-600" />
            Your Love Personality
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-rose-100">
              <span className="text-rose-600 font-medium">
                Personality Type:
              </span>
              <span className="font-semibold text-rose-800 bg-rose-100 px-2 py-1 rounded-full">
                {data.traits.introvertExtrovert}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-rose-100">
              <span className="text-rose-600 font-medium">Love Decisions:</span>
              <span className="font-semibold text-rose-800 bg-rose-100 px-2 py-1 rounded-full">
                {data.traits.decisionMaking}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-rose-100">
              <span className="text-rose-600 font-medium">
                Handling Conflicts:
              </span>
              <span className="font-semibold text-rose-800 bg-rose-100 px-2 py-1 rounded-full">
                {data.traits.conflictStyle}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-rose-100">
              <span className="text-rose-600 font-medium">Communication:</span>
              <span className="font-semibold text-rose-800 bg-rose-100 px-2 py-1 rounded-full">
                {data.traits.communicationStyle}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-rose-100">
              <span className="text-rose-600 font-medium">Love Approach:</span>
              <span className="font-semibold text-rose-800 bg-rose-100 px-2 py-1 rounded-full">
                {data.traits.relationshipPace}
              </span>
            </div>
            <div className="flex justify-between items-start py-2">
              <span className="text-rose-600 font-medium">Heart Values:</span>
              <div className="flex flex-wrap gap-1 max-w-[60%]">
                {Array.isArray(data.traits.values) ? (
                  data.traits.values.map((value:any, index:number) => (
                    <span
                      key={index}
                      className="font-medium text-rose-800 bg-gradient-to-r from-rose-100 to-pink-100 px-2 py-1 rounded-full text-xs border border-rose-200 flex items-center gap-1"
                    >
                      {value}
                      <Heart className="w-2 h-2 text-rose-500" />
                    </span>
                  ))
                ) : (
                  <span className="font-medium text-rose-800 bg-rose-100 px-2 py-1 rounded-full">
                    {data.traits.values}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Alert className="border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50">
        <Heart className="h-4 w-4 text-rose-500" />
        <AlertDescription className="text-rose-700">
          By creating your love account, you agree to our Terms of Service and
          Privacy Policy. We promise to keep your heart and data safe 💝
        </AlertDescription>
      </Alert>

      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
          <Sparkles className="w-4 h-4 text-rose-500" />
        </div>
        <p className="text-sm text-rose-600 font-medium">
          Ready to begin your love story? ✨
        </p>
        <p className="text-xs text-rose-500 mt-1 italic">
          Your perfect match is waiting for you!
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={prev}
          className="flex-1 bg-rose-100 text-rose-700 py-3 px-6 rounded-lg font-medium hover:bg-rose-200 transition-all duration-200 flex items-center justify-center gap-2 border border-rose-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:from-rose-600 hover:via-red-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          Start My Love Journey
          <Heart className="w-4 h-4 animate-pulse" />
        </button>
      </div>
    </div>
  );
};

export default StepReview;
