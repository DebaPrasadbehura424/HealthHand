import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiHome,
  FiMapPin,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import {
  FaTint,
  FaFlask,
  FaPoop,
  FaVial,
  FaClinicMedical,
} from "react-icons/fa";
import type { IconType } from "react-icons";
// import api from "../api/api";

interface Test {
  _id: string;
  name: string;
  testType: "Blood" | "Urine" | "Stool" | "Other";
  price: number;
  parametersCount: number;
  clinic: {
    _id: string;
    name: string;
    address: string;
    homeCollection: boolean;
  } | null;
}

type Collection = "Home Collection" | "Visit Lab";

const typeStyle: Record<Test["testType"], { icon: IconType; color: string }> = {
  Blood: { icon: FaTint, color: "#ef4444" },
  Urine: { icon: FaFlask, color: "#f59e0b" },
  Stool: { icon: FaPoop, color: "#92400e" },
  Other: { icon: FaVial, color: "#8b5cf6" },
};

const timeSlots = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

const today = new Date().toISOString().split("T")[0];

function BookingAppointment() {
  const navigate = useNavigate();
  const { testId } = useParams();

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [collectionType, setCollectionType] =
    useState<Collection>("Home Collection");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(timeSlots[1]);
  const [address, setAddress] = useState("");
  const [editingAddress, setEditingAddress] = useState(true);
  const [instructions, setInstructions] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // load the test (it comes with its clinic)
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/tests/${testId}`,
        );
        setTest(data);
        if (data.clinic && !data.clinic.homeCollection) {
          setCollectionType("Visit Lab");
        }
      } catch (err: any) {
        setLoadError(err.response?.data?.message || "Could not load test");
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    console.log(date);
    console.log(collectionType);
    console.log(token);

    if (!date) {
      setError("Please select a date");
      return;
    }
    if (collectionType === "Home Collection" && !address.trim()) {
      setError("Please enter your address");
      return;
    }

    // token from localStorage
    if (!token) {
      navigate("/"); // not logged in
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await axios.post(
        "http://localhost:5000/api/bookings/createBook",
        {
          testId,
          collectionType,
          date,
          timeSlot,
          address: collectionType === "Home Collection" ? address : "",
          instructions,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      navigate("/my_bookings");
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  const canHome = test?.clinic?.homeCollection ?? true;

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-gray-800">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
      </div>

      {loading && (
        <p className="py-20 text-center text-sm text-gray-400">Loading...</p>
      )}
      {!loading && loadError && (
        <p className="py-20 text-center text-sm text-red-500">{loadError}</p>
      )}

      {!loading && !loadError && test && (
        <>
          <div className="space-y-6 px-4 pb-4">
            {/* Selected test */}
            <section className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                <span
                  className="absolute inset-0 rounded-full opacity-10"
                  style={{ backgroundColor: typeStyle[test.testType].color }}
                />
                {(() => {
                  const Icon = typeStyle[test.testType].icon;
                  return (
                    <Icon
                      size={20}
                      color={typeStyle[test.testType].color}
                      className="relative"
                    />
                  );
                })()}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {test.name}
                </h3>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  ₹{test.price} • {test.parametersCount} parameters
                </p>
              </div>
            </section>

            {/* Clinic */}
            {test.clinic && (
              <section>
                <h2 className="mb-3 text-base font-semibold text-gray-900">
                  Clinic
                </h2>
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <span className="absolute inset-0 rounded-lg bg-green-600 opacity-10" />
                    <FaClinicMedical
                      size={18}
                      color="#16a34a"
                      className="relative"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {test.clinic.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      {test.clinic.address}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Sample Collection */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                Sample Collection
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={!canHome}
                  onClick={() => setCollectionType("Home Collection")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 bg-white py-4 text-xs font-medium disabled:opacity-40 ${
                    collectionType === "Home Collection"
                      ? "border-green-800 text-green-800"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  <FiHome size={22} />
                  Home Collection
                </button>

                <button
                  onClick={() => setCollectionType("Visit Lab")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 bg-white py-4 text-xs font-medium ${
                    collectionType === "Visit Lab"
                      ? "border-green-800 text-green-800"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  <FiMapPin size={22} />
                  Visit Lab
                </button>
              </div>
              {!canHome && (
                <p className="mt-2 text-[11px] text-gray-400">
                  This clinic does not offer home collection
                </p>
              )}
            </section>

            {/* Date & Time */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                Select Date & Time
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3">
                  <FiCalendar size={18} className="text-gray-500" />
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-xs text-gray-700 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3">
                  <FiClock size={18} className="text-gray-500" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-transparent text-xs text-gray-700 outline-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Address (Home Collection only) with Change */}
            {collectionType === "Home Collection" && (
              <section>
                <h2 className="mb-3 text-base font-semibold text-gray-900">
                  Address
                </h2>

                {editingAddress ? (
                  <div className="space-y-2">
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      placeholder="House no, street, area, city"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-700 outline-none placeholder:text-gray-400"
                    />
                    <button
                      onClick={() => address.trim() && setEditingAddress(false)}
                      className="text-xs font-medium text-green-700"
                    >
                      Save Address
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
                    <FiMapPin size={18} className="text-green-700" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">
                        Home
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500">
                        {address}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingAddress(true)}
                      className="text-xs font-medium text-green-700"
                    >
                      Change
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Special Instructions */}
            <section>
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                Special Instructions{" "}
                <span className="text-xs font-normal text-gray-400">
                  (Optional)
                </span>
              </h2>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
                placeholder="Any special requests?"
                className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-700 outline-none placeholder:text-gray-400"
              />
            </section>

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          {/* Confirm */}
          <div className="sticky bottom-0 bg-white px-4 py-3">
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="h-12 w-full rounded-lg bg-green-700 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
            <p className="mt-2 text-center text-xs text-gray-600">
              Total Amount:{" "}
              <span className="font-semibold text-gray-900">₹{test.price}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default BookingAppointment;
