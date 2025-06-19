import {
  Heart,
  Sparkles,
  Users,
  MessageCircle,
  Zap,
  Scale,
} from "lucide-react";

type MatchCardProps = {
  match: {
    id: string;
    name: string;
    traits: {
      introvertExtrovert: string;
      communicationStyle: string;
      decisionMaking: string;
      conflictStyle: string;
      relationshipPace: string;
      values: string[];
    };
  };
};

const MatchCard = ({ match }: MatchCardProps) => {
  const getTraitIcon = (traitType: string) => {
    switch (traitType) {
      case "introvertExtrovert":
        return <Users className="w-5 h-5 text-rose-500" />;
      case "communicationStyle":
        return <MessageCircle className="w-5 h-5 text-pink-500" />;
      case "decisionMaking":
        return <Scale className="w-5 h-5 text-red-500" />;
      case "conflictStyle":
        return <Zap className="w-5 h-5 text-rose-600" />;
      case "relationshipPace":
        return <Heart className="w-5 h-5 text-pink-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-rose-400" />;
    }
  };

  const getTraitLabel = (traitType: string) => {
    switch (traitType) {
      case "introvertExtrovert":
        return "Social Energy";
      case "communicationStyle":
        return "Love Language";
      case "decisionMaking":
        return "Decision Style";
      case "conflictStyle":
        return "Conflict Resolution";
      case "relationshipPace":
        return "Romance Pace";
      default:
        return traitType;
    }
  };

  const traits = [
    { key: "introvertExtrovert", value: match.traits.introvertExtrovert },
    { key: "communicationStyle", value: match.traits.communicationStyle },
    { key: "decisionMaking", value: match.traits.decisionMaking },
    { key: "conflictStyle", value: match.traits.conflictStyle },
    { key: "relationshipPace", value: match.traits.relationshipPace },
  ];

  return (
    <div className="relative bg-gradient-to-br from-white via-rose-50/30 to-pink-50/50 rounded-3xl shadow-2xl border-2 border-rose-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <Heart className="w-12 h-12 text-rose-300 animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-15">
        <Sparkles className="w-8 h-8 text-pink-300 animate-pulse delay-1000" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/3 to-red-500/5"></div>

      <div className="relative z-10 p-8 space-y-6">
        {/* Header */}
        <div className="text-center pb-4 border-b border-rose-100">
          <div className="flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 text-rose-500 mr-2 animate-pulse" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {match.name}
            </h3>
            <Heart className="w-6 h-6 text-rose-500 ml-2 animate-pulse" />
          </div>
          <p className="text-rose-600 font-medium text-lg">
            Your Perfect Match Awaits 💕
          </p>
        </div>

        {/* Personality Traits */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-rose-700 text-center mb-4 flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Personality Harmony
            <Sparkles className="w-5 h-5 ml-2" />
          </h4>

          <div className="grid gap-4">
            {traits.map((trait) => (
              <div key={trait.key} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-rose-100 hover:border-rose-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full p-2 group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300">
                      {getTraitIcon(trait.key)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-rose-700 uppercase tracking-wide">
                          {getTraitLabel(trait.key)}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mt-1 text-lg">
                        {trait.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Values */}
        {match.traits.values && match.traits.values.length > 0 && (
          <div className="bg-gradient-to-r from-rose-100/80 to-pink-100/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-rose-200">
            <h4 className="text-lg font-bold text-rose-700 mb-4 text-center flex items-center justify-center">
              <Heart className="w-5 h-5 mr-2 text-rose-500" />
              Shared Heart Values
              <Heart className="w-5 h-5 ml-2 text-rose-500" />
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {match.traits.values.map((value, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer message */}
        <div className="text-center pt-4">
          <p className="text-rose-600 font-medium text-sm italic">
            "Two hearts beating as one" 💖
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
