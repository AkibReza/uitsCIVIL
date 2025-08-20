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
    assignedTo: "",
    priority: "medium",
    dueDate: ""
  });
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, isAdmin } = useAuth();

  // Fetch tasks based on user role
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = isAdmin
          ? query(collection(db, "tasks"), orderBy("createdAt", "desc"))
          : query(
              collection(db, "tasks"), 
              where("assignedTo", "==", user.uid),
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

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || (!isAdmin && !newTask.assignedTo)) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title: newTask.title,
        description: newTask.description,
        assignedTo: isAdmin ? newTask.assignedTo : user.uid,
        assignedBy: user.uid,
        priority: newTask.priority,
        dueDate: newTask.dueDate ? new Date(newTask.dueDate) : null,
        createdAt: new Date(),
        status: "pending",
      });
      
      setNewTask({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        dueDate: ""
      });
      
      // Refresh tasks
      const q = isAdmin
        ? query(collection(db, "tasks"), orderBy("createdAt", "desc"))
        : query(
            collection(db, "tasks"), 
            where("assignedTo", "==", user.uid),
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
      await updateDoc(doc(db, "tasks", taskId), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task
      ));
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

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ff4757";
      case "medium": return "#ffa502";
      case "low": return "#2ed573";
      default: return colors.textSecondary;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "#2ed573";
      case "in-progress": return "#ffa502";
      case "pending": return "#747d8c";
      default: return colors.textSecondary;
    }
  };

  // Get member name by ID
  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.displayName || member.email : "Unknown User";
  };

  return (
    <div
      className="p-6"
      style={{ backgroundColor: colors.surface, borderRadius: "8px" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
          {isAdmin ? "Manage Tasks" : "My Tasks"}
        </h2>
        
        {/* Filter buttons */}
        <div className="flex gap-2">
          {["all", "pending", "in-progress", "completed"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className="px-3 py-1 rounded text-sm capitalize"
              style={{
                backgroundColor: filter === status ? colors.primary : colors.surfaceLight,
                color: filter === status ? "white" : colors.text,
                border: `1px solid ${colors.border}`
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Add Task Form (Admin only) */}
      {isAdmin && (
        <div
          className="p-4 rounded mb-6"
          style={{ backgroundColor: colors.surfaceLight }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
            Create New Task
          </h3>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full p-2 rounded border"
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                  placeholder="Enter task title..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Assign To *
                </label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  className="w-full p-2 rounded border"
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                  required
                >
                  <option value="">Select a member...</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.displayName || member.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full p-2 rounded border h-24 resize-none"
                style={{
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                placeholder="Task description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full p-2 rounded border"
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full p-2 rounded border"
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded font-medium"
              style={{ 
                background: loading ? colors.textMuted : colors.gradient, 
                color: "white",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div 
            className="text-center py-8"
            style={{ color: colors.textMuted }}
          >
            No tasks found for the selected filter.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded border"
              style={{ 
                backgroundColor: colors.surfaceLight,
                borderColor: colors.border 
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 
                    className="text-lg font-semibold"
                    style={{ color: colors.text }}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p 
                      className="mt-1 text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {task.description}
                    </p>
                  )}
                </div>
                
                {isAdmin && (
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-4 px-2 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: "#ff4757",
                      color: "white"
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                {isAdmin && (
                  <div>
                    <span className="text-sm" style={{ color: colors.textMuted }}>
                      Assigned to:
                    </span>
                    <p className="font-medium" style={{ color: colors.text }}>
                      {getMemberName(task.assignedTo)}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-sm" style={{ color: colors.textMuted }}>
                    Priority:
                  </span>
                  <p 
                    className="font-medium capitalize"
                    style={{ color: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </p>
                </div>

                <div>
                  <span className="text-sm" style={{ color: colors.textMuted }}>
                    Status:
                  </span>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    className="block mt-1 p-1 rounded text-sm capitalize"
                    style={{
                      backgroundColor: colors.surface,
                      color: getStatusColor(task.status),
                      borderColor: colors.border,
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <span className="text-sm" style={{ color: colors.textMuted }}>
                    Created:
                  </span>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {task.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                  </p>
                  {task.dueDate && (
                    <>
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        Due:
                      </span>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: new Date(task.dueDate.toDate()) < new Date() 
                            ? "#ff4757" 
                            : colors.textSecondary 
                        }}
                      >
                        {task.dueDate.toDate().toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;