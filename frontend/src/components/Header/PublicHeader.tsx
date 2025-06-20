import { motion, easeOut } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PublicNavBar = () => {
  const navigate = useNavigate();


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
          {/* <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
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
          </div> */}

          {/* Right Side - Status, Notifications, User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="flex gap-3">
                {/* Login Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                    className="px-5 py-2 border-2 border-rose-300 text-rose-600 rounded-full font-medium hover:bg-rose-50 transition-colors"
                >
                    Login
                </motion.button>

                {/* Register Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/register")}
                    className="px-5 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold shadow-md hover:from-rose-600 hover:to-pink-600 transition-all"
                >
                Join Now
                </motion.button>
            </div>
          </div>
        </div>
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

export default PublicNavBar;
