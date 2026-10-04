import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaTint, FaFlask } from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";
import BookingCard from "../component/BookingCard";

type Tab = "Upcoming" | "Past" | "Cancelled";

const tabs: Tab[] = ["Upcoming", "Past", "Cancelled"];

const bookings = {
  Upcoming: [
    {
      id: 1,
      title: "CBC Test",
      clinic: "CityCare Diagnostic Centre",
      date: "Apr 22, 2025 • 10:00 AM",
      status: "Confirmed",
      statusColor: "#16a34a",
      collectionType: "Home Collection" as const,
      icon: FaTint,
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Thyroid Profile",
      clinic: "Sunrise Labs & Diagnostics",
      date: "Apr 25, 2025 • 11:30 AM",
      status: "Pending",
      statusColor: "#f59e0b",
      collectionType: "Home Collection" as const,
      icon: GiButterfly,
      color: "#92400e",
    },
    {
      id: 3,
      title: "Urine Routine",
      clinic: "HealthPlus Pathology",
      date: "Apr 28, 2025 • 09:00 AM",
      status: "Scheduled",
      statusColor: "#3b82f6",
      collectionType: "Visit Lab" as const,
      icon: FaFlask,
      color: "#3b82f6",
    },
  ],
  Past: [
    {
      id: 4,
      title: "Lipid Profile",
      clinic: "CityCare Diagnostic Centre",
      date: "Mar 28, 2025 • 08:30 AM",
      status: "Completed",
      statusColor: "#16a34a",
      collectionType: "Home Collection" as const,
      icon: FaTint,
      color: "#ef4444",
    },
    {
      id: 5,
      title: "Blood Sugar (FBS & PP)",
      clinic: "Sunrise Labs & Diagnostics",
      date: "Mar 10, 2025 • 07:45 AM",
      status: "Completed",
      statusColor: "#16a34a",
      collectionType: "Visit Lab" as const,
      icon: FaTint,
      color: "#ef4444",
    },
  ],
  Cancelled: [
    {
      id: 6,
      title: "Liver Function Test (LFT)",
      clinic: "HealthPlus Pathology",
      date: "Feb 18, 2025 • 10:15 AM",
      status: "Cancelled",
      statusColor: "#ef4444",
      collectionType: "Home Collection" as const,
      icon: FaTint,
      color: "#8b5cf6",
    },
  ],
};

function MyBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Upcoming");

  return (
    <div>
      {/* Header: back + title */}
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

        {/* List for the selected tab */}
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
      </div>
    </div>
  );
}

export default MyBookings;
