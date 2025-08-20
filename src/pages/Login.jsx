import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const role = await login(email, password);
      navigate(role === "admin" ? "/uitsCIVIL/admin/dashboard" : "/uitsCIVIL/dashboard");
    } catch (err) {
      setError("Failed to sign in");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <div
        className="max-w-md w-full p-8 rounded-lg"
        style={{ backgroundColor: colors.surface }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
          Login
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2"
              style={{ color: colors.textSecondary }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.text,
                borderColor: colors.border,
              }}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2"
              style={{ color: colors.textSecondary }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.text,
                borderColor: colors.border,
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 rounded font-semibold"
            style={{
              background: colors.gradient,
              color: colors.text,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
