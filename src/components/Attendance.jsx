import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchAttendance = async () => {
      const q = isAdmin
        ? query(collection(db, "attendance"))
        : query(collection(db, "attendance"), where("userId", "==", user.uid));

      const querySnapshot = await getDocs(q);
      const attendanceData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendance(attendanceData);
    };

    fetchAttendance();
  }, [user, isAdmin]);

  const markAttendance = async (userId, status) => {
    try {
      await addDoc(collection(db, "attendance"), {
        userId,
        date: selectedDate,
        status,
        markedBy: user.uid,
        timestamp: new Date(),
      });
      // Refresh attendance
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div
      className="p-6"
      style={{ backgroundColor: colors.surface, borderRadius: "8px" }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        {isAdmin ? "Manage Attendance" : "My Attendance"}
      </h2>

      {isAdmin && (
        <div className="mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 rounded"
            style={{
              backgroundColor: colors.surfaceLight,
              color: colors.text,
              borderColor: colors.border,
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {attendance.map((record) => (
          <div
            key={record.id}
            className="p-4 rounded"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <div style={{ color: colors.text }}>
              Date: {new Date(record.date).toLocaleDateString()}
            </div>
            <div style={{ color: colors.textSecondary }}>
              Status: {record.status}
            </div>
            <div style={{ color: colors.textMuted }}>
              Marked: {record.timestamp.toDate().toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
