import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabType = "login" | "register";

const AuthCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("login");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = { username: "", password: "" };
    let isValid = true;

    if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(`${activeTab === "login" ? "Logged in" : "Registered"} successfully!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4 relative overflow-hidden">

      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-2xl border border-orange-500/30 p-8"
      >
        {/* Tabs */}
        <div className="flex mb-6 bg-[#243447] rounded-lg p-1">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              activeTab === "login"
                ? "bg-orange-500 text-white"
                : "text-gray-300"
            }`}
          >
            Account
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              activeTab === "register"
                ? "bg-orange-500 text-white"
                : "text-gray-300"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Animated Form Switch */}
        <AnimatePresence mode="wait">
          <motion.form
            key={activeTab}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Username */}
            <div>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#2b3c4f] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#2b3c4f] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-lg"
            >
              {activeTab === "login" ? "Sign in" : "Create Account"}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>

        {/* Google Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-white hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">
            Login with Google
          </span>
        </motion.button>
      </motion.div>

      {/* Bottom Text */}
      <div className="absolute bottom-10 text-center text-gray-300">
        <p className="text-xl">
          Crack the{" "}
          <span className="text-orange-500 font-bold">
            MCQ Questions
          </span>{" "}
          easily
        </p>
      </div>
    </div>
  );
};

export default AuthCard;
