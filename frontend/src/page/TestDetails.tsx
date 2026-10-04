import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShare2, FiCheck, FiChevronRight } from "react-icons/fi";
import { FaHeartbeat, FaUserShield, FaClinicMedical } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import IconBox from "../component/IconBox";
import SectionHeader from "../component/SectionHeader";
import Button from "../component/Button";

const test = {
  title: "Complete Blood Count (CBC)",
  category: "Blood",
  detail: "8 parameters",
  price: 299,
  image: "https://picsum.photos/seed/cbc/600/300", // dummy, replace later
  included: [
    "Hemoglobin (Hb)",
    "RBC, WBC, Platelets",
    "Hematocrit (HCT)",
    "And more...",
  ],
};

const reasons = [
  { label: "Early detection", icon: FaUserShield, color: "#16a34a" },
  { label: "General health check", icon: FaHeartbeat, color: "#16a34a" },
  { label: "Verified labs", icon: MdOutlineVerified, color: "#16a34a" },
];

const clinic = {
  name: "CityCare Diagnostic Centre",
  distance: "1.2 km",
};

function TestDetails() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header: back + title + share */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-800">
            <FiArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Test Details</h1>
        </div>
        <button className="text-gray-700">
          <FiShare2 size={20} />
        </button>
      </div>

      <div className="space-y-6 px-4 pb-4">
        {/* Image */}
        <img
          src={test.image}
          alt={test.title}
          className="h-40 w-full rounded-2xl object-cover"
        />

        {/* Title, category, price */}
        <section>
          <h2 className="text-xl font-bold text-gray-900">{test.title}</h2>
          <p className="mt-1 text-xs text-gray-500">
            <span className="text-red-500">{test.category}</span> •{" "}
            {test.detail}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-2xl font-bold text-green-700">₹{test.price}</p>
            <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-700">
              Popular
            </span>
          </div>
        </section>

        {/* What's Included */}
        <section>
          <SectionHeader title="What's Included" />
          <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            {test.included.map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <FiCheck className="text-green-600" size={14} />
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* Why Choose This Test */}
        <section>
          <SectionHeader title="Why Choose This Test" />
          <div className="grid grid-cols-3 gap-2">
            {reasons.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2">
                <IconBox
                  icon={r.icon}
                  color={r.color}
                  bgColor={r.color}
                  width={64}
                  height={64}
                  size={28}
                />
                <span className="text-center text-[11px] font-medium text-gray-700">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Select Clinic */}
        <section>
          <SectionHeader title="Select Clinic" />
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <IconBox
              icon={FaClinicMedical}
              color="#16a34a"
              bgColor="#16a34a"
              width={40}
              height={40}
              size={18}
              rounded="rounded-lg"
            />
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
      </div>

      <div className="sticky bottom-0 bg-white px-4 py-3">
        <Button
          label="Book Now"
          color="#15803d"
          width="100%"
          height={48}
          onClick={() => navigate("/booking")}
        />
      </div>
    </div>
  );
}

export default TestDetails;
