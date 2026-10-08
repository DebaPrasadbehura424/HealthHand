import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiShare2,
  FiMapPin,
  FiClock,
  FiPhone,
  FiNavigation,
  FiList,
} from "react-icons/fi";
import { FaStar, FaTint, FaFlask, FaPoop, FaVial } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import type { IconType } from "react-icons";
import IconBox from "../component/IconBox";
import Button from "../component/Button";
import SectionHeader from "../component/SectionHeader";
import { useAuth } from "../context/AuthProvider";
import TestRow from "../component/TextRow";

// icon + color testType se decide hota hai
const typeStyle: Record<string, { icon: IconType; color: string }> = {
  Blood: { icon: FaTint, color: "#ef4444" },
  Urine: { icon: FaFlask, color: "#f59e0b" },
  Stool: { icon: FaPoop, color: "#92400e" },
  Other: { icon: FaVial, color: "#8b5cf6" },
};

function ClinicDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const { clinics, clinicsLoading } = useAuth();

  // id state se aati hai (Dashboard), ya URL se agar route /clinic_details/:id ho
  const clinicId: string | undefined = state?.id || params.id;
  const clinic = clinics.find((c) => c._id === clinicId);

  const handleCall = () => {
    if (clinic?.phone) window.location.href = `tel:${clinic.phone}`;
  };

  const handleDirections = () => {
    if (!clinic) return;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lng}`,
      "_blank",
    );
  };

  const handleViewTests = () => {
    document
      .getElementById("available-tests")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const actions = [
    { label: "Call", icon: FiPhone, onClick: handleCall },
    { label: "Directions", icon: FiNavigation, onClick: handleDirections },
    { label: "View Tests", icon: FiList, onClick: handleViewTests },
  ];

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

      {clinicsLoading && (
        <p className="py-20 text-center text-sm text-gray-400">
          Loading clinic...
        </p>
      )}

      {!clinicsLoading && !clinic && (
        <p className="py-20 text-center text-sm text-red-500">
          Clinic not found
        </p>
      )}

      {!clinicsLoading && clinic && (
        <>
          <div className="space-y-6 px-4 pb-4">
            {/* Image with Verified badge */}
            <div className="relative">
              <img
                src={clinic.image}
                alt={clinic.name}
                className="h-40 w-full rounded-2xl object-cover"
              />
              <span
                className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium text-white ${
                  clinic.isVerified ? "bg-green-700" : "bg-gray-500"
                }`}
              >
                <MdOutlineVerified size={13} />
                {clinic.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>

            {/* Name, rating, address, timing */}
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {clinic.name}
                </h2>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                  {clinic.type}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <FaStar className="text-orange-400" size={13} />
                  <span className="font-semibold text-gray-900">
                    {clinic.rating}
                  </span>
                  ({clinic.reviewsCount} reviews)
                </span>
              </div>

              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <FiMapPin size={13} />
                {clinic.address}
              </p>

              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <FiClock size={13} />
                {clinic.openTime} - {clinic.closeTime}
              </p>

              <p className="text-xs text-gray-500">
                {clinic.homeCollection
                  ? "Home collection available"
                  : "No home collection"}
              </p>
            </section>

            {/* Call / Directions / View Tests */}
            <section className="grid grid-cols-3 gap-2">
              {actions.map((a) => (
                <button
                  key={a.label}
                  onClick={a.onClick}
                  className="flex flex-col items-center gap-2"
                >
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
            <section id="available-tests">
              <SectionHeader
                title="Available Tests"
                onSeeAll={() => navigate("/search_test")}
              />
              <div className="space-y-2">
                {clinic.tests.map((t) => {
                  const style = typeStyle[t.testType] || typeStyle.Other;
                  return (
                    <TestRow
                      key={t._id}
                      icon={style.icon}
                      color={style.color}
                      title={t.name}
                      price={t.price}
                      onClick={() => navigate(`/test_details/${t._id}`)}
                    />
                  );
                })}

                {clinic.tests.length === 0 && (
                  <p className="py-4 text-center text-xs text-gray-400">
                    No tests added yet
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Book Appointment: pehle test chuno */}
          <div className="sticky bottom-0 bg-white px-4 py-3">
            <Button
              label="Book Appointment"
              color="#15803d"
              width="100%"
              height={48}
              onClick={() => {
                const first = clinic.tests[0];
                if (first) navigate(`/booking_apponitment/${first._id}`);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ClinicDetails;
