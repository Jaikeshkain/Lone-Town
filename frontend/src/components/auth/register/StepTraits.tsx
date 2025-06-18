import { ChevronLeft, Heart } from "lucide-react";

const StepTraits = ({
  traits,
  onChange,
  next,
  prev,
}: {
  traits: any;
  onChange: (key: string, value: string) => void;
  next: () => void;
  prev: () => void;
}) => {
  const toggleValue = (value: string) => {
    const exists = traits.values.includes(value);
    onChange(
      "values",
      exists
        ? traits.values.filter((v: string) => v !== value)
        : [...traits.values, value]
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 relative">
        <Heart className="w-8 h-8 text-rose-400 mx-auto mb-2 animate-pulse" />
        <h2 className="text-2xl font-bold text-rose-800">
          Your Love Personality
        </h2>
        <p className="text-rose-600">Help us understand your heart better ❤️</p>
      </div>
      <div className="max-h-[500px] overflow-y-auto space-y-6 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-5 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Personality Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Introvert", "Extrovert"].map((option) => (
                <button
                  key={option}
                  onClick={() => onChange("introvertExtrovert", option)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 font-medium ${
                    traits.introvertExtrovert === option
                      ? "border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-md transform scale-[1.02]"
                      : "border-rose-200 hover:border-rose-300 hover:bg-rose-25 text-rose-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              How You Make Decisions in Love
            </label>
            <div className="grid grid-cols-1 gap-3">
              {["With Logic & Facts", "With Heart & Emotions"].map((option) => (
                <button
                  key={option}
                  onClick={() => onChange("decisionMaking", option)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left font-medium ${
                    traits.decisionMaking === option
                      ? "border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-md transform scale-[1.02]"
                      : "border-rose-200 hover:border-rose-300 hover:bg-rose-25 text-rose-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Handling Relationship Conflicts
            </label>
            <div className="grid grid-cols-1 gap-3">
              {["Talk Directly & Honestly", "Approach with Empathy & Care"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => onChange("conflictStyle", option)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                      traits.conflictStyle === option
                        ? "border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-md transform scale-[1.02]"
                        : "border-rose-200 hover:border-rose-300 hover:bg-rose-25 text-rose-600"
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Your Communication Style in Love
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Direct & Clear",
                "Gentle & Empathetic",
                "Thoughtful & Reserved",
                "Open & Expressive",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => onChange("communicationStyle", option)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                    traits.communicationStyle === option
                      ? "border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-md transform scale-[1.02]"
                      : "border-rose-200 hover:border-rose-300 hover:bg-rose-25 text-rose-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Your Relationship Approach
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Planned & Structured", "Spontaneous & Flexible"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => onChange("relationshipPace", option)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                      traits.relationshipPace === option
                        ? "border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-md transform scale-[1.02]"
                        : "border-rose-200 hover:border-rose-300 hover:bg-rose-25 text-rose-600"
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Your Love Values (select multiple)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Honesty 💎",
                "Loyalty 🤝",
                "Growth 🌱",
                "Fun 🎉",
                "Adventure 🌟",
                "Kindness 💕",
                "Stability 🏠",
              ].map((option) => {
                const value = option.split(" ")[0].toLowerCase();
                return (
                  <button
                    key={option}
                    onClick={() => toggleValue(value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                      traits.values.includes(value)
                        ? "border-rose-500 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md transform scale-[1.02] ring-2 ring-rose-200"
                        : "border-rose-200 hover:border-rose-300 hover:bg-rose-25 text-rose-600"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-rose-500 mt-2 italic">
              Choose the values that matter most to your heart 💝
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          onClick={prev}
          className="flex-1 bg-rose-100 text-rose-700 py-3 px-6 rounded-lg font-medium hover:bg-rose-200 transition-all duration-200 flex items-center justify-center gap-2 border border-rose-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={next}
          className="flex-1 bg-gradient-to-r from-rose-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-rose-600 hover:to-red-600 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
        >
          Continue with Love
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StepTraits;
