import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiChevronRight,
  FiHome,
  FiMapPin,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { FaTint, FaClinicMedical } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

const test = {
  title: "Complete Blood Count (CBC)",
  price: 299,
  detail: "8 parameters",
};

const clinic = {
  name: "CityCare Diagnostic Centre",
  distance: "1.2 km",
};

const address = {
  label: "Home",
  text: "123, Green Park, Patia, Bhubaneswar",
};

const timeSlots = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

function BookingAppointment() {
  const navigate = useNavigate();

  const [collectionType, setCollectionType] = useState<"home" | "lab">("home");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeSlots[1]);
  const [instructions, setInstructions] = useState("");

  const handleConfirm = () => {
    const booking = {
      test: test.title,
      clinic: clinic.name,
      collectionType,
      date,
      time,
      address: collectionType === "home" ? address.text : null,
      instructions,
      total: test.price,
    };
    console.log(booking); // later: send to backend with axios
    navigate("/"); // later: navigate("/bookings")
  };

  return (
    <div>
      {/* Header: back + title */}
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-gray-800">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
      </div>

      <div className="space-y-6 px-4 pb-4">
        {/* Selected test */}
        <section className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
            <span className="absolute inset-0 rounded-full bg-red-500 opacity-10" />
            <FaTint size={20} color="#ef4444" className="relative" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {test.title}
            </h3>
            <p className="mt-0.5 text-[11px] text-gray-500">
              ₹{test.price} • {test.detail}
            </p>
          </div>
        </section>

        {/* Select Clinic */}
        <section>
          <h2 className="mb-3 text-base font-semibold text-gray-900">
            Select Clinic
          </h2>
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <span className="absolute inset-0 rounded-lg bg-green-600 opacity-10" />
              <FaClinicMedical size={18} color="#16a34a" className="relative" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                {clinic.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
                {clinic.distance} •
                <MdOutlineVerified className="text-green-600" />
                <span className="text-green-700">Verified</span>
              </p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </div>
        </section>

        {/* Sample Collection */}
        <section>
          <h2 className="mb-3 text-base font-semibold text-gray-900">
            Sample Collection
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCollectionType("home")}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 bg-white py-4 text-xs font-medium ${
                collectionType === "home"
                  ? "border-green-800 text-green-800"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              <FiHome size={22} />
              Home Collection
            </button>

            <button
              onClick={() => setCollectionType("lab")}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 bg-white py-4 text-xs font-medium ${
                collectionType === "lab"
                  ? "border-green-800 text-green-800"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              <FiMapPin size={22} />
              Visit Lab
            </button>
          </div>
        </section>

        {/* Select Date & Time (simple for now) */}
        <section>
          <h2 className="mb-3 text-base font-semibold text-gray-900">
            Select Date & Time
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3">
              <FiCalendar size={18} className="text-gray-500" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs text-gray-700 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3">
              <FiClock size={18} className="text-gray-500" />
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
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

        {/* Address (only for Home Collection) */}
        {collectionType === "home" && (
          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Address
            </h2>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
              <FiMapPin size={18} className="text-green-700" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900">
                  {address.label}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {address.text}
                </p>
              </div>
              <button className="text-xs font-medium text-green-700">
                Change
              </button>
            </div>
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
      </div>

      {/* Confirm Booking: sticks above the bottom bar */}
      <div className="sticky bottom-0 bg-white px-4 py-3">
        <button
          onClick={handleConfirm}
          className="h-12 w-full rounded-lg bg-green-700 text-sm font-semibold text-white"
        >
          Confirm Booking
        </button>
        <p className="mt-2 text-center text-xs text-gray-600">
          Total Amount:{" "}
          <span className="font-semibold text-gray-900">₹{test.price}</span>
        </p>
      </div>
    </div>
  );
}

export default BookingAppointment;
