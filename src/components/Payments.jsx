import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    userId: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7), // YYYY-MM format
  });
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      const q = isAdmin
        ? query(collection(db, "payments"))
        : query(collection(db, "payments"), where("userId", "==", user.uid));

      const querySnapshot = await getDocs(q);
      const paymentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(paymentsData);
    };

    fetchPayments();
  }, [user, isAdmin]);

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!newPayment.amount || !newPayment.month) return;

    try {
      await addDoc(collection(db, "payments"), {
        ...newPayment,
        confirmedBy: user.uid,
        timestamp: new Date(),
      });
      setNewPayment({
        userId: "",
        amount: "",
        month: new Date().toISOString().slice(0, 7),
      });
      // Refresh payments
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <div
      className="p-6"
      style={{ backgroundColor: colors.surface, borderRadius: "8px" }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        {isAdmin ? "Manage Payments" : "My Payments"}
      </h2>

      {isAdmin && (
        <form onSubmit={handleAddPayment} className="mb-6">
          <div className="space-y-4">
            <input
              type="month"
              value={newPayment.month}
              onChange={(e) =>
                setNewPayment((prev) => ({ ...prev, month: e.target.value }))
              }
              className="w-full p-2 rounded"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
            <input
              type="number"
              value={newPayment.amount}
              onChange={(e) =>
                setNewPayment((prev) => ({ ...prev, amount: e.target.value }))
              }
              className="w-full p-2 rounded"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.text,
                borderColor: colors.border,
              }}
              placeholder="Amount"
            />
            <button
              type="submit"
              className="w-full p-2 rounded"
              style={{ background: colors.gradient, color: colors.text }}
            >
              Confirm Payment
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 rounded"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <div style={{ color: colors.text }}>
              Month:{" "}
              {new Date(payment.month + "-01").toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
              })}
            </div>
            <div style={{ color: colors.textSecondary }}>
              Amount: ${payment.amount}
            </div>
            <div style={{ color: colors.textMuted }}>
              Confirmed: {payment.timestamp.toDate().toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
