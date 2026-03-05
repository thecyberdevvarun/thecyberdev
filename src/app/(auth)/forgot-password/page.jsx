"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../redux/features/theme/themeSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, CheckCircle, ArrowLeft } from "lucide-react";
import {
  AuthLayout,
  validateField,
  getPasswordStrength,
} from "../../../components/Auth/Auth";
import Step1Email from "../../../components/Auth/ForgotPassword/Step1Email";
import Step2OTP from "../../../components/Auth/ForgotPassword/Step2OTP";
import Step3Password from "../../../components/Auth/ForgotPassword/Step3Password";
import Step4Success from "../../../components/Auth/ForgotPassword/Step4Success";

export default function ForgotPassword() {
  const router = useRouter();
  const darkMode = useSelector(selectDarkMode);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [resendTimer, setResendTimer] = useState(0);

  const passwordStrength = getPasswordStrength(passwords.password);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const error = validateField("email", email);
    if (error) {
      setErrors({ email: error });
      setTouched({ email: true });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setResendTimer(60);
    startResendTimer();
    setCurrentStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pastedCode.length, 5);
      document.getElementById(`otp-${nextIndex}`)?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5)
        document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (errors.otp) setErrors({ ...errors, otp: "" });
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit code" });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const passwordError = validateField("password", passwords.password);
    const confirmError = validateField(
      "confirmPassword",
      passwords.confirmPassword,
      passwords,
    );
    if (passwordError) newErrors.password = passwordError;
    if (confirmError) newErrors.confirmPassword = confirmError;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ password: true, confirmPassword: true });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentStep(4);
  };

  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setResendTimer(60);
    startResendTimer();
    setOtp(["", "", "", "", "", ""]);
  };

  const steps = [
    { number: 1, label: "Email" },
    { number: 2, label: "Verify" },
    { number: 3, label: "Reset" },
  ];

  return (
    <AuthLayout>
      {/* ── Back to Login ── */}
      <Link
        href="/login"
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all z-20 ${
          darkMode
            ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Login</span>
      </Link>

      {/* ── Background Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl ${
            darkMode ? "bg-indigo-500/10" : "bg-indigo-500/20"
          }`}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl ${
            darkMode ? "bg-purple-500/10" : "bg-purple-500/20"
          }`}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* ── Mobile Logo ── */}
        <div className="lg:hidden text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span
              className={`text-xl sm:text-2xl font-bold ${
                darkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              the<span className="text-indigo-500">cyber</span>dev
            </span>
          </Link>
        </div>

        {/* ── Auth Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-xl ${
            darkMode
              ? "bg-neutral-900/80 backdrop-blur-xl border-neutral-800 shadow-black/20"
              : "bg-white border-neutral-200 shadow-neutral-200/50"
          }`}
        >
          {/* ── Step Indicator ── */}
          {currentStep < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                          currentStep >= step.number
                            ? "bg-indigo-500 text-white"
                            : darkMode
                              ? "bg-neutral-800 text-neutral-500"
                              : "bg-neutral-100 text-neutral-400"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`text-xs mt-1 hidden sm:block ${
                          currentStep >= step.number
                            ? darkMode
                              ? "text-indigo-400"
                              : "text-indigo-600"
                            : darkMode
                              ? "text-neutral-500"
                              : "text-neutral-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-12 sm:w-20 h-0.5 mx-2 transition-all ${
                          currentStep > step.number
                            ? "bg-indigo-500"
                            : darkMode
                              ? "bg-neutral-800"
                              : "bg-neutral-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Step Content ── */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1Email
                key="step1"
                darkMode={darkMode}
                email={email}
                setEmail={setEmail}
                errors={errors}
                setErrors={setErrors}
                touched={touched}
                setTouched={setTouched}
                isLoading={isLoading}
                onSubmit={handleEmailSubmit}
              />
            )}
            {currentStep === 2 && (
              <Step2OTP
                key="step2"
                darkMode={darkMode}
                email={email}
                otp={otp}
                errors={errors}
                isLoading={isLoading}
                resendTimer={resendTimer}
                onOtpChange={handleOtpChange}
                onOtpKeyDown={handleOtpKeyDown}
                onSubmit={handleOtpSubmit}
                onResend={handleResendOtp}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <Step3Password
                key="step3"
                darkMode={darkMode}
                passwords={passwords}
                setPasswords={setPasswords}
                errors={errors}
                setErrors={setErrors}
                touched={touched}
                setTouched={setTouched}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                passwordStrength={passwordStrength}
                isLoading={isLoading}
                onSubmit={handlePasswordSubmit}
              />
            )}
            {currentStep === 4 && (
              <Step4Success
                key="step4"
                darkMode={darkMode}
                onLogin={() => router.push("/login")}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Help Text ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p
            className={`text-sm ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}
          >
            Need help?{" "}
            <Link
              href="/support"
              className={`font-semibold transition ${
                darkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
