import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Tasks from "../components/Tasks";
import Attendance from "../components/Attendance";
import Payments from "../components/Payments";
import ContactMessages from "../components/ContactMessages";
import { colors } from "../constants/colors";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/uitsCIVIL/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "tasks":
        return <Tasks />;
      case "attendance":
        return <Attendance />;
      case "payments":
        return <Payments />;
      case "messages":
        return <ContactMessages />;
      default:
        return <Tasks />;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <header className="p-4" style={{ backgroundColor: colors.surface }}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            {user.role === "admin" ? "Admin Dashboard" : "Member Dashboard"}
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: colors.surfaceLight,
              color: colors.textSecondary,
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-6 flex gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === "tasks" ? "font-semibold" : ""
            }`}
            style={{
              backgroundColor:
                activeTab === "tasks" ? colors.surfaceLight : "transparent",
              color: activeTab === "tasks" ? colors.text : colors.textSecondary,
            }}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === "attendance" ? "font-semibold" : ""
            }`}
            style={{
              backgroundColor:
                activeTab === "attendance"
                  ? colors.surfaceLight
                  : "transparent",
              color:
                activeTab === "attendance" ? colors.text : colors.textSecondary,
            }}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === "payments" ? "font-semibold" : ""
            }`}
            style={{
              backgroundColor:
                activeTab === "payments" ? colors.surfaceLight : "transparent",
              color:
                activeTab === "payments" ? colors.text : colors.textSecondary,
            }}
          >
            Payments
          </button>
          {user.role === "admin" && (
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "messages" ? "font-semibold" : ""
              }`}
              style={{
                backgroundColor:
                  activeTab === "messages"
                    ? colors.surfaceLight
                    : "transparent",
                color:
                  activeTab === "messages" ? colors.text : colors.textSecondary,
              }}
            >
              Contact Messages
            </button>
          )}
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
