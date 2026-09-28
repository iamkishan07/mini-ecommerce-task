import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(Auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Login Data:", data);

    try {
      const response = await loginUser(data);

      console.log("Login successful:", response);

      navigate("/main");
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>

          <p className="text-gray-400 mt-2">Login to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#151515] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-lime-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-lime-400 hover:text-lime-300"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-16 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-lime-400 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-lime-400"
              />

              <label
                htmlFor="remember"
                className="text-sm text-gray-400 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-lime-400 text-black font-semibold hover:bg-lime-300 active:scale-[0.98] transition"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-lime-400 hover:text-lime-300 font-medium"
            >
              Create account
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          © 2026 Your App. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
