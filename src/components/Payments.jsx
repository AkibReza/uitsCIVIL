import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  orderBy,
  where
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Payment = () => {
  const [entries, setEntries] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState("all"); // all, monthly, event
  const [sortOrder, setSortOrder] = useState("desc"); // desc, asc
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({
    title: "",
    type: "monthly", // monthly or event
  });

  const { user, isAdmin } = useAuth();

  // Fetch all payment entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        let q = query(collection(db, "paymentEntries"), orderBy("createdAt", sortOrder));
        
        if (filter !== "all") {
          q = query(
            collection(db, "paymentEntries"), 
            where("type", "==", filter),
            orderBy("createdAt", sortOrder)
          );
        }

        const querySnapshot = await getDocs(q);
        const entriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(entriesData);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [filter, sortOrder]);

  // Fetch all members
  useEffect(() => {
    const fetchMembers = async () => {
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
  }, []);

  // Create new payment entry
  const handleCreateEntry = async () => {
    if (!newEntry.title.trim()) return;

    try {
      await addDoc(collection(db, "paymentEntries"), {
        title: newEntry.title,
        type: newEntry.type,
        createdAt: new Date(),
        createdBy: user.uid,
        payments: [], // Array to store payment statuses
      });

      // Reset form
      setNewEntry({ title: "", type: "monthly" });
      setShowCreateForm(false);
      
      // Refresh entries
      const entriesQuery = query(collection(db, "paymentEntries"), orderBy("createdAt", sortOrder));
      const querySnapshot = await getDocs(entriesQuery);
      const entriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entriesData);
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  // Toggle payment status for a member
  const togglePaymentStatus = async (entryId, memberId) => {
    if (!isAdmin) return;

    try {
      const entry = entries.find(e => e.id === entryId);
      const payments = entry.payments || [];
      const existingPayment = payments.find(p => p.memberId === memberId);

      let updatedPayments;
      if (existingPayment) {
        // Toggle status
        updatedPayments = payments.map(p => 
          p.memberId === memberId 
            ? { ...p, status: p.status === "paid" ? "pending" : "paid", updatedAt: new Date() }
            : p
        );
      } else {
        // Add new payment record
        updatedPayments = [...payments, {
          memberId,
          status: "paid",
          updatedAt: new Date()
        }];
      }

      await updateDoc(doc(db, "paymentEntries", entryId), {
        payments: updatedPayments
      });

      // Update local state
      setEntries(entries.map(e => 
        e.id === entryId 
          ? { ...e, payments: updatedPayments }
          : e
      ));

    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  // Get payment status for a member in an entry
  const getPaymentStatus = (entry, memberId) => {
    const payment = entry.payments?.find(p => p.memberId === memberId);
    return payment?.status || "pending";
  };

  // Get user's own payment status for an entry
  const getUserPaymentStatus = (entry) => {
    return getPaymentStatus(entry, user.uid);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center" style={{ backgroundColor: colors.surface, borderRadius: "8px" }}>
        <div className="text-center" style={{ color: colors.text }}>
          <div className="text-xl mb-2">Loading...</div>
          <div style={{ color: colors.textSecondary }}>Fetching payment data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ backgroundColor: colors.surface, borderRadius: "8px" }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
          Payment Tracking
        </h2>
        {isAdmin && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 rounded"
            style={{ background: colors.gradient, color: colors.text }}
          >
            Create New Entry
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded"
          style={{
            backgroundColor: colors.surfaceLight,
            color: colors.text,
            border: `1px solid ${colors.border}`
          }}
        >
          <option value="all">All Types</option>
          <option value="monthly">Monthly</option>
          <option value="event">Event</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 rounded"
          style={{
            backgroundColor: colors.surfaceLight,
            color: colors.text,
            border: `1px solid ${colors.border}`
          }}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Create Entry Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-lg w-96"
            style={{ backgroundColor: colors.surface }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
              Create New Payment Entry
            </h3>
            <div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Entry Title"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 rounded"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}
                />
                <select
                  value={newEntry.type}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 rounded"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <option value="monthly">Monthly</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateEntry}
                  className="flex-1 py-2 rounded"
                  style={{ background: colors.gradient, color: colors.text }}
                >
                  Create Entry
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-2 rounded"
                  style={{ backgroundColor: colors.surfaceLight, color: colors.text }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entry Detail Modal */}
      {selectedEntry && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-lg w-4/5 max-w-4xl max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: colors.surface }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                  {selectedEntry.title}
                </h3>
                <p style={{ color: colors.textSecondary }}>
                  {selectedEntry.type} • Created: {selectedEntry.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-2xl"
                style={{ color: colors.text }}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Payment Pending */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-red-600">
                  Payment Pending ({members.filter(member => getPaymentStatus(selectedEntry, member.id) === "pending").length})
                </h4>
                <div
                  className="min-h-[300px] p-4 rounded border-2 border-dashed border-red-300"
                  style={{ backgroundColor: colors.surfaceLight }}
                >
                  <div className="space-y-2">
                    {members
                      .filter(member => getPaymentStatus(selectedEntry, member.id) === "pending")
                      .map(member => (
                        <div
                          key={member.id}
                          onClick={() => togglePaymentStatus(selectedEntry.id, member.id)}
                          className="p-3 rounded cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ backgroundColor: colors.surface, color: colors.text }}
                        >
                          <div className="font-medium">{member.displayName || member.email}</div>
                          <div className="text-sm" style={{ color: colors.textSecondary }}>
                            {member.email}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>

              {/* Payment Made */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-600">
                  Payment Made ({members.filter(member => getPaymentStatus(selectedEntry, member.id) === "paid").length})
                </h4>
                <div
                  className="min-h-[300px] p-4 rounded border-2 border-dashed border-green-300"
                  style={{ backgroundColor: colors.surfaceLight }}
                >
                  <div className="space-y-2">
                    {members
                      .filter(member => getPaymentStatus(selectedEntry, member.id) === "paid")
                      .map(member => (
                        <div
                          key={member.id}
                          onClick={() => togglePaymentStatus(selectedEntry.id, member.id)}
                          className="p-3 rounded cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ backgroundColor: colors.surface, color: colors.text }}
                        >
                          <div className="font-medium">{member.displayName || member.email}</div>
                          <div className="text-sm" style={{ color: colors.textSecondary }}>
                            {member.email}
                          </div>
                          <div className="text-xs" style={{ color: colors.textMuted }}>
                            Paid: {selectedEntry.payments?.find(p => p.memberId === member.id)?.updatedAt?.toDate().toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-8" style={{ color: colors.textSecondary }}>
            No entries found
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => isAdmin && setSelectedEntry(entry)}
              className={`p-4 rounded ${isAdmin ? 'cursor-pointer hover:opacity-80' : ''} transition-opacity`}
              style={{ backgroundColor: colors.surfaceLight }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        entry.type === "monthly" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {entry.type}
                    </span>
                    <span style={{ color: colors.textSecondary }}>
                      Created: {entry.createdAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  {isAdmin ? (
                    <div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>
                        Paid: {entry.payments?.filter(p => p.status === "paid").length || 0} / {members.length}
                      </div>
                      <div className="text-xs mt-1" style={{ color: colors.textMuted }}>
                        Click to manage
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          getUserPaymentStatus(entry) === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {getUserPaymentStatus(entry) === "paid" ? "Paid" : "Pending"}
                      </span>
                    </div>
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

export default Payment;