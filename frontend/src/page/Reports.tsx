import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaFileMedical } from "react-icons/fa";
import ReportCard from "../component/ReportCard";

type Tab = "Completed" | "Pending";

const tabs: Tab[] = ["Completed", "Pending"];

const reports = {
  Completed: [
    {
      id: 1,
      title: "CBC Test",
      date: "Apr 18, 2025 • 10:15 AM",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Thyroid Profile",
      date: "Apr 10, 2025 • 09:20 AM",
      color: "#3b82f6",
    },
    {
      id: 3,
      title: "Urine Routine",
      date: "Apr 05, 2025 • 11:45 AM",
      color: "#3b82f6",
    },
    {
      id: 4,
      title: "Lipid Profile",
      date: "Mar 28, 2025 • 08:30 AM",
      color: "#3b82f6",
    },
  ],
  Pending: [
    {
      id: 5,
      title: "Liver Function Test (LFT)",
      date: "Apr 20, 2025 • 10:00 AM",
      color: "#f59e0b",
    },
    {
      id: 6,
      title: "Blood Sugar (FBS & PP)",
      date: "Apr 21, 2025 • 07:45 AM",
      color: "#f59e0b",
    },
  ],
};

function Reports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Completed");

  return (
    <div>
      {/* Header: back + title */}
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-gray-800">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Reports</h1>
      </div>

      <div className="space-y-4 px-4 pb-4">
        {/* Tabs */}
        <section className="grid grid-cols-2 gap-2">
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
          {reports[activeTab].map((r) => (
            <ReportCard
              key={r.id}
              icon={FaFileMedical}
              color={r.color}
              title={r.title}
              date={r.date}
              completed={activeTab === "Completed"}
              onView={() => console.log("view", r.title)}
              onDownload={() => console.log("download", r.title)}
            />
          ))}

          {reports[activeTab].length === 0 && (
            <p className="py-6 text-center text-xs text-gray-400">
              No reports found
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Reports;
