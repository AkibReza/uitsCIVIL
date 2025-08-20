import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      const q = isAdmin
        ? query(collection(db, "tasks"))
        : query(collection(db, "tasks"), where("assignedTo", "==", user.uid));

      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    };

    fetchTasks();
  }, [user, isAdmin]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: newTask,
        assignedTo: user.uid, // For admin, they'll select a user
        createdAt: new Date(),
        status: "pending",
      });
      setNewTask("");
      // Refresh tasks
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div
      className="p-6"
      style={{ backgroundColor: colors.surface, borderRadius: "8px" }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        {isAdmin ? "Manage Tasks" : "My Tasks"}
      </h2>

      {isAdmin && (
        <form onSubmit={handleAddTask} className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 p-2 rounded"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.text,
                borderColor: colors.border,
              }}
              placeholder="New task..."
            />
            <button
              type="submit"
              className="px-4 py-2 rounded"
              style={{ background: colors.gradient, color: colors.text }}
            >
              Add Task
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <h3 style={{ color: colors.text }}>{task.title}</h3>
            <p style={{ color: colors.textSecondary }}>Status: {task.status}</p>
            <p style={{ color: colors.textMuted }}>
              Created: {task.createdAt.toDate().toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
