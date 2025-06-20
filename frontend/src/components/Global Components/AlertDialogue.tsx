import { useState } from "react";
import {
  Heart,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";

type AlertType = "alert" | "success" | "loading" | "error";

interface CustomAlertDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
  onCancel: () => void;
  type: AlertType;
  confirmText?: string;
  cancelText?: string;
}

export default function CustomAlertDialog({
  title,
  description,
  onConfirm,
  trigger,
  onCancel,
  type,
  confirmText = "Continue",
  cancelText = "Cancel",
}: CustomAlertDialogProps) {
  const [open, setOpen] = useState(false);

  const getTypeConfig = (alertType: AlertType) => {
    switch (alertType) {
      case "success":
        return {
          icon: <CheckCircle className="w-10 h-10 text-emerald-500" />,
          bgGradient: "from-emerald-50 via-green-50 to-emerald-50",
          borderColor: "border-emerald-200",
          titleColor: "text-emerald-700",
          descriptionColor: "text-emerald-600",
          confirmButtonGradient:
            "from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
          decorativeColor: "text-emerald-200",
          overlayGradient:
            "from-emerald-500/5 via-green-500/3 to-emerald-500/5",
          iconBg: "bg-emerald-100",
        };
      case "error":
        return {
          icon: <XCircle className="w-10 h-10 text-red-500" />,
          bgGradient: "from-red-50 via-rose-50 to-red-50",
          borderColor: "border-red-200",
          titleColor: "text-red-700",
          descriptionColor: "text-red-600",
          confirmButtonGradient:
            "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
          decorativeColor: "text-red-200",
          overlayGradient: "from-red-500/5 via-rose-500/3 to-red-500/5",
          iconBg: "bg-red-100",
        };
      case "loading":
        return {
          icon: <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />,
          bgGradient: "from-purple-50 via-pink-50 to-purple-50",
          borderColor: "border-purple-200",
          titleColor: "text-purple-700",
          descriptionColor: "text-purple-600",
          confirmButtonGradient:
            "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
          decorativeColor: "text-purple-200",
          overlayGradient: "from-purple-500/5 via-pink-500/3 to-purple-500/5",
          iconBg: "bg-purple-100",
        };
      default: // alert
        return {
          icon: <AlertCircle className="w-10 h-10 text-amber-500" />,
          bgGradient: "from-amber-50 via-yellow-50 to-amber-50",
          borderColor: "border-amber-200",
          titleColor: "text-amber-700",
          descriptionColor: "text-amber-600",
          confirmButtonGradient:
            "from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
          decorativeColor: "text-amber-200",
          overlayGradient: "from-amber-500/5 via-yellow-500/3 to-amber-500/5",
          iconBg: "bg-amber-100",
        };
    }
  };

  const config = getTypeConfig(type);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setOpen(true)}>{trigger}</div>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={type !== "loading" ? handleClose : undefined}
          />

          {/* Dialog Content */}
          <div
            className={`relative bg-gradient-to-br ${config.bgGradient} rounded-3xl shadow-2xl border-2 ${config.borderColor} max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100`}
          >
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <Heart
                className={`w-8 h-8 ${config.decorativeColor} animate-pulse`}
              />
            </div>
            <div className="absolute bottom-4 left-4 opacity-15">
              <Sparkles
                className={`w-6 h-6 ${config.decorativeColor} animate-pulse delay-1000`}
              />
            </div>

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.overlayGradient}`}
            ></div>

            {/* Close button (except for loading) */}
            {type !== "loading" && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white/90 transition-all duration-200 hover:scale-110"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}

            <div className="relative z-10 p-8">
              {/* Header */}
              <div className="text-center mb-6">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`${config.iconBg} backdrop-blur-sm rounded-full p-3 shadow-lg`}
                  >
                    {config.icon}
                  </div>
                </div>

                {/* Title */}
                <h2 className={`text-2xl font-bold ${config.titleColor} mb-3`}>
                  {title}
                </h2>

                {/* Description */}
                <p
                  className={`text-lg leading-relaxed ${config.descriptionColor}`}
                >
                  {description}
                </p>
              </div>

              {/* Footer */}
              {type !== "loading" && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-white/80 hover:bg-white/90 text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`px-8 py-3 bg-gradient-to-r ${config.confirmButtonGradient} text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex-1`}
                  >
                    {confirmText}
                  </button>
                </div>
              )}

              {/* Loading state message */}
              {type === "loading" && (
                <div className="text-center pt-4">
                  <div className="flex items-center justify-center space-x-2 text-purple-600">
                    <span className="text-sm font-medium">
                      Please wait while magic happens...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

