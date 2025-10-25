import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/uitsCIVIL" || location.pathname === "/uitsCIVIL/";

  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <main className={`flex-grow ${isHomePage ? "" : "pt-20"}`}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
