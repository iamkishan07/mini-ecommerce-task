import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";

const RegisterPage = () => {
  const { registerUser } = useContext(Auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await registerUser(data);

      console.log("Registration successful:", response);

      setSuccess("Account created successfully!");

      // 1 second ke baad login page par
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.log("Registration failed:", error);

      // Backend ka message show karo
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Create your account to get started
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-[#151515] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400 text-sm">
                {success}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-lime-400 transition"
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

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

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-lime-400 text-black font-semibold hover:bg-lime-300 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-lime-400 hover:text-lime-300 font-medium"
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

