import { motion } from "framer-motion";
import { Users, Calendar, BookOpen, Award } from "lucide-react";

const colors = {
  primary: "#0ea5e9",
  secondary: "#06b6d4",
  accent: "#8b5cf6",
  background: "#0f172a",
  surface: "#1e293b",
  surfaceLight: "#334155",
  text: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#475569",
  gradient: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
  gradientDark: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
};

export default function About() {
  return (
    <div
      className="min-h-screen"
      style={{ background: colors.background, color: colors.text }}
    >
      {/* Hero Banner */}
      <section
        className="relative flex items-center justify-center h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/img/home/about_us.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-5xl font-bold text-white"
        >
          About Us
        </motion.h1>
      </section>

      {/* Brief */}
      <section
        className="py-16 px-6 text-center"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            A Short Brief About UITS ACI
          </motion.h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The ACI Student Chapter at University of Information Technology &
            Sciences (UITS) is a platform for civil engineering students
            passionate about concrete technology, design, and construction. As
            part of the global American Concrete Institute network, UITS ACI
            aims to bridge academic learning with professional practice through
            research, workshops, and industry collaboration.
          </p>
        </div>
      </section>

      {/* Timeline (alternate style with hover) */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: colors.surfaceLight }}
      >
        <h3 className="text-2xl font-bold text-center mb-12">Our History</h3>
        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
            style={{ background: colors.primary }}
          ></div>
          {[
            { year: "2025", event: "UITS ACI Chapter Founded" },
            { year: "2026", event: "Outstanding Student Chapter Award" },
            { year: "2027", event: "2nd Runners Up at ACI Spring Convention" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`mb-12 flex items-center w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="w-1/2 px-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
                  style={{ background: colors.surface, color: colors.text }}
                >
                  <h4
                    className="text-xl font-semibold mb-2"
                    style={{ color: colors.primary }}
                  >
                    {item.year}
                  </h4>
                  <p className="text-gray-300">{item.event}</p>
                </motion.div>
              </div>
              {/* dot */}
              <div
                className="absolute left-1/2 w-6 h-6 rounded-full border-4 -translate-x-1/2"
                style={{
                  background: colors.surfaceLight,
                  borderColor: colors.accent,
                }}
              ></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Members / Statistics with hover */}
      <section className="py-16 px-6">
        <h3 className="text-2xl font-bold text-center mb-12">Our Community</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Users,
              title: "Active Members",
              value: "600+",
              desc: "Dedicated students from Civil Engineering at UITS.",
            },
            {
              icon: Calendar,
              title: "Yearly Events",
              value: "20+",
              desc: "Workshops, seminars, and technical sessions annually.",
            },
            {
              icon: BookOpen,
              title: "Research Projects",
              value: "5+",
              desc: "Innovative student-led research every year.",
            },
            {
              icon: Award,
              title: "Recognitions",
              value: "10+",
              desc: "National & international awards and achievements.",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
              style={{ background: colors.surfaceLight, color: colors.text }}
            >
              <stat.icon size={40} style={{ color: colors.primary }} />
              <h4 className="text-2xl font-bold mt-4">{stat.value}</h4>
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-sm text-gray-400 mt-2">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center"
        style={{ background: colors.surface }}
      >
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} UITS ACI Student Chapter | All Rights
          Reserved
        </p>
      </footer>
    </div>
  );
}
