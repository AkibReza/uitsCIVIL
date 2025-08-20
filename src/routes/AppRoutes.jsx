import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Panel from "../pages/Panel";
import Achievements from "../pages/Achievements";
import Events from "../pages/Events";
import Participations from "../pages/Participations";
import Certification from "../pages/Certification";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Sponsorship from "../pages/Sponsorship";
import Articles from "../pages/Articles";
import Papers from "../pages/Papers";
import UpcomingEvents from "../pages/UpcomingEvents";
import Comments from "../pages/Comments";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/uitsCIVIL/login" element={<Login />} />
        <Route
          path="/uitsCIVIL/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/uitsCIVIL/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/uitsCIVIL" element={<Home />} />
        <Route path="/uitsCIVIL/panel" element={<Panel />} />
        <Route path="/uitsCIVIL/achievements" element={<Achievements />} />
        <Route path="/uitsCIVIL/events" element={<Events />} />
        <Route path="/uitsCIVIL/participations" element={<Participations />} />
        <Route path="/uitsCIVIL/certification" element={<Certification />} />
        <Route path="/uitsCIVIL/about" element={<About />} />
        <Route path="/uitsCIVIL/contact" element={<Contact />} />
        <Route path="/uitsCIVIL/sponsorship" element={<Sponsorship />} />
        <Route path="/uitsCIVIL/articles" element={<Articles />} />
        <Route path="/uitsCIVIL/papers" element={<Papers />} />
        <Route path="/uitsCIVIL/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/uitsCIVIL/comments" element={<Comments />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
