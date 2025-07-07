import { Routes, Route } from "react-router-dom";
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
import AdminDashboard from "../pages/admin/Dashboard";
import AdminPayment from "../pages/admin/Payment";
import AdminAttendance from "../pages/admin/Attendance";
import AdminLevel from "../pages/admin/Level";
import AdminWarning from "../pages/admin/Warning";
import AdminGifts from "../pages/admin/Gifts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/panel/:year" element={<Panel />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/events" element={<Events />} />
      <Route path="/participations" element={<Participations />} />
      <Route path="/certification" element={<Certification />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sponsorship" element={<Sponsorship />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/papers" element={<Papers />} />
      <Route path="/upcoming-events" element={<UpcomingEvents />} />
      <Route path="/comments" element={<Comments />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/payment" element={<AdminPayment />} />
      <Route path="/admin/attendance" element={<AdminAttendance />} />
      <Route path="/admin/level" element={<AdminLevel />} />
      <Route path="/admin/warning" element={<AdminWarning />} />
      <Route path="/admin/gifts" element={<AdminGifts />} />
    </Routes>
  );
};

export default AppRoutes;
