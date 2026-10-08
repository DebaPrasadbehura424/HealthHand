import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiShare2,
  FiMapPin,
  FiClock,
  FiPhone,
  FiNavigation,
  FiList,
} from "react-icons/fi";
import { FaStar, FaTint, FaVial } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import IconBox from "../component/IconBox";
import Button from "../component/Button";
import SectionHeader from "../component/SectionHeader";
import TestRow from "../component/TextRow";

const clinic = {
  name: "CityCare Diagnostic Centre",
  rating: 4.6,
  reviews: 124,
  distance: "1.2 km",
  address: "Plot No. 45, Phase 2, Patia, Bhubaneswar",
  isOpen: true,
  timing: "7:00 AM - 8:00 PM",
  image: "https://picsum.photos/seed/clinicdetail/600/300", // dummy, replace later
};

const actions = [
  { label: "Call", icon: FiPhone },
  { label: "Directions", icon: FiNavigation },
  { label: "View Tests", icon: FiList },
];

const availableTests = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    price: 299,
    icon: FaTint,
    color: "#ef4444",
  },
  {
    id: 2,
    title: "Blood Sugar (FBS & PP)",
    price: 199,
    icon: FaTint,
    color: "#ef4444",
  },
  { id: 3, title: "Lipid Profile", price: 499, icon: FaTint, color: "#ef4444" },
  {
    id: 4,
    title: "Liver Function Test (LFT)",
    price: 699,
    icon: FaVial,
    color: "#8b5cf6",
  },
];

function ClinicDetails() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header: back + title + share */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-800">
            <FiArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Clinic Details</h1>
        </div>
        <button className="text-gray-700">
          <FiShare2 size={20} />
        </button>
      </div>

      <div className="space-y-6 px-4 pb-4">
        {/* Image with Verified badge */}
        <div className="relative">
          <img
            src={clinic.image}
            alt={clinic.name}
            className="h-40 w-full rounded-2xl object-cover"
          />
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-700 px-3 py-1 text-[11px] font-medium text-white">
            <MdOutlineVerified size={13} />
            Verified
          </span>
        </div>

        {/* Name, rating, address, timing */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">{clinic.name}</h2>

          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <FaStar className="text-orange-400" size={13} />
              <span className="font-semibold text-gray-900">
                {clinic.rating}
              </span>
              ({clinic.reviews} reviews)
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin size={13} />
              {clinic.distance}
            </span>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            <FiMapPin size={13} />
            {clinic.address}
          </p>

          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            <FiClock size={13} />
            <span
              className={
                clinic.isOpen
                  ? "font-medium text-green-700"
                  : "font-medium text-red-500"
              }
            >
              {clinic.isOpen ? "Open" : "Closed"}
            </span>
            • {clinic.timing}
          </p>
        </section>

        {/* Call / Directions / View Tests */}
        <section className="grid grid-cols-3 gap-2">
          {actions.map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-2">
              <IconBox
                icon={a.icon}
                color="#16a34a"
                bgColor="#16a34a"
                width={56}
                height={56}
                size={22}
              />
              <span className="text-[11px] font-medium text-gray-700">
                {a.label}
              </span>
            </button>
          ))}
        </section>

        {/* Available Tests */}
        <section>
          <SectionHeader
            title="Available Tests"
            onSeeAll={() => navigate("/search")}
          />
          <div className="space-y-2">
            {availableTests.map((t) => (
              <TestRow
                key={t.id}
                icon={t.icon}
                color={t.color}
                title={t.title}
                price={t.price}
                onClick={() => navigate(`/test-details/${t.id}`)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 bg-white px-4 py-3">
        <Button
          label="Book Appointment"
          color="#15803d"
          width="100%"
          height={48}
          onClick={() => navigate("/booking")}
        />
      </div>
    </div>
  );
}

export default ClinicDetails;
