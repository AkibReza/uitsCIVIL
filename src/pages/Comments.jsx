import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, ThumbsUp, Reply, Calendar, User, Award, BookOpen } from 'lucide-react';

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

const CommentsReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('comments');

  const comments = [
    {
      id: 1,
      author: "Sarah Ahmed",
      role: "Civil Engineering Student",
      avatar: "SA",
      date: "2 days ago",
      content: "The concrete testing workshop was incredibly informative! Learning about compression testing and mix design hands-on really bridged the gap between theory and practice.",
      likes: 15,
      replies: 3,
      isLiked: false
    },
    {
      id: 2,
      author: "Mohammad Rahman",
      role: "Structural Engineering Major",
      avatar: "MR",
      date: "5 days ago",
      content: "Great job organizing the field trip to the construction site. Seeing reinforced concrete structures being built in real-time was amazing. Looking forward to more such events!",
      likes: 22,
      replies: 7,
      isLiked: true
    },
    {
      id: 3,
      author: "Fatima Khan",
      role: "Materials Science Student",
      avatar: "FK",
      date: "1 week ago",
      content: "The guest lecture on sustainable concrete was eye-opening. Climate change is real, and learning about eco-friendly alternatives like geopolymer concrete gives me hope for the future.",
      likes: 18,
      replies: 5,
      isLiked: false
    },
    {
      id: 4,
      author: "Ahmed Hassan",
      role: "Graduate Student",
      avatar: "AH",
      date: "2 weeks ago",
      content: "Thanks to the ACI Student Chapter for the networking session with industry professionals. Made some valuable connections that might help with my thesis research on high-performance concrete.",
      likes: 31,
      replies: 2,
      isLiked: true
    }
  ];

  const reviews = [
    {
      id: 1,
      author: "Dr. Rashida Begum",
      role: "Professor, Civil Engineering",
      avatar: "RB",
      date: "1 week ago",
      rating: 5,
      title: "Exceptional Student Organization",
      content: "The UITS ACI Student Chapter has shown remarkable dedication to advancing concrete technology education. Their workshops and seminars consistently maintain high academic standards.",
      helpful: 28,
      category: "Faculty Review"
    },
    {
      id: 2,
      author: "Eng. Karim Uddin",
      role: "Structural Engineer, BSRM Group",
      avatar: "KU",
      date: "2 weeks ago",
      rating: 5,
      title: "Industry-Ready Graduates",
      content: "Students from this chapter demonstrate exceptional understanding of concrete technology. Their practical knowledge and enthusiasm make them valuable additions to any engineering team.",
      helpful: 35,
      category: "Industry Review"
    },
    {
      id: 3,
      author: "Nasir Ahmed",
      role: "Alumni, Class of 2023",
      avatar: "NA",
      date: "3 weeks ago",
      rating: 4,
      title: "Great Learning Experience",
      content: "Being part of the ACI Student Chapter was one of the best decisions during my university years. The knowledge gained here directly helped me in my current job at a consulting firm.",
      helpful: 19,
      category: "Alumni Review"
    },
    {
      id: 4,
      author: "Shahana Yasmin",
      role: "Current Member",
      avatar: "SY",
      date: "1 month ago",
      rating: 5,
      title: "Transformative Experience",
      content: "Joining the chapter opened doors to internships and research opportunities. The mentorship from senior members and faculty has been invaluable for my career development.",
      helpful: 24,
      category: "Student Review"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    );
  };

  const CommentCard = ({ comment }) => {
    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [likes, setLikes] = useState(comment.likes);

    const handleLike = () => {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ 
          scale: 1.02,
          boxShadow: `0 10px 30px -10px ${colors.primary}40`
        }}
        className="p-6 rounded-xl transition-all duration-300"
        style={{ 
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`
        }}
      >
        <div className="flex items-start space-x-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ background: colors.gradient }}
          >
            {comment.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold" style={{ color: colors.text }}>
                  {comment.author}
                </h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {comment.role}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" style={{ color: colors.textMuted }} />
                <span className="text-sm" style={{ color: colors.textMuted }}>
                  {comment.date}
                </span>
              </div>
            </div>
            <p className="mb-4" style={{ color: colors.textSecondary }}>
              {comment.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{likes}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors"
                  style={{ color: colors.textSecondary }}
                >
                  <Reply className="w-4 h-4" />
                  <span className="text-sm">{comment.replies} replies</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const ReviewCard = ({ review }) => {
    const [isHelpful, setIsHelpful] = useState(false);
    const [helpfulCount, setHelpfulCount] = useState(review.helpful);

    const handleHelpful = () => {
      setIsHelpful(!isHelpful);
      setHelpfulCount(isHelpful ? helpfulCount - 1 : helpfulCount + 1);
    };

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ 
          scale: 1.02,
          boxShadow: `0 15px 35px -10px ${colors.accent}40`
        }}
        className="p-6 rounded-xl transition-all duration-300"
        style={{ 
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`
        }}
      >
        <div className="flex items-start space-x-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ background: colors.gradient }}
          >
            {review.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold" style={{ color: colors.text }}>
                  {review.author}
                </h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {review.role}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span 
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ 
                    backgroundColor: colors.accent + '20',
                    color: colors.accent 
                  }}
                >
                  {review.category}
                </span>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" style={{ color: colors.textMuted }} />
                  <span className="text-sm" style={{ color: colors.textMuted }}>
                    {review.date}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <StarRating rating={review.rating} />
              <h5 className="font-medium" style={{ color: colors.text }}>
                {review.title}
              </h5>
            </div>
            <p className="mb-4" style={{ color: colors.textSecondary }}>
              {review.content}
            </p>
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHelpful}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                  isHelpful 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-current' : ''}`} />
                <span className="text-sm">Helpful ({helpfulCount})</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ 
              background: colors.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Community Feedback
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            UITS ACI Student Chapter - Voices from our community
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div 
            className="flex rounded-xl p-1"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('comments')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'comments'
                  ? 'text-white shadow-lg'
                  : 'hover:bg-gray-600'
              }`}
              style={{
                backgroundColor: activeTab === 'comments' ? colors.primary : 'transparent',
                color: activeTab === 'comments' ? colors.text : colors.textSecondary
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Comments</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'reviews'
                  ? 'text-white shadow-lg'
                  : 'hover:bg-gray-600'
              }`}
              style={{
                backgroundColor: activeTab === 'reviews' ? colors.accent : 'transparent',
                color: activeTab === 'reviews' ? colors.text : colors.textSecondary
              }}
            >
              <Star className="w-5 h-5" />
              <span>Reviews</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {activeTab === 'comments' ? (
            <div className="grid gap-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>
                  Community Comments
                </h2>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: colors.primary + '20',
                    color: colors.primary 
                  }}
                >
                  {comments.length} Comments
                </span>
              </div>
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>
                  Professional Reviews
                </h2>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: colors.accent + '20',
                    color: colors.accent 
                  }}
                >
                  {reviews.length} Reviews
                </span>
              </div>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { icon: User, label: "Active Members", value: "150+" },
            { icon: BookOpen, label: "Workshops", value: "25+" },
            { icon: Award, label: "Certifications", value: "80+" },
            { icon: Star, label: "Avg Rating", value: "4.8/5" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl"
              style={{ 
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`
              }}
            >
              <stat.icon 
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: colors.primary }}
              />
              <h3 className="text-2xl font-bold mb-1" style={{ color: colors.text }}>
                {stat.value}
              </h3>
              <p style={{ color: colors.textSecondary }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CommentsReviewsPage;