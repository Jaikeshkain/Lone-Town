import { useState } from "react";
import StepBasicInfo from "./StepBasicInfo";
import StepTraits from "./StepTraits";
import StepReview from "./StepReview";
import { Brain, CheckCircle, Eye, User, Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { RegisterAPI } from "@/services/UserService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate=useNavigate()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    traits: {
      introvertExtrovert: "",
      decisionMaking: "",
      conflictStyle: "",
      communicationStyle: "",
      relationshipPace: "",
      values: [] as string[],
    },
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTraitChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      traits: { ...prev.traits, [field]: value },
    }));
  };

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const mutation = useMutation({
    mutationFn: (formData: any) => RegisterAPI(formData),
    mutationKey: ["register"],
    onSuccess:()=>navigate("/login")
  });

  const handleSubmit = async () => {
    mutation.mutate(formData);
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: User },
    { number: 2, title: "Personality", icon: Brain },
    { number: 3, title: "Review", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 py-12 px-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 w-6 h-6 text-rose-300 opacity-30 animate-pulse" />
        <Heart className="absolute top-40 right-20 w-4 h-4 text-pink-400 opacity-40 animate-bounce" />
        <Heart className="absolute bottom-32 left-1/4 w-5 h-5 text-red-300 opacity-25 animate-pulse" />
        <Heart className="absolute top-1/3 right-1/3 w-3 h-3 text-rose-400 opacity-35 animate-bounce" />
        <Heart className="absolute bottom-20 right-10 w-6 h-6 text-pink-300 opacity-30 animate-pulse" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = step === stepItem.number;
              const isCompleted = step > stepItem.number;

              return (
                <div key={stepItem.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                          : isActive
                          ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg scale-110"
                          : "bg-rose-100 text-rose-400 border-2 border-rose-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive ? "text-red-600" : "text-rose-500"
                      }`}
                    >
                      {stepItem.title}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                        step > stepItem.number
                          ? "bg-gradient-to-r from-rose-400 to-pink-400"
                          : "bg-rose-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100 p-8 relative">
          {/* Decorative Hearts */}
          <Heart className="absolute -top-3 -right-3 w-6 h-6 text-rose-400 opacity-50" />
          <Heart className="absolute -bottom-3 -left-3 w-5 h-5 text-pink-400 opacity-40" />

          <div className="transition-all duration-500 ease-in-out">
            {mutation?.isPending && (
              <div className="flex items-center justify-center p-4">
                <div className="text-rose-600 font-medium flex items-center gap-2">
                  <Heart className="w-5 h-5 animate-pulse text-red-500" />
                  Creating your love profile...
                </div>
              </div>
            )}
            {mutation?.isSuccess && (
              <div className="flex items-center justify-center p-4">
                <div className="text-green-600 font-medium flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Welcome to love! ❤️
                </div>
              </div>
            )}
            {mutation?.isError && (
              <div className="flex items-center justify-center p-4">
                <div className="text-red-600 font-medium">
                  {mutation.error?.message}
                </div>
              </div>
            )}
            {step === 1 && (
              <StepBasicInfo
                data={formData}
                onChange={handleChange}
                next={next}
              />
            )}
            {step === 2 && (
              <StepTraits
                traits={formData.traits}
                onChange={handleTraitChange}
                next={next}
                prev={prev}
              />
            )}
            {step === 3 && (
              <StepReview data={formData} onSubmit={handleSubmit} prev={prev} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div onClick={()=>navigate("/login")} className="text-center mt-8 text-rose-600 text-sm">
          <p>
            Already spreading love with us?{" "}
            <a
              href="#"
              className="text-red-600 hover:text-rose-700 hover:underline font-medium transition-colors duration-200"
            >
              Sign in ❤️
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;