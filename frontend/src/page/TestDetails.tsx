import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiShare2, FiCheck, FiChevronRight } from "react-icons/fi";
import {
  FaHeartbeat,
  FaUserShield,
  FaClinicMedical,
  FaTint,
  FaFlask,
  FaPoop,
  FaVial,
} from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import type { IconType } from "react-icons";
import IconBox from "../component/IconBox";
import SectionHeader from "../component/SectionHeader";
import Button from "../component/Button";
import api from "../api/api";

interface Test {
  _id: string;
  name: string;
  testType: "Blood" | "Urine" | "Stool" | "Other";
  description: string;
  price: number;
  parametersCount: number;
  included: string[];
  isPopular: boolean;
  clinic: {
    _id: string;
    name: string;
    type: "Clinic" | "Hospital";
    address: string;
    isVerified: boolean;
  } | null;
}

const reasons = [
  { label: "Early detection", icon: FaUserShield, color: "#16a34a" },
  { label: "General health check", icon: FaHeartbeat, color: "#16a34a" },
  { label: "Verified labs", icon: MdOutlineVerified, color: "#16a34a" },
];

// color + icon decided by testType
const typeStyle: Record<Test["testType"], { icon: IconType; color: string }> = {
  Blood: { icon: FaTint, color: "#ef4444" },
  Urine: { icon: FaFlask, color: "#f59e0b" },
  Stool: { icon: FaPoop, color: "#92400e" },
  Other: { icon: FaVial, color: "#8b5cf6" },
};

function TestDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // from /test_details/:id

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        setError("");

        // get all tests, then filter by id
        const { data } = await api.get<Test[]>("/tests/all");
        const found = data.find((t) => t._id === id);

        if (!found) {
          setError("Test not found");
          return;
        }
        setTest(found);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load test");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

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

      {/* Loading */}
      {loading && (
        <p className="py-20 text-center text-sm text-gray-400">
          Loading test details...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="py-20 text-center text-sm text-red-500">{error}</p>
      )}

      {/* Details: only after loading */}
      {!loading && !error && test && (
        <>
          <div className="space-y-6 px-4 pb-4">
            {/* Title, type, price */}
            <section>
              <h2 className="text-xl font-bold text-gray-900">{test.name}</h2>
              <p className="mt-1 text-xs text-gray-500">
                <span style={{ color: typeStyle[test.testType].color }}>
                  {test.testType}
                </span>{" "}
                • {test.parametersCount} parameters
              </p>
              {test.description && (
                <p className="mt-2 text-xs text-gray-600">{test.description}</p>
              )}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl font-bold text-green-700">
                  ₹{test.price}
                </p>
                {test.isPopular && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-700">
                    Popular
                  </span>
                )}
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
                {test.included.length === 0 && (
                  <p className="text-xs text-gray-400">No details added</p>
                )}
              </div>
            </section>

            {/* Why Choose This Test */}
            <section>
              <SectionHeader title="Why Choose This Test" />
              <div className="grid grid-cols-3 gap-2">
                {reasons.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col items-center gap-2"
                  >
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
            {test.clinic && (
              <section>
                <SectionHeader title="Select Clinic" />
                <div
                  onClick={() =>
                    navigate("/clinic_details", {
                      state: { id: test.clinic!._id },
                    })
                  }
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                >
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
                      {test.clinic.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      {test.clinic.address}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        {test.clinic.type}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${
                          test.clinic.isVerified ? "bg-red-500" : "bg-green-600"
                        }`}
                      >
                        {test.clinic.isVerified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                  </div>
                  <FiChevronRight className="text-gray-400" />
                </div>
              </section>
            )}
          </div>

          <div className="sticky bottom-0 bg-white px-4 py-3">
            <Button
              label="Book Now"
              color="#15803d"
              width="100%"
              height={48}
              onClick={() =>
                navigate("/booking_apponitment", {
                  state: { testId: test._id },
                })
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TestDetails;
