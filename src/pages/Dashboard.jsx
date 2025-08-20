import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Tasks from "../components/Tasks";
import Attendance from "../components/Attendance";
import Payments from "../components/Payments";
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
      default:
        return <Tasks />;
    }
  };

  const TabButton = ({ name, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 rounded transition-colors ${
        activeTab === name ? "font-semibold" : ""
      }`}
      style={{
        backgroundColor:
          activeTab === name ? colors.surfaceLight : "transparent",
        color: activeTab === name ? colors.text : colors.textSecondary,
      }}
    >
      {label}
    </button>
  );

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
        <div className="mb-6 flex gap-4">
          <TabButton name="tasks" label="Tasks" />
          <TabButton name="attendance" label="Attendance" />
          <TabButton name="payments" label="Payments" />
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
