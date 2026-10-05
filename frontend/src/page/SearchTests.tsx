import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { FaTint, FaFlask, FaPoop, FaVial } from "react-icons/fa";
import type { IconType } from "react-icons";

import SectionHeader from "../component/SectionHeader";
import FilterBox from "../component/FilterBox";
import ItemBox from "../component/ItemBox";
import api from "../api/api";

interface Test {
  _id: string;
  name: string;
  testType: "Blood" | "Urine" | "Stool" | "Other";
  price: number;
  parametersCount: number;
  clinic: {
    _id: string;
    name: string;
    type: "Clinic" | "Hospital";
    isVerified: boolean;
  } | null;
}
const filters = ["All", "Blood", "Urine", "Stool", "Other"];

// icon + color are decided by testType
const typeStyle: Record<Test["testType"], { icon: IconType; color: string }> = {
  Blood: { icon: FaTint, color: "#ef4444" }, // red
  Urine: { icon: FaFlask, color: "#f59e0b" }, // yellow
  Stool: { icon: FaPoop, color: "#92400e" }, // brown
  Other: { icon: FaVial, color: "#8b5cf6" }, // purple
};

function SearchTests() {
  const navigate = useNavigate();

  const [tests, setTests] = useState<Test[]>([]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // get all tests once
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await api.get("/tests/all");
        setTests(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load tests");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const filteredTests = tests.filter((t) => {
    const matchFilter = activeFilter === "All" || t.testType === activeFilter;
    const matchQuery = t.name.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div>
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-gray-800">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Search Tests</h1>
      </div>

      <div className="space-y-6 px-4 pb-4">
        {/* Input field */}
        <section className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3">
          <FiSearch size={18} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tests (e.g. sugar, CBC, urine...)"
            className="w-full bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
        </section>

        {/* Filters */}
        <section className="flex gap-2">
          {filters.map((f) => (
            <FilterBox
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
        </section>

        {/* All Tests */}
        <section>
          <SectionHeader title="All Tests" onSeeAll={() => {}} />
          <div className="space-y-3">
            {loading && (
              <p className="py-6 text-center text-xs text-gray-400">
                Loading tests...
              </p>
            )}

            {error && (
              <p className="py-6 text-center text-xs text-red-500">{error}</p>
            )}

            {!loading &&
              !error &&
              filteredTests.map((t) => (
                <ItemBox
                  key={t._id}
                  icon={typeStyle[t.testType].icon}
                  color={typeStyle[t.testType].color}
                  title={t.name}
                  subtitle={`${t.testType} • ${t.parametersCount} parameters`}
                  price={t.price}
                  clinicName={t.clinic?.name}
                  clinicType={t.clinic?.type}
                  isVerified={t.clinic?.isVerified}
                  onClick={() => navigate(`/test_details/${t._id}`)}
                />
              ))}

            {!loading && !error && filteredTests.length === 0 && (
              <p className="py-6 text-center text-xs text-gray-400">
                No tests found
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SearchTests;
