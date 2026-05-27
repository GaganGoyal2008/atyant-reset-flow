import { useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden flex items-center justify-center px-4 py-6 relative">
      <div className="absolute top-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-700 opacity-20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>

      <div
        key={step}
        className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl px-5 py-7 sm:p-8 transition-all duration-500 ease-in-out animate-fade"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center tracking-tight">
          Atyant
        </h1>

        <div className="text-center mt-5 sm:mt-6">
          <h2 className="text-[38px] sm:text-5xl font-bold leading-tight break-words">
            <span className="text-white">Reset</span>

            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Password
            </span>
          </h2>

          <p className="text-gray-400 mt-3 text-sm sm:text-base px-2">
            Securely recover your account access
          </p>

          <div className="flex justify-center mt-6 gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step >= item
                    ? "w-10 bg-gradient-to-r from-purple-500 to-blue-500"
                    : "w-6 bg-gray-700"
                }`}
              ></div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Step {step} of 3
          </p>
        </div>

        <div className="mt-8">
          {step === 1 && <Step1 setStep={setStep} />}
          {step === 2 && <Step2 setStep={setStep} />}
          {step === 3 && <Step3 />}
        </div>
      </div>
    </div>
  );
}

export default App;