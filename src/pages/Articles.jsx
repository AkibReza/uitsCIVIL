
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, User, Calendar, ArrowRight, X, Clock, Tag } from 'lucide-react';

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

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Sample articles data with full content
  const articles = [
    {
      id: 1,
      title: "Advanced Concrete Mix Design for Sustainable Construction",
      author: "Dr. Sarah Ahmed",
      date: "2024-08-15",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop&crop=center",
      excerpt: "Exploring innovative approaches to concrete mix design that prioritize environmental sustainability while maintaining structural integrity and performance standards.",
      readTime: "8 min read",
      tags: ["Sustainability", "Mix Design", "Green Construction"],
      fullContent: `
        <h2>Introduction</h2>
        <p>The construction industry is undergoing a significant transformation as sustainability becomes a primary concern in modern engineering practices. Advanced concrete mix design represents a crucial step forward in creating environmentally responsible construction materials that maintain the high performance standards required for contemporary infrastructure projects.</p>
        
        <h2>Sustainable Materials and Ingredients</h2>
        <p>Traditional concrete production contributes significantly to global CO2 emissions, primarily through cement manufacturing. Modern sustainable concrete mix design focuses on incorporating alternative materials such as:</p>
        <ul>
          <li><strong>Supplementary Cementitious Materials (SCMs):</strong> Including fly ash, slag cement, and silica fume to reduce Portland cement content</li>
          <li><strong>Recycled Aggregates:</strong> Utilizing crushed concrete and other construction waste materials</li>
          <li><strong>Bio-based Additives:</strong> Incorporating organic waste materials and agricultural by-products</li>
        </ul>
        
        <h2>Performance Optimization</h2>
        <p>Sustainable concrete mix design doesn't compromise on performance. Through careful material selection and proportion optimization, engineers can achieve:</p>
        <p>Enhanced durability through improved resistance to environmental factors, reduced permeability, and increased service life. This approach not only benefits the environment but also provides long-term economic advantages through reduced maintenance and replacement costs.</p>
        
        <h2>Testing and Quality Assurance</h2>
        <p>Comprehensive testing protocols ensure that sustainable concrete mixes meet or exceed traditional concrete performance standards. This includes compressive strength testing, durability assessments, and long-term monitoring of environmental impact.</p>
        
        <h2>Future Implications</h2>
        <p>As we move toward a more sustainable future, advanced concrete mix design will continue to evolve, incorporating new materials and technologies that further reduce environmental impact while enhancing performance characteristics.</p>
      `
    },
    {
      id: 2,
      title: "High-Performance Concrete in Extreme Weather Conditions",
      author: "Prof. Muhammad Rahman",
      date: "2024-08-10",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop&crop=center",
      excerpt: "Understanding how concrete performs under extreme weather conditions and the latest techniques for improving durability and longevity.",
      readTime: "6 min read",
      tags: ["High-Performance", "Weather Resistance", "Durability"],
      fullContent: `
        <h2>Understanding Extreme Weather Challenges</h2>
        <p>Climate change has intensified the need for concrete structures that can withstand extreme weather conditions. From intense freeze-thaw cycles to severe heat and humidity, concrete must maintain its integrity across a wide range of environmental challenges.</p>
        
        <h2>Material Science Innovations</h2>
        <p>High-performance concrete (HPC) incorporates advanced materials and admixtures to enhance weather resistance:</p>
        <ul>
          <li><strong>Air-Entraining Agents:</strong> Create microscopic air bubbles to prevent freeze-thaw damage</li>
          <li><strong>Superplasticizers:</strong> Reduce water content while maintaining workability</li>
          <li><strong>Corrosion Inhibitors:</strong> Protect reinforcement in harsh environments</li>
        </ul>
        
        <h2>Design Considerations</h2>
        <p>Successful HPC design for extreme weather requires careful consideration of local climate conditions, exposure classifications, and service life requirements. This includes proper cover thickness, joint design, and surface treatments.</p>
        
        <h2>Case Studies and Applications</h2>
        <p>Real-world applications of HPC in extreme weather conditions demonstrate its effectiveness in coastal structures, high-altitude construction, and infrastructure in harsh climatic zones.</p>
      `
    },
    {
      id: 3,
      title: "Self-Healing Concrete: The Future of Infrastructure",
      author: "Dr. Maria Rodriguez",
      date: "2024-08-05",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop&crop=center",
      excerpt: "Discover the revolutionary technology behind self-healing concrete and its potential applications in modern construction projects.",
      readTime: "10 min read",
      tags: ["Innovation", "Self-Healing", "Future Technology"],
      fullContent: `
        <h2>The Science Behind Self-Healing</h2>
        <p>Self-healing concrete represents one of the most exciting developments in construction materials. This innovative technology enables concrete structures to automatically repair micro-cracks, significantly extending their service life and reducing maintenance requirements.</p>
        
        <h2>Healing Mechanisms</h2>
        <p>Several approaches to self-healing concrete have been developed:</p>
        <ul>
          <li><strong>Bacterial-based healing:</strong> Limestone-producing bacteria activated by water infiltration</li>
          <li><strong>Capsule-based systems:</strong> Encapsulated healing agents released when cracks form</li>
          <li><strong>Shape memory polymers:</strong> Materials that return to original form when triggered</li>
        </ul>
        
        <h2>Benefits and Applications</h2>
        <p>The advantages of self-healing concrete extend far beyond simple crack repair. These materials offer reduced maintenance costs, extended structure lifespan, and improved safety in critical infrastructure applications.</p>
        
        <h2>Current Limitations and Future Development</h2>
        <p>While promising, self-healing concrete still faces challenges in terms of cost, scalability, and long-term performance validation. Ongoing research continues to address these limitations.</p>
        
        <h2>Economic Impact</h2>
        <p>The potential economic benefits of self-healing concrete are substantial, with estimates suggesting significant savings in infrastructure maintenance and repair costs over the lifecycle of structures.</p>
      `
    },
    {
      id: 4,
      title: "Fiber-Reinforced Concrete: Applications and Benefits",
      author: "Eng. Hassan Ali",
      date: "2024-07-30",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop&crop=center",
      excerpt: "An in-depth analysis of fiber-reinforced concrete applications in structural engineering and its advantages over traditional concrete.",
      readTime: "7 min read",
      tags: ["Fiber Reinforcement", "Structural Engineering", "Materials"],
      fullContent: `
        <h2>Introduction to Fiber Reinforcement</h2>
        <p>Fiber-reinforced concrete (FRC) has emerged as a versatile construction material that addresses many of the inherent limitations of plain concrete. By incorporating various types of fibers into the concrete matrix, engineers can significantly improve the material's performance characteristics.</p>
        
        <h2>Types of Fibers</h2>
        <p>Different fiber materials offer unique benefits:</p>
        <ul>
          <li><strong>Steel Fibers:</strong> Provide excellent tensile strength and ductility</li>
          <li><strong>Synthetic Fibers:</strong> Offer corrosion resistance and reduced weight</li>
          <li><strong>Natural Fibers:</strong> Provide sustainable reinforcement options</li>
          <li><strong>Glass Fibers:</strong> Deliver high strength-to-weight ratios</li>
        </ul>
        
        <h2>Mechanical Properties Enhancement</h2>
        <p>FRC demonstrates improved performance in several key areas including enhanced tensile strength, improved impact resistance, reduced shrinkage cracking, and better fatigue performance.</p>
        
        <h2>Design and Construction Considerations</h2>
        <p>Successful implementation of FRC requires careful attention to fiber selection, mixing procedures, placement techniques, and quality control measures.</p>
      `
    },
    {
      id: 5,
      title: "3D Printing with Concrete: Revolutionizing Construction",
      author: "Dr. Jennifer Kim",
      date: "2024-07-25",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&crop=center",
      excerpt: "Exploring the cutting-edge technology of 3D concrete printing and its transformative impact on the construction industry.",
      readTime: "9 min read",
      tags: ["3D Printing", "Innovation", "Construction Technology"],
      fullContent: `
        <h2>The Revolution in Construction</h2>
        <p>3D concrete printing technology is transforming the construction industry by enabling rapid, precise, and cost-effective building construction. This innovative approach combines advanced materials science with cutting-edge manufacturing techniques.</p>
        
        <h2>Technology Overview</h2>
        <p>3D concrete printing involves the layer-by-layer deposition of specially formulated concrete materials using computer-controlled robotic systems. This process allows for complex geometries and reduced material waste.</p>
        
        <h2>Material Requirements</h2>
        <p>Successful 3D concrete printing requires specialized mix designs with specific rheological properties, including appropriate viscosity, thixotropy, and setting time characteristics.</p>
        
        <h2>Applications and Benefits</h2>
        <p>Current applications range from architectural elements to complete building structures, offering benefits such as reduced labor costs, faster construction times, and design freedom.</p>
        
        <h2>Challenges and Future Outlook</h2>
        <p>While promising, 3D concrete printing still faces challenges in scaling, quality control, and integration with traditional construction methods.</p>
      `
    },
    {
      id: 6,
      title: "Quality Control in Concrete Production and Testing",
      author: "Prof. Ahmad Hasan",
      date: "2024-07-20",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=250&fit=crop&crop=center",
      excerpt: "Best practices for ensuring quality control throughout the concrete production process and standardized testing methodologies.",
      readTime: "5 min read",
      tags: ["Quality Control", "Testing", "Standards"],
      fullContent: `
        <h2>Importance of Quality Control</h2>
        <p>Quality control in concrete production is essential for ensuring structural safety, durability, and performance. A comprehensive quality control program encompasses all phases from material selection to final placement.</p>
        
        <h2>Material Testing and Specification</h2>
        <p>Quality begins with proper material testing and specification, including aggregate gradation, cement composition, and admixture compatibility testing.</p>
        
        <h2>Production Monitoring</h2>
        <p>Continuous monitoring during production includes batch accuracy verification, mixing time control, and consistency evaluation.</p>
        
        <h2>Field Testing Procedures</h2>
        <p>Standard field tests such as slump, air content, and temperature measurements provide immediate feedback on concrete quality and workability.</p>
        
        <h2>Laboratory Testing and Analysis</h2>
        <p>Comprehensive laboratory testing programs validate concrete performance through compressive strength testing, durability assessments, and specialized performance evaluations.</p>
      `
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div 
      className="min-h-screen py-12 px-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="inline-block px-6 py-2 rounded-full mb-6"
            style={{ 
              background: colors.gradient,
              color: colors.text
            }}
          >
            <span className="font-semibold">ACI Student Chapter - UITS</span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Research Articles
          </h1>
          
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Explore cutting-edge research and insights in concrete technology, 
            materials science, and construction engineering from leading experts in the field.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article) => (
            <motion.div
              key={article.id}
              className="rounded-2xl p-6 shadow-xl border"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border
              }}
              variants={cardVariants}
              whileHover="hover"
              layout
            >
              <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* Left Part - Image (1/3) */}
                <div className="lg:w-1/3">
                  <div className="relative overflow-hidden rounded-xl h-64 lg:h-full">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: colors.primary,
                        color: colors.text
                      }}
                    >
                      {article.readTime}
                    </div>
                  </div>
                </div>

                {/* Right Part - Content (2/3) */}
                <div className="lg:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <User size={16} style={{ color: colors.textMuted }} />
                        <span 
                          className="text-sm font-medium"
                          style={{ color: colors.textMuted }}
                        >
                          {article.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} style={{ color: colors.textMuted }} />
                        <span 
                          className="text-sm"
                          style={{ color: colors.textMuted }}
                        >
                          {new Date(article.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>

                    <h2 
                      className="text-xl lg:text-2xl font-bold mb-4 leading-tight"
                      style={{ color: colors.text }}
                    >
                      {article.title}
                    </h2>

                    <p 
                      className="text-base mb-6 leading-relaxed"
                      style={{ color: colors.textSecondary }}
                    >
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye size={16} style={{ color: colors.textMuted }} />
                      <span 
                        className="text-sm"
                        style={{ color: colors.textMuted }}
                      >
                        Featured Article
                      </span>
                    </div>

                    <motion.button
                      onClick={() => handleReadMore(article)}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                      style={{ 
                        background: colors.gradient,
                        color: colors.text
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 10px 25px ${colors.primary}40`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300"
            style={{ 
              borderColor: colors.primary,
              color: colors.primary,
              backgroundColor: 'transparent'
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: colors.primary,
              color: colors.text
            }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Articles
          </motion.button>
        </motion.div>

        {/* Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
                style={{ backgroundColor: colors.surface }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div 
                  className="sticky top-0 z-10 p-6 border-b"
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {selectedArticle.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: colors.primary + '20',
                              color: colors.primary
                            }}
                          >
                            <Tag size={12} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h1 
                        className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
                        style={{ color: colors.text }}
                      >
                        {selectedArticle.title}
                      </h1>
                      
                      <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <User size={16} style={{ color: colors.primary }} />
                          <span 
                            className="font-medium"
                            style={{ color: colors.textSecondary }}
                          >
                            {selectedArticle.author}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar size={16} style={{ color: colors.primary }} />
                          <span style={{ color: colors.textSecondary }}>
                            {new Date(selectedArticle.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock size={16} style={{ color: colors.primary }} />
                          <span style={{ color: colors.textSecondary }}>
                            {selectedArticle.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={closeModal}
                      className="p-2 rounded-full transition-colors duration-200"
                      style={{ 
                        backgroundColor: colors.surfaceLight,
                        color: colors.textSecondary
                      }}
                      whileHover={{ 
                        backgroundColor: colors.border,
                        color: colors.text
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[70vh]">
                  {/* Featured Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Article Content */}
                  <div className="p-6 md:p-8">
                    <div 
                      className="prose prose-lg max-w-none"
                      style={{ 
                        color: colors.textSecondary,
                        '--tw-prose-headings': colors.text,
                        '--tw-prose-strong': colors.text,
                        '--tw-prose-links': colors.primary
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: selectedArticle.fullContent.replace(/\n\s*/g, '')
                      }}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div 
                  className="sticky bottom-0 p-6 border-t"
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="text-sm"
                      style={{ color: colors.textMuted }}
                    >
                      ACI Student Chapter - University of Information Technology & Sciences
                    </div>
                    
                    <motion.button
                      onClick={closeModal}
                      className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                      style={{ 
                        backgroundColor: colors.surfaceLight,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                      whileHover={{ 
                        backgroundColor: colors.border,
                        scale: 1.02
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close Article
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


export default Articles;