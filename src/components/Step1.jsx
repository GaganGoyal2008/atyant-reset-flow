import { useState } from "react";

export default function Step1({ setStep }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        placeholder="Enter your email"
        className={`w-full h-14 px-5 rounded-2xl border bg-white/5 text-white placeholder-gray-400 outline-none transition-all duration-300 backdrop-blur-md text-sm sm:text-base ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-white/10 focus:border-purple-500"
        }`}
      />

      {error && (
        <p className="text-red-400 mt-3 text-sm text-center">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          "Send OTP"
        )}
      </button>
    </form>
  );
}