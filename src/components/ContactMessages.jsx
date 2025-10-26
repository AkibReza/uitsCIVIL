import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  User,
  Calendar,
  Search,
  Trash2,
  CheckCircle,
  Clock,
  X,
  RefreshCw,
} from "lucide-react";
import { colors } from "../constants/colors";
import { db } from "../config/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
  });

  // Fetch messages from Firebase
  useEffect(() => {
    const q = query(
      collection(db, "contactMessages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
        setLoading(false);

        // Calculate stats
        const unread = messagesData.filter((m) => m.status === "unread").length;
        setStats({
          total: messagesData.length,
          unread,
          read: messagesData.length - unread,
        });
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter messages based on search and status
  useEffect(() => {
    let filtered = messages;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((m) => m.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterStatus]);

  // Mark message as read
  const markAsRead = async (messageId) => {
    try {
      await updateDoc(doc(db, "contactMessages", messageId), {
        status: "read",
        readAt: new Date(),
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  // Mark message as unread
  const markAsUnread = async (messageId) => {
    try {
      await updateDoc(doc(db, "contactMessages", messageId), {
        status: "unread",
        readAt: null,
      });
    } catch (error) {
      console.error("Error marking message as unread:", error);
    }
  };

  // Delete message
  const deleteMessage = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "contactMessages", messageId));
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  // Open message details
  const openMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      markAsRead(message.id);
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: colors.textSecondary }} className="text-sm">
                Total Messages
              </p>
              <p className="text-3xl font-bold" style={{ color: colors.text }}>
                {stats.total}
              </p>
            </div>
            <MessageSquare
              className="w-10 h-10"
              style={{ color: colors.primary }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: colors.textSecondary }} className="text-sm">
                Unread
              </p>
              <p className="text-3xl font-bold" style={{ color: colors.text }}>
                {stats.unread}
              </p>
            </div>
            <Clock className="w-10 h-10" style={{ color: colors.accent }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: colors.textSecondary }} className="text-sm">
                Read
              </p>
              <p className="text-3xl font-bold" style={{ color: colors.text }}>
                {stats.read}
              </p>
            </div>
            <CheckCircle
              className="w-10 h-10"
              style={{ color: colors.secondary }}
            />
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div
        className="p-4 rounded-lg"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: colors.textMuted }}
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === "all" ? "font-semibold" : ""
              }`}
              style={{
                backgroundColor:
                  filterStatus === "all" ? colors.primary : colors.surfaceLight,
                color: filterStatus === "all" ? "white" : colors.textSecondary,
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("unread")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === "unread" ? "font-semibold" : ""
              }`}
              style={{
                backgroundColor:
                  filterStatus === "unread"
                    ? colors.accent
                    : colors.surfaceLight,
                color:
                  filterStatus === "unread" ? "white" : colors.textSecondary,
              }}
            >
              Unread
            </button>
            <button
              onClick={() => setFilterStatus("read")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === "read" ? "font-semibold" : ""
              }`}
              style={{
                backgroundColor:
                  filterStatus === "read"
                    ? colors.secondary
                    : colors.surfaceLight,
                color: filterStatus === "read" ? "white" : colors.textSecondary,
              }}
            >
              Read
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: colors.surface }}
      >
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <RefreshCw
              className="w-8 h-8 animate-spin"
              style={{ color: colors.primary }}
            />
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center p-12">
            <MessageSquare
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: colors.textMuted }}
            />
            <p style={{ color: colors.textSecondary }}>No messages found</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: colors.border }}>
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 hover:bg-opacity-50 cursor-pointer transition-all"
                style={{
                  backgroundColor:
                    message.status === "unread"
                      ? `${colors.surfaceLight}40`
                      : "transparent",
                }}
                onClick={() => openMessage(message)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <User
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: colors.primary }}
                      />
                      <h3
                        className={`font-semibold truncate ${
                          message.status === "unread" ? "font-bold" : ""
                        }`}
                        style={{ color: colors.text }}
                      >
                        {message.name}
                      </h3>
                      {message.status === "unread" && (
                        <span
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            backgroundColor: colors.accent,
                            color: "white",
                          }}
                        >
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: colors.textMuted }}
                      />
                      <p
                        className="text-sm truncate"
                        style={{ color: colors.textSecondary }}
                      >
                        {message.email}
                      </p>
                    </div>
                    <p
                      className="font-medium mb-1"
                      style={{ color: colors.text }}
                    >
                      {message.subject}
                    </p>
                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: colors.textMuted }}
                    >
                      {message.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-xs whitespace-nowrap">
                      <Calendar
                        className="w-3 h-3"
                        style={{ color: colors.textMuted }}
                      />
                      <span style={{ color: colors.textMuted }}>
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          message.status === "unread"
                            ? markAsRead(message.id)
                            : markAsUnread(message.id);
                        }}
                        className="p-1.5 rounded hover:bg-opacity-20 transition-colors"
                        style={{ backgroundColor: colors.surfaceLight }}
                        title={
                          message.status === "unread"
                            ? "Mark as read"
                            : "Mark as unread"
                        }
                      >
                        <CheckCircle
                          className="w-4 h-4"
                          style={{
                            color:
                              message.status === "read"
                                ? colors.secondary
                                : colors.textMuted,
                          }}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        className="p-1.5 rounded hover:bg-opacity-20 transition-colors"
                        style={{ backgroundColor: colors.surfaceLight }}
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" style={{ color: "red" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full rounded-lg p-6 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: colors.surface }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: colors.text }}
                >
                  Message Details
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-lg hover:bg-opacity-20 transition-colors"
                  style={{ backgroundColor: colors.surfaceLight }}
                >
                  <X className="w-5 h-5" style={{ color: colors.text }} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="text-sm font-medium mb-1 block"
                    style={{ color: colors.textSecondary }}
                  >
                    From
                  </label>
                  <div className="flex items-center gap-2">
                    <User
                      className="w-5 h-5"
                      style={{ color: colors.primary }}
                    />
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {selectedMessage.name}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="text-sm font-medium mb-1 block"
                    style={{ color: colors.textSecondary }}
                  >
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail
                      className="w-5 h-5"
                      style={{ color: colors.primary }}
                    />
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="hover:underline"
                      style={{ color: colors.secondary }}
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div>
                  <label
                    className="text-sm font-medium mb-1 block"
                    style={{ color: colors.textSecondary }}
                  >
                    Subject
                  </label>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: colors.text }}
                  >
                    {selectedMessage.subject}
                  </p>
                </div>

                <div>
                  <label
                    className="text-sm font-medium mb-1 block"
                    style={{ color: colors.textSecondary }}
                  >
                    Message
                  </label>
                  <div
                    className="p-4 rounded-lg whitespace-pre-wrap"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      color: colors.text,
                    }}
                  >
                    {selectedMessage.message}
                  </div>
                </div>

                <div>
                  <label
                    className="text-sm font-medium mb-1 block"
                    style={{ color: colors.textSecondary }}
                  >
                    Received
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: colors.primary }}
                    />
                    <p style={{ color: colors.text }}>
                      {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                </div>

                {selectedMessage.readAt && (
                  <div>
                    <label
                      className="text-sm font-medium mb-1 block"
                      style={{ color: colors.textSecondary }}
                    >
                      Read At
                    </label>
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        className="w-5 h-5"
                        style={{ color: colors.secondary }}
                      />
                      <p style={{ color: colors.text }}>
                        {formatDate(selectedMessage.readAt)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <motion.button
                    onClick={() => {
                      selectedMessage.status === "unread"
                        ? markAsRead(selectedMessage.id)
                        : markAsUnread(selectedMessage.id);
                    }}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      color: colors.text,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    {selectedMessage.status === "unread"
                      ? "Mark as Read"
                      : "Mark as Unread"}
                  </motion.button>
                  <motion.button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactMessages;
