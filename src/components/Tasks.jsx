import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc,
  orderBy 
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: [], // Changed to array for multiple selection
    priority: "medium",
    dueDate: ""
  });
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showApprovalActions, setShowApprovalActions] = useState(false);
  const { user, isAdmin } = useAuth();

  // Fetch tasks based on user role
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = isAdmin
          ? query(collection(db, "tasks"), orderBy("createdAt", "desc"))
          : query(
              collection(db, "tasks"), 
              where("assignedTo", "array-contains", user.uid),
              orderBy("createdAt", "desc")
            );

        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user, isAdmin]);

  // Fetch members (only for admin)
  useEffect(() => {
    const fetchMembers = async () => {
      if (!isAdmin) return;
      
      try {
        const q = query(collection(db, "users"), where("role", "==", "member"));
        const querySnapshot = await getDocs(q);
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [isAdmin]);

  // Handle member selection
  const handleMemberToggle = (memberId) => {
    setNewTask(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(memberId)
        ? prev.assignedTo.filter(id => id !== memberId)
        : [...prev.assignedTo, memberId]
    }));
  };

  // Select/Deselect all members
  const handleSelectAll = () => {
    const allSelected = newTask.assignedTo.length === members.length;
    setNewTask(prev => ({
      ...prev,
      assignedTo: allSelected ? [] : members.map(m => m.id)
    }));
  };

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || (!isAdmin && newTask.assignedTo.length === 0)) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title: newTask.title,
        description: newTask.description,
        assignedTo: isAdmin ? newTask.assignedTo : [user.uid],
        assignedBy: user.uid,
        priority: newTask.priority,
        dueDate: newTask.dueDate ? new Date(newTask.dueDate) : null,
        createdAt: new Date(),
        status: "pending",
      });
      
      setNewTask({
        title: "",
        description: "",
        assignedTo: [],
        priority: "medium",
        dueDate: ""
      });
      setShowForm(false);
      
      // Refresh tasks
      const q = isAdmin
        ? query(collection(db, "tasks"), orderBy("createdAt", "desc"))
        : query(
            collection(db, "tasks"), 
            where("assignedTo", "array-contains", user.uid),
            orderBy("createdAt", "desc")
          );
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      // Validate status changes based on user role and current status
      if (!isAdmin) {
        // Members can't change completed or rejected tasks
        if (task.status === "completed" || task.status === "rejected") {
          return;
        }
        // Members can't directly set tasks to completed
        if (newStatus === "completed") {
          return;
        }
      }

      const updates = {
        status: newStatus,
        updatedAt: new Date()
      };

      // Track previous status when admin requests re-do
      if (isAdmin && task.status === "approval-requested" && newStatus === "pending") {
        updates.previousStatus = task.status;
      }

      // Lock editing when task is turned in or rejected
      if (newStatus === "approval-requested" || newStatus === "rejected") {
        updates.locked = true;
      }

      // Unlock task when set back to pending (re-do)
      if (newStatus === "pending") {
        updates.locked = false;
      }

      await updateDoc(doc(db, "tasks", taskId), updates);
      
      setTasks(tasks.map(t => 
        t.id === taskId 
          ? { ...t, ...updates }
          : t
      ));

      // Show notification for status changes
      if (isAdmin) {
        if (newStatus === "completed") {
          // You might want to add a notification system here
          console.log("Task approved and completed");
        } else if (newStatus === "pending") {
          console.log("Task returned for re-do");
        } else if (newStatus === "rejected") {
          console.log("Task rejected");
        }
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task (admin only)
  const deleteTask = async (taskId) => {
    if (!isAdmin) return;
    
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  // Get priority styles
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high": 
        return { 
          color: "#ef4444", 
          backgroundColor: "rgba(239, 68, 68, 0.1)", 
          borderColor: "rgba(239, 68, 68, 0.3)" 
        };
      case "medium": 
        return { 
          color: "#f59e0b", 
          backgroundColor: "rgba(245, 158, 11, 0.1)", 
          borderColor: "rgba(245, 158, 11, 0.3)" 
        };
      case "low": 
        return { 
          color: "#10b981", 
          backgroundColor: "rgba(16, 185, 129, 0.1)", 
          borderColor: "rgba(16, 185, 129, 0.3)" 
        };
      default: 
        return { 
          color: colors.textSecondary, 
          backgroundColor: colors.surface, 
          borderColor: colors.border 
        };
    }
  };

  // Get status styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed": 
        return { 
          color: "#10b981", 
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "rgba(16, 185, 129, 0.3)"
        };
      case "in-progress": 
        return { 
          color: colors.accent, 
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "rgba(139, 92, 246, 0.3)"
        };
      case "approval-requested":
        return {
          color: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.15)",
          borderColor: "rgba(245, 158, 11, 0.3)"
        };
      case "rejected":
        return {
          color: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          borderColor: "rgba(239, 68, 68, 0.3)"
        };
      case "pending": 
        return { 
          color: colors.textMuted, 
          backgroundColor: colors.surfaceLight,
          borderColor: colors.border
        };
      default: 
        return { 
          color: colors.textSecondary, 
          backgroundColor: colors.surface,
          borderColor: colors.border
        };
    }
  };

  // Get member names by IDs
  const getMemberNames = (memberIds) => {
    if (!Array.isArray(memberIds)) return "Unknown User";
    return memberIds.map(id => {
      const member = members.find(m => m.id === id);
      return member ? member.displayName || member.email : "Unknown User";
    }).join(", ");
  };

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    "approval-requested": tasks.filter(t => t.status === "approval-requested").length,
    completed: tasks.filter(t => t.status === "completed").length,
    rejected: tasks.filter(t => t.status === "rejected").length,
  };
  
  const availableFilters = isAdmin 
    ? ["all", "pending", "in-progress", "approval-requested", "completed", "rejected"]
    : ["all", "pending", "in-progress", "completed", "rejected"];

  return (
    <div 
      className="min-h-screen p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className="rounded-xl shadow-lg border p-4 sm:p-6 mb-4 sm:mb-6"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: colors.border
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: colors.text }}
              >
                {isAdmin ? "Task Management" : "My Tasks"}
              </h1>
              <p 
                className="mt-1 text-sm sm:text-base"
                style={{ color: colors.textSecondary }}
              >
                {isAdmin ? "Create and manage team tasks" : "Track your assigned tasks and progress"}
              </p>
            </div>
            
            {isAdmin && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                style={{
                  background: colors.gradient,
                  color: colors.text
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {showForm ? "Cancel" : "New Task"}
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div 
          className="rounded-xl shadow-lg border p-2 mb-4 sm:mb-6"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: colors.border
          }}
        >
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1 sm:gap-2">
            {availableFilters.map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className="px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2"
                style={{
                  backgroundColor: filter === status ? colors.primary : 'transparent',
                  color: filter === status ? colors.text : colors.textSecondary
                }}
              >
                <span className="capitalize truncate">
                  {status === "in-progress" ? "In Progress" : 
                   status === "approval-requested" ? "Approval Requests" : 
                   status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                {status === "approval-requested" && isAdmin && (
                  <span 
                    className="px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.text
                    }}
                  >
                    {taskCounts[status]}
                  </span>
                )}
                {status !== "approval-requested" && (
                  <span 
                    className="px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: filter === status 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : colors.surfaceLight,
                      color: filter === status ? colors.text : colors.textMuted
                    }}
                  >
                    {taskCounts[status]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Add Task Form */}
        {isAdmin && showForm && (
          <div 
            className="rounded-xl shadow-lg border p-4 sm:p-6 mb-4 sm:mb-6"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border
            }}
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.surfaceLight }}
              >
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: colors.primary }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 
                  className="text-lg sm:text-xl font-semibold"
                  style={{ color: colors.text }}
                >
                  Create New Task
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Add a new task and assign it to team members
                </p>
              </div>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 sm:space-y-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Task Title */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.text }}
                  >
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 transition-all duration-200"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      color: colors.text,
                      borderColor: colors.border,
                      focusRingColor: colors.primary
                    }}
                    placeholder="Enter a clear and descriptive task title..."
                    required
                  />
                </div>

                {/* Task Description */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.text }}
                  >
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 transition-all duration-200 resize-none"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      color: colors.text,
                      borderColor: colors.border
                    }}
                    placeholder="Provide additional details about the task..."
                  />
                </div>

                {/* Mobile-optimized grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Assign To Members */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <label 
                        className="block text-sm font-medium"
                        style={{ color: colors.text }}
                      >
                        Assign To Members *
                      </label>
                      <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-sm font-medium self-start sm:self-auto"
                        style={{ color: colors.primary }}
                      >
                        {newTask.assignedTo.length === members.length ? "Deselect All" : "Select All"}
                      </button>
                    </div>
                    <div 
                      className="border rounded-lg p-3 max-h-32 sm:max-h-48 overflow-y-auto"
                      style={{ 
                        borderColor: colors.border,
                        backgroundColor: colors.surfaceLight
                      }}
                    >
                      {members.length === 0 ? (
                        <p 
                          className="text-sm text-center py-4"
                          style={{ color: colors.textMuted }}
                        >
                          No members available
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {members.map(member => (
                            <label
                              key={member.id}
                              className="flex items-center p-2 hover:bg-opacity-50 rounded-md cursor-pointer transition-colors duration-150"
                              style={{ 
                                backgroundColor: 'transparent',
                                ':hover': { backgroundColor: colors.surface }
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={newTask.assignedTo.includes(member.id)}
                                onChange={() => handleMemberToggle(member.id)}
                                className="w-4 h-4 rounded focus:ring-2"
                                style={{ 
                                  accentColor: colors.primary
                                }}
                              />
                              <div className="ml-3 min-w-0 flex-1">
                                <p 
                                  className="text-sm font-medium truncate"
                                  style={{ color: colors.text }}
                                >
                                  {member.displayName || "Unnamed User"}
                                </p>
                                <p 
                                  className="text-xs truncate"
                                  style={{ color: colors.textMuted }}
                                >
                                  {member.email}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    {newTask.assignedTo.length > 0 && (
                      <p 
                        className="text-sm mt-2"
                        style={{ color: colors.textSecondary }}
                      >
                        {newTask.assignedTo.length} member{newTask.assignedTo.length > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>

                  {/* Priority and Due Date */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.text }}
                      >
                        Priority Level
                      </label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: colors.surfaceLight,
                          color: colors.text,
                          borderColor: colors.border
                        }}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.text }}
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: colors.surfaceLight,
                          color: colors.text,
                          borderColor: colors.border
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 sm:pt-6 border-t" style={{ borderColor: colors.border }}>
                <button
                  type="submit"
                  disabled={loading || newTask.assignedTo.length === 0}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 font-medium rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: loading || newTask.assignedTo.length === 0 ? colors.textMuted : colors.gradient,
                    color: colors.text
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Task...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Task
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks Grid */}
        <div className="space-y-3 sm:space-y-4">
          {filteredTasks.length === 0 ? (
            <div 
              className="rounded-xl shadow-lg border p-8 sm:p-12 text-center"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border
              }}
            >
              <svg 
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: colors.textMuted }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 
                className="text-lg font-medium mb-2"
                style={{ color: colors.text }}
              >
                No tasks found
              </h3>
              <p style={{ color: colors.textSecondary }}>
                {filter === "all" 
                  ? "No tasks have been created yet." 
                  : `No tasks with "${filter}" status found.`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200"
                style={{ 
                  backgroundColor: colors.surface,
                  borderColor: colors.border
                }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Task Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <div 
                            className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border"
                            style={{
                              color: getPriorityStyle(task.priority).color,
                              backgroundColor: getPriorityStyle(task.priority).backgroundColor,
                              borderColor: getPriorityStyle(task.priority).borderColor
                            }}
                          >
                            {task.priority.toUpperCase()} PRIORITY
                          </div>
                        </div>
                        
                        <h3 
                          className="text-lg sm:text-xl font-semibold mb-2 break-words"
                          style={{ color: colors.text }}
                        >
                          {task.title}
                        </h3>
                        
                        {task.description && (
                          <p 
                            className="text-sm sm:text-base mb-4 leading-relaxed break-words"
                            style={{ color: colors.textSecondary }}
                          >
                            {task.description}
                          </p>
                        )}
                      </div>
                      
                      {isAdmin && (
                        <div className="flex sm:flex-col gap-2">
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border hover:bg-opacity-80"
                            style={{
                              color: "#ef4444",
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                              borderColor: "rgba(239, 68, 68, 0.3)"
                            }}
                          >
                            <svg className="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Task Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {isAdmin && (
                        <div>
                          <span 
                            className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: colors.textMuted }}
                          >
                            Assigned To
                          </span>
                          <p 
                            className="text-sm font-medium mt-1 break-words"
                            style={{ color: colors.text }}
                          >
                            {getMemberNames(task.assignedTo)}
                          </p>
                        </div>
                      )}

                      <div>
                        <span 
                          className="text-xs font-medium uppercase tracking-wider"
                          style={{ color: colors.textMuted }}
                        >
                          Status
                        </span>
                        {isAdmin && task.status === "approval-requested" ? (
                          <div className="mt-2 space-y-2">
                            <button
                              onClick={() => updateTaskStatus(task.id, "completed")}
                              className="w-full px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200"
                              style={{
                                backgroundColor: "rgba(16, 185, 129, 0.1)",
                                color: "#10b981",
                                borderColor: "rgba(16, 185, 129, 0.3)"
                              }}
                            >
                              Approve & Complete
                            </button>
                            <button
                              onClick={() => updateTaskStatus(task.id, "pending")}
                              className="w-full px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200"
                              style={{
                                backgroundColor: colors.surfaceLight,
                                color: colors.primary,
                                borderColor: colors.border
                              }}
                            >
                              Request Re-do
                            </button>
                            <button
                              onClick={() => updateTaskStatus(task.id, "rejected")}
                              className="w-full px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200"
                              style={{
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                color: "#ef4444",
                                borderColor: "rgba(239, 68, 68, 0.3)"
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                            disabled={!isAdmin && (task.status === "completed" || task.status === "rejected" || task.status === "approval-requested")}
                            className="block mt-1 px-3 py-1.5 rounded-lg text-sm font-medium border-0 focus:ring-2 w-full sm:w-auto disabled:opacity-50"
                            style={{
                              backgroundColor: getStatusStyle(task.status).backgroundColor,
                              color: getStatusStyle(task.status).color,
                              borderColor: getStatusStyle(task.status).borderColor
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            {!isAdmin && <option value="approval-requested">Turn-in for Review</option>}
                            {(isAdmin || task.status === "completed") && <option value="completed">Completed</option>}
                            {task.status === "rejected" && <option value="rejected">Rejected</option>}
                          </select>
                        )}
                        {!isAdmin && task.status === "pending" && task.previousStatus === "approval-requested" && (
                          <p className="mt-2 text-sm" style={{ color: "#f59e0b" }}>
                            Re-do requested by admin
                          </p>
                        )}
                      </div>

                      <div>
                        <span 
                          className="text-xs font-medium uppercase tracking-wider"
                          style={{ color: colors.textMuted }}
                        >
                          Created
                        </span>
                        <p 
                          className="text-sm mt-1"
                          style={{ color: colors.text }}
                        >
                          {task.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                        </p>
                        {task.dueDate && (
                          <div className="mt-2">
                            <span 
                              className="text-xs font-medium uppercase tracking-wider"
                              style={{ color: colors.textMuted }}
                            >
                              Due Date
                            </span>
                            <p 
                              className="text-sm mt-1 font-medium"
                              style={{ 
                                color: new Date(task.dueDate.toDate()) < new Date() 
                                  ? "#ef4444" 
                                  : colors.text
                              }}
                            >
                              {task.dueDate.toDate().toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;