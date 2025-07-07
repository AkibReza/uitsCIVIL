import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Calendar,
  Users,
  Award,
  Camera,
  MessageCircle,
  Shield,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Play,
} from "lucide-react";

// Global Color Variables
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

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
};

const ImageSlider = ({ images, autoSlide = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);

      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, interval, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg group">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <img
                    src={`/Assets/img/home/gallery${index}.jpg`}
                    alt="Our Research Facilities"
                    className="object-cover w-full h-full"
                  />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-medium">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ConcreteHomepage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const recentEvents = [
    {
      id: 1,
      date: "2025-01-15",
      title: "Concrete Innovation Workshop",
      description: "Advanced techniques in sustainable concrete construction",
      image: "/Assets/img/home/event_1.jpg",
    },
    {
      id: 2,
      date: "2025-01-10",
      title: "Industry Partnership Summit",
      description: "Connecting academia with industry leaders",
      image: "/Assets/img/home/event_2.jpg",
    },
    {
      id: 3,
      date: "2025-01-05",
      title: "Student Research Showcase",
      description: "Presenting cutting-edge research in concrete technology",
      image: "/Assets/img/home/event_3.jpg",
    },
  ];

  const achievements = [
    { number: 500, label: "Active Members", icon: Users },
    { number: 25, label: "Research Papers", icon: Award },
    { number: 50, label: "Industry Partners", icon: Shield },
    { number: 15, label: "Awards Won", icon: Award },
  ];

  const mediaGallery = [
    { title: "Concrete Testing Lab", category: "Facilities" },
    { title: "Research Conference 2024", category: "Events" },
    { title: "Industry Visit", category: "Activities" },
    { title: "Student Projects", category: "Projects" },
    { title: "Workshop Sessions", category: "Education" },
    { title: "Team Building", category: "Community" },
  ];

  const faqItems = [
    {
      question: "What is the ACI Student Chapter?",
      answer:
        "The ACI Student Chapter is a community of civil engineering students and professionals dedicated to advancing knowledge in concrete technology and construction.",
    },
    {
      question: "How can I join the chapter?",
      answer:
        "You can join by attending our meetings, participating in events, and submitting a membership application through our website.",
    },
    {
      question: "What benefits do members receive?",
      answer:
        "Members get access to exclusive workshops, networking opportunities, industry connections, and professional development resources.",
    },
    {
      question: "Are there research opportunities?",
      answer:
        "Yes, we regularly conduct research projects and provide opportunities for students to participate in cutting-edge concrete technology research.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: colors.gradientDark }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        <div
          className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")] opacity-50`}
        />

        <div className=" mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-pulse mb-6">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Concrete Excellence
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A dedicated community of civil engineering professionals advancing
              the science and practice of concrete technology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{
                  background: colors.gradient,
                  color: "white",
                }}
              >
                Join Our Community
                <ChevronRight className="inline ml-2 w-5 h-5" />
              </button>

              <button
                className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-white/10"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                <Play className="inline mr-2 w-5 h-5" />
                Watch Introduction
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        data-animate
        className="py-20"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="container mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible.about
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About Our Community
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We are an active and dedicated community comprising individuals
                with a profound interest in the field of concrete technology and
                civil engineering excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">
                  Our Mission
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  To advance the knowledge and practice of concrete technology
                  through research, education, and professional collaboration.
                  We strive to create a platform where students and
                  professionals can share ideas, learn from each other, and
                  contribute to the evolution of concrete engineering.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  {achievements.map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg bg-gray-800/50"
                    >
                      <item.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                      <div className="text-3xl font-bold text-white mb-1">
                        <AnimatedCounter end={item.number} />
                        {item.label === "Active Members" && "+"}
                      </div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-96 rounded-lg overflow-hidden bg-gray-600 flex items-center justify-center">
                  <img
                    src="/Assets/img/home/about_us.jpg"
                    alt="Our Research Facilities"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">
                    Our Research Facilities
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="px-6 py-3 rounded-lg border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
                Learn More About Us
                <ChevronRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section
  id="events"
  data-animate
  className="py-20"
  style={{ backgroundColor: colors.background }}
>
  <div className="container mx-auto px-6">
    <div
      className={`transition-all duration-1000 ${
        isVisible.events
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Recent Events
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Stay updated with our latest workshops, conferences, and
          community activities
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {recentEvents.map((event, index) => (
          <div
            key={event.id}
            className="relative mb-12 last:mb-0"
          >
            {/* Timeline line - hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
            
            {/* Timeline dot */}
            <div className="hidden md:block absolute left-6 top-8 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900 z-10"></div>
            
            <div className="md:ml-20">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                {/* Event Image */}
                <div className="w-full h-64 md:h-48 bg-gray-700 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Event Details */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-400">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white hover:text-blue-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <button
                      className="group px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={() => (window.location.href = "/event")}
                    >
                      Read More
                      <ChevronRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    {/* Optional: Add event type or location */}
                    <div className="flex items-center text-sm text-gray-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      Workshop
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="group px-8 py-4 rounded-lg border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
          View All Events
          <ChevronRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  </div>
</section>

      {/* Achievements Section */}
      <section
        id="achievements"
        data-animate
        className="py-20"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="container mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible.achievements
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Achievements
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Celebrating our milestones and recognitions in the field of
                concrete technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <achievement.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter end={achievement.number} />
                    {achievement.label === "Active Members" && "+"}
                  </div>
                  <div className="text-gray-400">{achievement.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-6 py-3 rounded-lg border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
                View All Achievements
                <ChevronRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <section
        id="gallery"
        data-animate
        className="py-20"
        style={{ backgroundColor: colors.background }}
      >
        <div className="container mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible.gallery
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Media Gallery
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore our visual journey through events, projects, and
                community moments
              </p>
            </div>

            <div className="mb-12">
              <ImageSlider images={mediaGallery} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaGallery.map((item, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <div className="w-full h-48 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                    src={`/Assets/img/home/img${index}.jpg`}
                    alt="Our Research Facilities"
                    className="object-cover w-full h-full"
                  />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-300">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-6 py-3 rounded-lg border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
                View Full Gallery
                <ChevronRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Advisor Message */}
      <section
        id="faculty-message"
        data-animate
        className="py-20"
        style={{ backgroundColor: colors.surface }}
      >
        <div className=" mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible["faculty-message"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Message from Faculty Advisor
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/50 rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-48 h-48 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-20 h-20 text-gray-400" />
                  </div>

                  <div className="flex-1">
                    <blockquote className="text-lg md:text-xl text-gray-300 italic mb-6 leading-relaxed">
                      "The future of concrete technology lies in the hands of
                      our dedicated students and researchers. This community
                      represents the pinnacle of academic excellence and
                      practical innovation in civil engineering."
                    </blockquote>

                    <div className="text-center md:text-left">
                      <p className="text-xl font-bold text-white">
                        Dr. Sarah Johnson
                      </p>
                      <p className="text-gray-400">
                        Faculty Advisor & Professor of Civil Engineering
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Ph.D. in Structural Engineering, 20+ years experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section
        id="leadership"
        data-animate
        className="py-20"
        style={{ backgroundColor: colors.background }}
      >
        <div className="mx-auto px-6"> 
          <div
            className={`transition-all duration-1000 ${
              isVisible.leadership
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Leadership Messages
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Hear from our student leaders who drive our community forward
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* President Message */}
              <div className="bg-gray-800/50 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    President's Message
                  </h3>
                </div>

                <blockquote className="text-gray-300 italic mb-6 leading-relaxed">
                  "Our chapter is more than just an organization - it's a family
                  of innovators, researchers, and future leaders in concrete
                  technology. Together, we're building the foundation for
                  tomorrow's infrastructure."
                </blockquote>

                <div className="text-center">
                  <p className="text-lg font-bold text-white">Michael Chen</p>
                  <p className="text-gray-400">Chapter President</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Senior, Civil Engineering
                  </p>
                </div>
              </div>

              {/* General Secretary Message */}
              <div className="bg-gray-800/50 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    General Secretary's Message
                  </h3>
                </div>

                <blockquote className="text-gray-300 italic mb-6 leading-relaxed">
                  "Through collaboration, education, and hands-on experience,
                  we're preparing the next generation of concrete engineers to
                  tackle the world's most challenging infrastructure problems."
                </blockquote>

                <div className="text-center">
                  <p className="text-lg font-bold text-white">
                    Emily Rodriguez
                  </p>
                  <p className="text-gray-400">General Secretary</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Junior, Civil Engineering
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACI Verification CTA */}
      <section
        id="aci-verification"
        data-animate
        className="py-20"
        style={{ backgroundColor: colors.surface }}
      >
        <div className=" mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible["aci-verification"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-12 border border-blue-400/30">
                  <Shield className="w-20 h-20 mx-auto mb-6 text-blue-400" />

                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Verify Integrity with ACI
                  </h2>

                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    As a certified ACI Student Chapter, we maintain the highest
                    standards of integrity and professional excellence. Verify
                    our official status and credentials.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      style={{
                        background: colors.gradient,
                        color: "white",
                      }}
                    >
                      Verify Our Status
                      <Shield className="inline ml-2 w-5 h-5" />
                    </button>

                    <button className="px-8 py-4 rounded-lg font-semibold border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
                      Learn About ACI
                      <ChevronRight className="inline ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        data-animate
        className="py-20"
        style={{ backgroundColor: colors.background }}
      >
        <div className=" mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible.faq
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Find answers to common questions about our community and
                activities
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <button
                    className="w-full p-6 text-left bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">
                        {item.question}
                      </h3>
                      <HelpCircle
                        className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {openFaq === index && (
                    <div className="mt-2 p-6 bg-gray-700/50 rounded-lg">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-6 py-3 rounded-lg border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
                View All FAQs
                <ChevronRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default ConcreteHomepage;
