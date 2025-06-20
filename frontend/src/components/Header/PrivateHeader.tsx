import { useState} from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import {
  MessageCircle,
  User,
  Settings,
  Target,
  Bell,
  Menu,
  X,
  ChevronDown,
  Home,
  AlertCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/lib/useLogout";
import { useGetUser } from "@/lib/useGetUser";

const LoneTownNavBar = () => {
    const navigate=useNavigate()
    //logout
    const { mutate: logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState(3);



  const userData=useGetUser()
  console.log(userData)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "matches",
      label: "Matches",
      icon: Target,
      href: "#matches",
      badge: 3,
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircle,
      href: "#chat",
      badge: 12,
    },
    { id: "profile", label: "Profile", icon: User, href: "#profile" },
  ];

  const userMenuItems = [
    { label: "Settings", icon: Settings, href: "#settings" },
    { label: "Help Center", icon: Bell, href: "#help" },
  ];

  const getStatusConfig = (status:string) => {
    switch (status) {
      case "matched":
        return {
          color: "bg-green-500",
          text: "Matched",
          textColor: "text-green-600",
          bgColor: "bg-green-50",
        };
      case "available":
        return {
          color: "bg-blue-500",
          text: "Available",
          textColor: "text-blue-600",
          bgColor: "bg-blue-50",
        };
      case "frozen":
        return {
          color: "bg-gray-500",
          text: "Frozen",
          textColor: "text-gray-600",
          bgColor: "bg-gray-50",
        };
      default:
        return {
          color: "bg-pink-500",
          text: "Online",
          textColor: "text-pink-600",
          bgColor: "bg-pink-50",
        };
    }
  };

  const statusConfig = getStatusConfig(userData?.state);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/90 backdrop-blur-lg border-b border-pink-100 shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-2xl"
            >
              ❤️
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Lone Town
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Find Your Perfect Match
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.link
                  key={item.id}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors group"
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {item.badge}
                    </motion.div>
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Right Side - Status, Notifications, User Menu */}
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full ${statusConfig.bgColor} cursor-pointer`}
            >
              <div
                className={`w-2 h-2 rounded-full ${statusConfig.color} animate-pulse`}
              ></div>
              <span className={`text-sm font-medium ${statusConfig.textColor}`}>
                {statusConfig.text}
              </span>
            </motion.div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {notifications}
                </motion.div>
              )}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-pink-50 transition-colors"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{userData?.name[0]}</span>
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusConfig.color} rounded-full border-2 border-white`}
                  ></div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-600 transition-transform hidden sm:block ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-pink-100 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-pink-50">
                      <p className="font-semibold text-gray-800">{userData?.name}</p>
                      <p className="text-sm text-gray-500">{userData?.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div
                          className={`w-2 h-2 rounded-full ${statusConfig.color}`}
                        ></div>
                        <span className={`text-xs ${statusConfig.textColor}`}>
                          {statusConfig.text}
                        </span>
                      </div>
                    </div>
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          whileHover={{
                            backgroundColor: "rgba(251, 207, 232, 0.3)",
                          }}
                          className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors text-gray-700 hover:text-pink-600
                          }`}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </motion.a>
                      );
                    })}
                    <motion.div 
                      whileHover={{
                        backgroundColor: "rgba(251, 207, 232, 0.3)",
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors text-red-600 hover:bg-red-50
                          `}
                      onClick={()=>{
                        logout()
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <AlertCircleIcon size={16} />
                      <span>Logout</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden border-t border-pink-100 bg-white/95 backdrop-blur-sm"
            >
              <div className="px-4 py-4 space-y-2">
                {/* Status for mobile */}
                <div
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl ${statusConfig.bgColor} mb-4`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${statusConfig.color} animate-pulse`}
                  ></div>
                  <span className={`font-medium ${statusConfig.textColor}`}>
                    Status: {statusConfig.text}
                  </span>
                </div>

                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          {item.badge}
                        </div>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-2 right-20 w-4 h-4 bg-pink-300 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-3 left-1/3 w-3 h-3 bg-purple-300 rounded-full blur-sm"
        />
      </div>
    </motion.nav>
  );
};

export default LoneTownNavBar;
