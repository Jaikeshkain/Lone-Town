import { useGetUser } from "@/lib/useGetUser"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import { ArrowLeft, Heart, MessageCircleHeart, Sparkles, Users } from "lucide-react";

export const ChatPage=()=>{
    const navigate=useNavigate()
    const location=useLocation()
    const {partner}=location.state
    const { matchId, userId } = useParams();
    const userData=useGetUser()
    const goBack = () => {
      // Add your navigation logic here
      console.log("Navigate back");
      navigate("/matches")

    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-rose-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 bg-red-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-10 w-16 h-16 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

          {/* Floating Hearts */}
          {[...Array(8)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-200/30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${12 + Math.random() * 8}px`,
                height: `${12 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-pink-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Matches</span>
              </button>

              {/* Page Title */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-full">
                  <MessageCircleHeart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Love Chat
                  </h1>
                  <p className="text-sm text-pink-500">
                    Connect hearts, share moments
                  </p>
                </div>
              </div>

              {/* User Status */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-700">
                    {userData?.name || "Unknown User"}
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={
                      userData?.avatar ||
                      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    }
                    alt={userData?.name || "User"}
                    className="w-12 h-12 rounded-full border-3 border-pink-300 shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
                Your Love Story Begins Here
              </h2>
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
            </div>
            <p className="text-pink-600 text-lg max-w-2xl mx-auto">
              Welcome to your private love connection space. Share your
              thoughts, dreams, and create beautiful memories together.
            </p>
          </div>

          {/* Match Info Card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl border border-pink-200">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-500" />
                <span className="text-pink-700 font-medium">Match ID:</span>
                <span className="bg-pink-100 px-3 py-1 rounded-full text-pink-700 font-mono text-sm">
                  {matchId || "Loading..."}
                </span>
              </div>
              <div className="flex items-center gap-2 text-pink-400">
                <Heart className="w-4 h-4 animate-pulse" />
                <span>Connected Hearts</span>
                <Heart className="w-4 h-4 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-pink-200">
            <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 text-pink-600">
                <Heart className="w-5 h-5 animate-pulse" />
                <span className="font-medium">
                  Your private conversation space
                </span>
                <Heart className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <ChatBox matchId={matchId || ""} userId={userId || ""} partner={partner}/>
          </div>

          {/* Love Tips Section */}
          <div className="mt-8 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-red-500/20 rounded-2xl p-6 backdrop-blur-sm border border-pink-200">
            <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Love Connection Tips
              <Sparkles className="w-5 h-5" />
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="text-pink-600">
                <Heart className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                <p className="font-medium">Be Genuine</p>
                <p className="text-sm">Share your authentic self</p>
              </div>
              <div className="text-pink-600">
                <MessageCircleHeart className="w-8 h-8 mx-auto mb-2 text-rose-500" />
                <p className="font-medium">Listen Actively</p>
                <p className="text-sm">Show interest in their thoughts</p>
              </div>
              <div className="text-pink-600">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="font-medium">Create Magic</p>
                <p className="text-sm">Make every conversation special</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}