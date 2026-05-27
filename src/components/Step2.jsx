import { useState, useRef, useEffect } from "react";

export default function Step2({ setStep }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pastedData)) return;

    const pastedOtp = pastedData.split("");

    setOtp(pastedOtp);
    setError("");

    inputRefs.current[5]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      verifyOTP();
    }
  };

  const verifyOTP = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (enteredOtp === "123456") {
        setError("");
        setLoading(false);
        setStep(3);
      } else {
        setError("Wrong OTP");
        setLoading(false);
      }
    }, 2000);
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full">
      <p className="text-center mb-6 text-gray-400 text-sm sm:text-base px-2">
        OTP sent to example@gmail.com
      </p>

      <div className="flex justify-center items-center gap-2 sm:gap-3 mb-4 w-full">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-10 h-12 sm:w-14 sm:h-14 rounded-2xl border bg-white/5 text-white text-center text-lg sm:text-2xl outline-none transition-all duration-300 backdrop-blur-md flex-shrink-0 ${
              error
                ? "border-red-500"
                : "border-white/10 focus:border-purple-500"
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-center mb-4 text-sm">
          {error}
        </p>
      )}

      <button
        onClick={verifyOTP}
        disabled={loading}
        className="w-full mt-6 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Verifying...
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      <div className="text-center mt-5">
        {timer > 0 ? (
          <p className="text-gray-400 text-sm sm:text-base">
            Resend in {timer}s
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-purple-400 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}