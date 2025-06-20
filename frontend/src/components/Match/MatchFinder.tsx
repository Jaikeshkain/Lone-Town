import { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getState} from "@/services/StateService";
import { findMatchAPI } from "@/services/MatchService";
// Note: useNavigate would be imported from react-router-dom in actual implementation
import { Heart, Sparkles, MessageCircle, UserX, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomAlertDialog from "../Global Components/AlertDialogue";
import { format } from "date-fns";
import { useUnpin } from "@/lib/useUnpin";

type Traits = {
  introvertExtrovert: string;
  communicationStyle: string;
  decisionMaking: string;
  conflictStyle: string;
  relationshipPace: string;
  values: string[];
};

type MatchUser = {
  id: string;
  name: string;
  traits: Traits;
};

const MatchFinder = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState<
    "loading" | "available" | "matched" | "frozen"
  >("loading");
  const [freezeUntil, setFreezeUntil] = useState<Date | null>(null);
  const [match, setMatch] = useState<MatchUser | null>(null);
  const [matchId,setMatchId]=useState("")
  const [message, setMessage] = useState("");


  const storedData = localStorage.getItem("userInfo");
  const token = storedData ? JSON.parse(storedData)?.token : null;
  const userId = storedData ? JSON.parse(storedData)?.id : null;



  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch state"],
    queryFn: () => getState(token as string),
    enabled: !!token,
  });

  useEffect(() => {
    if (data?.state) {
      setUserState(data.state);
      setFreezeUntil(new Date(data.freezeUntil));
      setMatchId(data.currentMatch)
    }
  }, [data]);

  const { mutate: findMatch } = useMutation({
    mutationFn: () => findMatchAPI(token as string),
    onSuccess: (data) => {
      setMatch(data.partner);
      setUserState("matched");
      setMessage(data.message);
    },
    onError: (error) => {
      setMessage(error.message || "Matchmaking failed.");
    },
  });

  // console.log(partner)
  const handleFindMatch = async () => {
    findMatch();
  };

  //unpin match
const { mutateAsync: unpinMatch } = useUnpin(token as string);

const handleUnpinMatch = async () => {
  try {
    await unpinMatch(); // ✅ This is now awaitable
    setMatch(null);
    setMessage("Unpinned successfully.");
    navigate(0); // or refetch state
  } catch (err: any) {
    setMessage("Failed to unpin match.");
  }
};



  const hoursUntilFreeze = freezeUntil
    ? Math.max(
        0,
        Math.ceil(
          (freezeUntil.getTime() - new Date().getTime()) / (1000 * 60 * 60)
        )
      )
    : "unknown";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Floating hearts decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Heart className="absolute top-20 left-10 text-rose-200 w-6 h-6 animate-pulse" />
          <Heart className="absolute top-32 right-16 text-pink-200 w-4 h-4 animate-pulse delay-1000" />
          <Heart className="absolute bottom-40 left-20 text-red-200 w-5 h-5 animate-pulse delay-2000" />
          <Sparkles className="absolute top-40 right-32 text-rose-300 w-5 h-5 animate-pulse delay-500" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 p-8 space-y-8 relative overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-red-500/5 rounded-3xl"></div>

          {/* Header */}
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center mb-4">
              <Heart className="text-rose-500 w-8 h-8 mr-2 animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Find Your Soulmate
              </h1>
              <Heart className="text-rose-500 w-8 h-8 ml-2 animate-pulse" />
            </div>
            <p className="text-rose-700/80 text-lg font-medium">
              Where hearts connect and love stories begin ✨
            </p>
          </div>

          <div className="relative z-10">
            {userState === "loading" && (
              <div className="text-center py-12">
                <div className="inline-flex items-center space-x-2 text-rose-600">
                  <Heart className="w-6 h-6 animate-pulse" />
                  <span className="text-lg font-medium">
                    Preparing your love journey...
                  </span>
                </div>
              </div>
            )}

            {userState === "frozen" && (
              <div className="text-center py-12 space-y-4">
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-8 border-2 border-rose-200">
                  <Clock className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-rose-700 mb-2">
                    Taking Time to Reflect 💕
                  </h3>
                  <p className="text-rose-600 text-lg leading-relaxed">
                    Your freeze period ends on{" "}
                    {freezeUntil
                      ? format(freezeUntil, "MMM d, yyyy, hh:mm a")
                      : "unknown"}
                  </p>
                  <p className="text-rose-600 text-lg leading-relaxed">
                    Sometimes the heart needs a moment to process. Your{" "}
                    {hoursUntilFreeze} hours reflection period helps ensure
                    meaningful connections.
                  </p>
                  <p className="text-rose-500 font-medium mt-4">
                    Come back in {hoursUntilFreeze} hours for your next chance
                    at love!
                  </p>
                </div>
              </div>
            )}

            {userState === "available" && !match && (
              <div className="text-center py-12 space-y-6">
                <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 border-2 border-rose-200">
                  <Sparkles className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-rose-700 mb-4">
                    Your Heart is Ready! 💖
                  </h3>
                  <p className="text-rose-600 text-lg mb-6 leading-relaxed">
                    The stars have aligned, and love is in the air. Are you
                    ready to meet someone who could make your heart skip a beat?
                  </p>
                  <button
                    className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xl font-bold rounded-full hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={handleFindMatch}
                  >
                    <div className="flex items-center space-x-2">
                      <Heart className="w-6 h-6 group-hover:animate-pulse" />
                      <span>Discover My Match</span>
                      <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {userState === "matched" && match && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-rose-700 mb-2">
                    💕 It's a Match! 💕
                  </h3>
                  <p className="text-rose-600 text-lg">
                    Cupid has worked his magic - here's someone special!
                  </p>
                </div>

                <MatchCard match={match} />

                <div className="text-center">
                  <button
                    className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold rounded-full hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() =>
                      navigate(`/chat/${userId}`)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                      <span>Start Your Love Story</span>
                      <Heart className="w-5 h-5 group-hover:animate-pulse" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {userState === "matched" && !match && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-8 border-2 border-rose-200 text-center">
                  <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-rose-700 mb-4">
                    Your Heart is Already Taken! 💝
                  </h3>
                  <p className="text-rose-600 text-lg mb-6 leading-relaxed">
                    You've already found your match for today. Why not continue
                    building that beautiful connection?
                  </p>

                  <div className="space-y-4">
                    <button
                      className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      onClick={() =>
                        navigate(`/chat/${matchId}/${userId}`, {
                          state: { partner: match },
                        })
                      }
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>Continue Your Conversation</span>
                      </div>
                    </button>

                    <div className="flex items-center justify-center space-x-4 text-rose-400">
                      <div className="h-px bg-rose-200 flex-1"></div>
                      <span className="text-sm font-medium">or</span>
                      <div className="h-px bg-rose-200 flex-1"></div>
                    </div>

                    <div className="text-center space-y-3">
                      <p className="text-rose-600 font-medium">
                        Ready for a fresh start? 🌹
                      </p>
                      <CustomAlertDialog
                        title="Unpin & Find New Love"
                        description="Are you sure you want to unpin your match and find a new one?"
                        type="alert"
                        onConfirm={handleUnpinMatch}
                        onCancel={() => {}}
                        trigger={
                          <button className="px-6 py-3 bg-gradient-to-r from-red-400 to-rose-400 text-white font-bold rounded-full hover:from-red-500 hover:to-rose-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            <div className="flex items-center justify-center space-x-2">
                              <UserX className="w-5 h-5" />
                              <span>Unpin & Find New Love</span>
                            </div>
                          </button>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className="text-center mt-6">
                <div className="inline-block bg-rose-50 border border-rose-200 rounded-xl px-6 py-3">
                  <p className="text-rose-700 font-medium">{message}</p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-2 text-rose-600">
                  <Heart className="w-6 h-6 animate-pulse" />
                  <span className="text-lg font-medium">
                    Reading your heart's desires...
                  </span>
                </div>
              </div>
            )}

            {isError && (
              <div className="text-center py-8">
                <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4">
                  <p className="text-red-600 font-medium">
                    Oops! Cupid seems to be having technical difficulties.
                    Please try again! 💔
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchFinder;
