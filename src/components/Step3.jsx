import { useState, useEffect, useRef } from "react";

export default function Step3() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const handleReset = (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess(true);
  };

  const togglePassword = () => {

    const input = passwordRef.current;

    const cursorPosition = input.selectionStart;

    setShowPassword((prev) => !prev);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const toggleConfirmPassword = () => {

    const input = confirmPasswordRef.current;

    const cursorPosition = input.selectionStart;

    setShowConfirmPassword((prev) => !prev);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (

    <div>

      {!success ? (

        <form onSubmit={handleReset}>

          <div className="relative mb-5">

            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => {

                setPassword(e.target.value);

                if (error) setError("");
              }}
              className={`w-full h-14 px-5 pr-14 rounded-2xl border bg-white/5 text-white placeholder-gray-400 outline-none transition-all duration-300 backdrop-blur-md
              ${
                error
                  ? "border-red-500"
                  : "border-white/10 focus:border-purple-500"
              }`}
            />

            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          <div className="relative">

            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => {

                setConfirmPassword(e.target.value);

                if (error) setError("");
              }}
              className={`w-full h-14 px-5 pr-14 rounded-2xl border bg-white/5 text-white placeholder-gray-400 outline-none transition-all duration-300 backdrop-blur-md
              ${
                error
                  ? "border-red-500"
                  : "border-white/10 focus:border-purple-500"
              }`}
            />

            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mt-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-6 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-900/30"
          >
            Reset Password
          </button>

        </form>

      ) : (

        <div className="text-center">

          <p className="text-green-400 font-semibold text-lg mb-5">
            Password Reset Successful
          </p>

          <button
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-900/30"
          >
            Go to Login Page
          </button>

        </div>

      )}

    </div>

  );
}