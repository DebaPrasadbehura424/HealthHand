import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaTint, FaFlask } from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";
import BookingCard from "../component/BookingCard";

type Tab = "Upcoming" | "Past" | "Cancelled";

const tabs: Tab[] = ["Upcoming", "Past", "Cancelled"];

// Map status → tab
const getTabFromStatus = (status: string): Tab => {
  const s = status?.toLowerCase() || "";
  if (s === "cancelled") return "Cancelled";
  if (s === "completed") return "Past";
  return "Upcoming"; // Confirmed / Pending / Scheduled etc.
};

// Optional: pick a nice icon + color based on test name
const getIconAndColor = (title: string) => {
  const t = title?.toLowerCase() || "";
  if (t.includes("urine") || t.includes("flask")) {
    return { icon: FaFlask, color: "#3b82f6" };
  }
  if (t.includes("thyroid") || t.includes("hormone")) {
    return { icon: GiButterfly, color: "#92400e" };
  }
  return { icon: FaTint, color: "#3b82f6" };
};

const statusColorMap: Record<string, string> = {
  Confirmed: "#16a34a",
  Pending: "#f59e0b",
  Scheduled: "#3b82f6",
  Completed: "#16a34a",
  Cancelled: "#ef4444",
};

function MyBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Upcoming");
  const [bookings, setBookings] = useState<Record<Tab, any[]>>({
    Upcoming: [],
    Past: [],
    Cancelled: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login again");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://healthhand-backend.vercel.app/api/bookings/get_booking",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to fetch bookings");
        }

        const data = await res.json();

        // Expecting an array of bookings from backend
        const list = Array.isArray(data) ? data : data.bookings || [];

        const grouped: Record<Tab, any[]> = {
          Upcoming: [],
          Past: [],
          Cancelled: [],
        };

        list.forEach((b: any) => {
          const tab = getTabFromStatus(b.status);
          const { icon, color } = getIconAndColor(b.title || b.testName || "");

          grouped[tab].push({
            id: b._id || b.id,
            title: b.title || b.testName || "Test",
            clinic: b.clinic || b.labName || "Diagnostic Centre",
            date: b.date || b.appointmentDate || b.createdAt,
            status: b.status || "Pending",
            statusColor: statusColorMap[b.status] || "#6b7280",
            collectionType: b.collectionType || "Home Collection",
            icon,
            color,
          });
        });

        setBookings(grouped);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-gray-800">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
      </div>

      <div className="space-y-4 px-4 pb-4">
        {/* Tabs */}
        <section className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg py-2 text-xs font-medium ${
                activeTab === tab
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </section>

        {/* Content */}
        {loading ? (
          <p className="py-10 text-center text-sm text-gray-500">
            Loading bookings...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-sm text-red-500">{error}</p>
        ) : (
          <section className="space-y-3">
            {bookings[activeTab].map((b) => (
              <BookingCard
                key={b.id}
                icon={b.icon}
                color={b.color}
                title={b.title}
                clinic={b.clinic}
                date={b.date}
                status={b.status}
                statusColor={b.statusColor}
                collectionType={b.collectionType}
              />
            ))}

            {bookings[activeTab].length === 0 && (
              <p className="py-6 text-center text-xs text-gray-400">
                No bookings found
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
