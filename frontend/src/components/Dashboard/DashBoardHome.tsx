import { useState, useEffect } from "react";
import { motion, easeInOut } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Video,
  Clock,
  Target,
  UserMinus,
  Snowflake,
  Sparkles,
  Calendar,
  Lock,
} from "lucide-react";
import { useGetUser } from "@/lib/useGetUser";
import { useQuery } from "@tanstack/react-query";
import { getMatchByIdAPI } from "@/services/MatchService";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate=useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date());
  const [freezeTimer, setFreezeTimer] = useState<Date | null>(null);
    const userData = useGetUser();

    useEffect(()=>{
      setFreezeTimer(new Date(userData?.freezeUntil));
    },[userData])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hoursUntilFreeze = freezeTimer
    ? Math.max(
        0,
        Math.ceil(
          (freezeTimer.getTime() - new Date().getTime()) / (1000 * 60 * 60)
        )
      )
    : "unknown";

    //get match by id
    const {data:similarmatch}=useQuery({
      queryKey:["getmatchbyid"],
      queryFn:()=>getMatchByIdAPI(userData.currentMatch as string)
    })

    useEffect(()=>{
      if(similarmatch?.user2){
      }
    },[similarmatch])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  const heartVariants = {
    beat: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-pink-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                variants={heartVariants}
                animate="beat"
                className="text-3xl"
              >
                ❤️
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back, {userData?.name}
                </h1>
                <p className="text-gray-600 text-sm">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-pink-400"
            >
              <Sparkles size={24} />
            </motion.div>
          </div>
        </motion.div>

        {/* Current Match Status */}
        {userData?.state === "matched" && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 shadow-xl text-white"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-white" size={24} />
              <h2 className="text-xl font-bold">Your Current State</h2>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-lg">
                    Matched with Aryan
                  </span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/30 rounded-full p-2"
                >
                  <MessageCircle size={20} />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>Match Started: June 20, 10:00 AM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle size={16} />
                  <span>Messages: 87/100</span>
                </div>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <Lock size={16} className="text-yellow-300" />
                <span className="text-sm">Video Call: Locked</span>
                <div className="flex-1 bg-white/20 rounded-full h-2 ml-2">
                  <div className="bg-yellow-300 h-2 rounded-full w-[87%] transition-all duration-500"></div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white text-pink-600 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg"
                onClick={()=>navigate(`/chat/${userData?.currentMatch}/${userData?._id}`)}
              >
                <MessageCircle size={18} />
                <span>Continue Chat</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-4 rounded-xl flex items-center space-x-2"
              >
                <UserMinus size={18} />
                <span>Unpin Match</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Freeze Status */}
        {userData?.state === "frozen" && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl p-6 shadow-xl text-white"
          >
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Snowflake size={24} />
              </motion.div>
              <h2 className="text-xl font-bold">You are currently frozen ❄️</h2>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span className="text-lg font-semibold">Freeze ends in:</span>
                </div>
                <div className="text-2xl font-bold">
                  {hoursUntilFreeze}h
                </div>
              </div>
              <div className="mt-3 bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-cyan-600 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg"
            >
              <Target size={18} />
              <span>Reflect Now</span>
            </motion.button>
          </motion.div>
        )}

        {/* Find New Match */}
        {userData?.state === "available" && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white"
          >
            <div className="text-center">
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="text-4xl mb-3"
              >
                💖
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">
                Ready to Meet Someone New?
              </h2>
              <p className="text-white/80 mb-6">
                Discover your perfect match today
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl flex items-center justify-center space-x-2 shadow-lg mx-auto text-lg"
              >
                <Target size={24} />
                <span>Find My Daily Match</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Progress Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <MessageCircle className="text-white" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">87</p>
                <p className="text-sm text-gray-600">Messages Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">3</p>
                <p className="text-sm text-gray-600">Active Matches</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-cyan-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                <Video className="text-white" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">13%</p>
                <p className="text-sm text-gray-600">To Video Call</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
