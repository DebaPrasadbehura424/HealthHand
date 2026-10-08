import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiPhone,
  FiClock,
  FiHome,
  FiChevronDown,
} from "react-icons/fi";
import { FaStar, FaTint, FaFlask, FaPoop, FaVial } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useAuth, type ClinicTest } from "../context/AuthProvider";

const typeStyle: Record<
  ClinicTest["testType"],
  { icon: IconType; color: string }
> = {
  Blood: { icon: FaTint, color: "#ef4444" },
  Urine: { icon: FaFlask, color: "#f59e0b" },
  Stool: { icon: FaPoop, color: "#92400e" },
  Other: { icon: FaVial, color: "#8b5cf6" },
};

function AllClinicsTest() {
  const navigate = useNavigate();
  const { clinics, clinicsLoading } = useAuth();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-gray-800">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Clinics & Hospitals</h1>
      </div>

      <div className="space-y-4 px-4 pb-4">
        {clinicsLoading && (
          <p className="py-20 text-center text-sm text-gray-400">
            Loading clinics...
          </p>
        )}

        {!clinicsLoading && clinics.length === 0 && (
          <p className="py-20 text-center text-sm text-gray-400">
            No clinics found
          </p>
        )}

        {clinics.map((c) => {
          const isOpen = openId === c._id;

          return (
            <div
              key={c._id}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              {/* Name + badges */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-bold text-gray-900">{c.name}</h2>
                <div className="flex shrink-0 gap-1.5">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                    {c.type}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${
                      c.isVerified ? "bg-red-500" : "bg-green-600"
                    }`}
                  >
                    {c.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-2 space-y-1.5 text-xs text-gray-600">
                <p className="flex items-center gap-1.5">
                  <FaStar size={12} className="text-orange-400" />
                  <span className="font-semibold text-gray-900">
                    {c.rating}
                  </span>
                  ({c.reviewsCount} reviews)
                </p>
                <p className="flex items-center gap-1.5">
                  <FiMapPin size={13} /> {c.address}
                </p>
                <p className="flex items-center gap-1.5">
                  <FiPhone size={13} /> {c.phone || "Not available"}
                </p>
                <p className="flex items-center gap-1.5">
                  <FiClock size={13} /> {c.openTime} - {c.closeTime}
                </p>
                <p className="flex items-center gap-1.5">
                  <FiHome size={13} />
                  {c.homeCollection
                    ? "Home collection available"
                    : "No home collection"}
                </p>
              </div>

              {/* Dropdown button */}
              <button
                onClick={() => setOpenId(isOpen ? null : c._id)}
                className="mt-3 flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700"
              >
                <span>Available Tests ({c.tests.length})</span>
                <FiChevronDown
                  size={16}
                  className={isOpen ? "rotate-180" : ""}
                />
              </button>

              {/* Tests list */}
              {isOpen && (
                <div className="mt-2 space-y-2">
                  {c.tests.length === 0 && (
                    <p className="py-2 text-center text-xs text-gray-400">
                      No tests added yet
                    </p>
                  )}

                  {c.tests.map((t) => {
                    const Icon = typeStyle[t.testType].icon;
                    return (
                      <div
                        key={t._id}
                        onClick={() => navigate(`/test_details/${t._id}`)}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-100 px-3 py-2"
                      >
                        <Icon size={16} color={typeStyle[t.testType].color} />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-800">
                            {t.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {t.testType} • {t.parametersCount} parameters
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-gray-900">
                          ₹{t.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllClinicsTest;
