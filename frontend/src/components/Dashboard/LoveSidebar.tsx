import { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import {
  Heart,
  MessageCircle,
  User,
  Settings,
  Target,
  Sparkles,
  Calendar,
  Trophy,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const LoveSidebar = ({activeItem,setActiveItem,userData}:{
  activeItem: string;
  setActiveItem: (id: string) => void;
  userData:any;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      badge: null,
    },
    {
      id: "matches",
      label: "My Matches",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      badge: "3",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      badge: "12",
    },
    {
      id: "discover",
      label: "Discover",
      icon: Sparkles,
      color: "from-orange-500 to-red-500",
      badge: null,
    },
    {
      id: "dates",
      label: "My Dates",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
      badge: "2",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      color: "from-indigo-500 to-purple-500",
      badge: null,
    },
  ];

  const bottomItems = [
    {
      id: "premium",
      label: "Premium",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      badge: "NEW",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      color: "from-gray-500 to-gray-600",
      badge: null,
    },
    {
      id: "help",
      label: "Help",
      icon: HelpCircle,
      color: "from-blue-500 to-indigo-500",
      badge: null,
    },
  ];

  const sidebarVariants = {
    expanded: {
      width: "280px",
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    collapsed: {
      width: "80px",
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const badgeVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  const NavItem = ({ item, isBottom = false }:{item:any,isBottom:boolean}) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative group cursor-pointer mb-2 ${
          isBottom ? "mt-auto" : ""
        }`}
        onClick={() => setActiveItem(item.id)}
      >
        <div
          className={`
          flex items-center px-4 py-3 rounded-2xl transition-all duration-300
          ${
            isActive
              ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
              : "text-gray-600 hover:bg-white/50 hover:text-gray-800"
          }
          ${isCollapsed ? "justify-center" : ""}
        `}
        >
          <div
            className={`
            relative flex items-center justify-center
            ${isCollapsed ? "w-8 h-8" : "w-6 h-6 mr-3"}
          `}
          >
            <Icon size={isCollapsed ? 24 : 20} />
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center justify-between flex-1"
              >
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <motion.div
                    variants={badgeVariants}
                    animate={item.badge === "NEW" ? "pulse" : ""}
                    className={`
                      px-2 py-1 rounded-full text-xs font-bold
                      ${
                        item.badge === "NEW"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"
                          : "bg-white/30 text-white"
                      }
                      ${
                        !isActive && item.badge !== "NEW"
                          ? "bg-pink-100 text-pink-600"
                          : ""
                      }
                    `}
                  >
                    {item.badge}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className="h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50 border-r border-pink-100 shadow-xl relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-5 w-16 h-16 bg-purple-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-8 w-12 h-12 bg-rose-300 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    LoveConnect
                  </h1>
                  <p className="text-xs text-gray-500">Find your soulmate</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-white/50 hover:bg-white/80 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </motion.button>
        </div>

        {/* User Profile Section */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-pink-100"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{userData?.name}</h3>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-yellow-400"
                >
                  <Sparkles size={16} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Items */}
        <nav className="flex-1">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {navigationItems.map((item) => (
              <NavItem key={item.id} item={item} isBottom={false} />
            ))}
          </motion.div>
        </nav>

        {/* Bottom Items */}
        <div className="pt-4 border-t border-pink-100">
          {bottomItems.map((item) => (
            <NavItem key={item.id} item={item} isBottom />
          ))}

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full flex items-center px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors mt-2
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={isCollapsed ? 24 : 20} />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoveSidebar;
