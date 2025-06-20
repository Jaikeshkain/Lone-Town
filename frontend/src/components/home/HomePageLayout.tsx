import { useState, useEffect } from "react";
import { easeOut, motion} from "framer-motion";
import {
  Heart,
  Users,
  Target,
  ArrowRight,
  Star,
  Play,
  MessageCircle,
  Calendar,
  Shield,
  Award,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoneTownHomePage = () => {
    const navigate=useNavigate()
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const steps = [
    {
      icon: Users,
      title: "Create Your Profile",
      description:
        "Share your authentic self with beautiful photos and thoughtful details",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Heart,
      title: "Take Personality Quiz",
      description:
        "Our AI analyzes your values, interests, and relationship goals",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Target,
      title: "Get Daily Matches",
      description: "Receive quality matches curated just for you every day",
      color: "from-rose-500 to-red-500",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Safe & Verified",
      description: "All profiles are verified for your security",
    },
    {
      icon: Award,
      title: "Quality Matches",
      description: "AI-powered compatibility scoring",
    },
    {
      icon: MessageCircle,
      title: "Meaningful Chats",
      description: "Conversation starters based on shared interests",
    },
    {
      icon: Calendar,
      title: "Date Planning",
      description: "Built-in date suggestions and planning tools",
    },
  ];

  const testimonials = [
    {
      text: "I met someone who truly gets me. Lone Town isn't just an app — it's a journey to finding your soulmate.",
      author: "Sarah M.",
      role: "Found love in 3 weeks",
      rating: 5,
    },
    {
      text: "The personality matching is incredible. Every match felt like a genuine connection waiting to happen.",
      author: "David L.",
      role: "Married through Lone Town",
      rating: 5,
    },
    {
      text: "Finally, an app that focuses on quality over quantity. My match was perfect on the first try!",
      author: "Emma R.",
      role: "In a relationship for 8 months",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Couples" },
    { number: "95%", label: "Match Success Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "50+", label: "Cities Worldwide" },
  ];

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 min-h-screen overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-8 h-8 bg-pink-200 rounded-full opacity-30 blur-sm"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-20 w-6 h-6 bg-purple-200 rounded-full opacity-40 blur-sm"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-rose-200 rounded-full opacity-35 blur-sm"
        />
      </div>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative text-center py-20 px-6 min-h-screen flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl mb-4"
            >
              ❤️
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              Lone Town
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-rose-600 font-light mb-8"
            >
              Where hearts find their match daily
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Join thousands who found their perfect match through our
              AI-powered personality matching system. Your soulmate is waiting.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 text-lg"
              onClick={()=>navigate("/matches")}
            >
              <span>Find My Match</span>
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white/80 backdrop-blur-sm text-rose-600 font-semibold rounded-full border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center space-x-2"
            >
              <Play size={18} />
              <span>Watch Story</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
              💖 How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to finding your perfect match
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 h-full">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                    >
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="text-pink-300" size={24} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🔍 Why Choose Lone Town?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just another dating app. We're your personal matchmaker
              powered by AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
              💕 Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real people, real connections, real love
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current"
                      size={24}
                    />
                  )
                )}
              </div>
              <blockquote className="text-xl italic text-gray-700 mb-6 leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              <div>
                <p className="font-bold text-gray-800">
                  {testimonials[activeTestimonial].author}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial
                      ? "bg-rose-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🌹
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your soulmate could be one click away. Join thousands who found
              love through Lone Town.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              <Zap size={24} />
              <span>Start Your Love Story</span>
              <ArrowRight size={24} />
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              Free to join • No credit card required • Start matching today
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LoneTownHomePage;
