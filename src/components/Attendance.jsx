import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Attendance = () => {
  const [attendanceEntries, setAttendanceEntries] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    memberAttendance: {},
  });
  const [sortBy, setSortBy] = useState("actualDate"); // "actualDate" or "createdDate"
  const [loading, setLoading] = useState(true);

  const { user, isAdmin } = useAuth();

  // Utility function to format date to DD-MM-YYYY
  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Utility function to convert DD-MM-YYYY to YYYY-MM-DD for input
  const formatDateToYYYYMMDD = (ddmmyyyy) => {
    const [day, month, year] = ddmmyyyy.split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchMembers();
    fetchAttendanceEntries();
  }, [user, isAdmin, sortBy]);

  const fetchMembers = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((member) => member.role === "member");
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchAttendanceEntries = async () => {
    try {
      setLoading(true);
      let q;
      
      if (sortBy === "actualDate") {
        q = query(
          collection(db, "attendanceEntries"),
          orderBy("date", "desc")
        );
      } else {
        q = query(
          collection(db, "attendanceEntries"),
          orderBy("createdAt", "desc")
        );
      }

      const querySnapshot = await getDocs(q);
      const entriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendanceEntries(entriesData);
    } catch (error) {
      console.error("Error fetching attendance entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntry = async () => {
    try {
      const entryData = {
        title: formData.title || "",
        description: formData.description || "",
        date: formatDateToDDMMYYYY(formData.date),
        memberAttendance: formData.memberAttendance,
        createdAt: new Date(),
        createdBy: user.uid,
      };

      await addDoc(collection(db, "attendanceEntries"), entryData);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        memberAttendance: {},
      });
      setShowCreateForm(false);
      
      // Refresh entries
      fetchAttendanceEntries();
    } catch (error) {
      console.error("Error creating attendance entry:", error);
    }
  };

  const handleUpdateEntry = async () => {
    try {
      const entryData = {
        title: formData.title || "",
        description: formData.description || "",
        date: formatDateToDDMMYYYY(formData.date),
        memberAttendance: formData.memberAttendance,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, "attendanceEntries", editingEntry.id), entryData);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        memberAttendance: {},
      });
      setEditingEntry(null);
      
      // Refresh entries
      fetchAttendanceEntries();
    } catch (error) {
      console.error("Error updating attendance entry:", error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this attendance entry?")) {
      try {
        await deleteDoc(doc(db, "attendanceEntries", entryId));
        fetchAttendanceEntries();
      } catch (error) {
        console.error("Error deleting attendance entry:", error);
      }
    }
  };

  const handleAttendanceChange = (memberId, status) => {
    setFormData((prev) => ({
      ...prev,
      memberAttendance: {
        ...prev.memberAttendance,
        [memberId]: status,
      },
    }));
  };

  const startEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title || "",
      description: entry.description || "",
      date: formatDateToYYYYMMDD(entry.date),
      memberAttendance: entry.memberAttendance || {},
    });
    setShowCreateForm(true);
  };

  const cancelEdit = () => {
    setEditingEntry(null);
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      memberAttendance: {},
    });
    setShowCreateForm(false);
  };

  // Filter user's attendance for members
  const getUserAttendance = () => {
    return attendanceEntries.filter((entry) => 
      entry.memberAttendance && entry.memberAttendance[user.uid]
    );
  };

  if (loading) {
    return (
      <div
        className="p-6 flex items-center justify-center"
        style={{ backgroundColor: colors.surface, borderRadius: "8px" }}
      >
        <div style={{ color: colors.text }}>Loading attendance data...</div>
      </div>
    );
  }

  return (
    <div
      className="p-6"
      style={{ backgroundColor: colors.surface, borderRadius: "8px" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
          {isAdmin ? "Manage Attendance" : "My Attendance"}
        </h2>
        
        {isAdmin && (
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.text,
                borderColor: colors.border,
              }}
            >
              <option value="actualDate">Sort by Actual Date</option>
              <option value="createdDate">Sort by Creation Date</option>
            </select>
            
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 rounded font-medium"
              style={{
                backgroundColor: colors.primary,
                color: "white",
              }}
            >
              Create New Entry
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Form */}
      {isAdmin && showCreateForm && (
        <div
          className="mb-6 p-6 rounded"
          style={{ backgroundColor: colors.surfaceLight }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            {editingEntry ? "Edit Attendance Entry" : "Create New Attendance Entry"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2" style={{ color: colors.text }}>
                Title (Optional)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Weekly Team Meeting"
                className="w-full p-2 rounded"
                style={{
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                }}
              />
            </div>
            
            <div>
              <label className="block mb-2" style={{ color: colors.text }}>
                Date (DD-MM-YYYY) *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full p-2 rounded"
                style={{
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                }}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2" style={{ color: colors.text }}>
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Additional notes about this attendance session..."
              rows={3}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium mb-3" style={{ color: colors.text }}>
              Mark Attendance for Members
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded"
                  style={{ backgroundColor: colors.surface }}
                >
                  <div className="mb-2" style={{ color: colors.text }}>
                    {member.displayName || member.email}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAttendanceChange(member.id, "present")}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        formData.memberAttendance[member.id] === "present"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(member.id, "absent")}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        formData.memberAttendance[member.id] === "absent"
                          ? "bg-red-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={editingEntry ? handleUpdateEntry : handleCreateEntry}
              className="px-6 py-2 rounded font-medium"
              style={{
                backgroundColor: colors.primary,
                color: "white",
              }}
            >
              {editingEntry ? "Update Entry" : "Create Entry"}
            </button>
            <button
              onClick={cancelEdit}
              className="px-6 py-2 rounded font-medium"
              style={{
                backgroundColor: colors.textMuted,
                color: "white",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Attendance Entries List */}
      <div className="space-y-4">
        {isAdmin ? (
          // Admin view - all entries
          attendanceEntries.length === 0 ? (
            <div
              className="text-center p-8"
              style={{ color: colors.textSecondary }}
            >
              No attendance entries found. Create your first entry above.
            </div>
          ) : (
            attendanceEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded"
                style={{ backgroundColor: colors.surfaceLight }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold" style={{ color: colors.text }}>
                      {entry.title || `Attendance for ${entry.date}`}
                    </h4>
                    <div style={{ color: colors.textSecondary }}>
                      Date: {entry.date}
                    </div>
                    {entry.description && (
                      <div
                        className="mt-1"
                        style={{ color: colors.textMuted }}
                      >
                        {entry.description}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(entry)}
                      className="px-3 py-1 rounded text-sm font-medium"
                      style={{
                        backgroundColor: colors.primary,
                        color: "white",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="px-3 py-1 rounded text-sm font-medium bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {members.map((member) => {
                    const status = entry.memberAttendance?.[member.id];
                    return (
                      <div
                        key={member.id}
                        className="flex justify-between items-center p-2 rounded"
                        style={{ backgroundColor: colors.surface }}
                      >
                        <span style={{ color: colors.text }}>
                          {member.displayName || member.email}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            status === "present"
                              ? "bg-green-100 text-green-800"
                              : status === "absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {status || "Not marked"}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 text-sm" style={{ color: colors.textMuted }}>
                  Created: {entry.createdAt?.toDate?.()?.toLocaleString() || "N/A"}
                  {entry.updatedAt && (
                    <span> | Updated: {entry.updatedAt.toDate().toLocaleString()}</span>
                  )}
                </div>
              </div>
            ))
          )
        ) : (
          // Member view - only their attendance
          getUserAttendance().length === 0 ? (
            <div
              className="text-center p-8"
              style={{ color: colors.textSecondary }}
            >
              No attendance records found for you.
            </div>
          ) : (
            getUserAttendance().map((entry) => {
              const userStatus = entry.memberAttendance[user.uid];
              return (
                <div
                  key={entry.id}
                  className="p-4 rounded"
                  style={{ backgroundColor: colors.surfaceLight }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold" style={{ color: colors.text }}>
                        {entry.title || `Attendance for ${entry.date}`}
                      </h4>
                      <div style={{ color: colors.textSecondary }}>
                        Date: {entry.date}
                      </div>
                      {entry.description && (
                        <div
                          className="mt-1"
                          style={{ color: colors.textMuted }}
                        >
                          {entry.description}
                        </div>
                      )}
                    </div>
                    <div
                      className={`px-4 py-2 rounded font-medium ${
                        userStatus === "present"
                          ? "bg-green-100 text-green-800"
                          : userStatus === "absent"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {userStatus || "Not marked"}
                    </div>
                  </div>
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
};

export default Attendance;