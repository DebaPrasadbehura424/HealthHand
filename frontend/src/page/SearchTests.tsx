import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { FaTint, FaFlask, FaPoop, FaVial } from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";

import SectionHeader from "../component/SectionHeader";
import FilterBox from "../component/FilterBox";
import ItemBox from "../component/ItemBox";

const filters = ["All", "Blood", "Urine", "Stool", "Other"];

const popularSearches = [
  "Complete Blood Count",
  "Vitamin D",
  "Lipid Profile",
  "Thyroid Profile",
  "Sugar (FBS)",
  "Urine Routine",
];

const tests = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    category: "Blood",
    detail: "8 parameters",
    price: 299,
    icon: FaTint,
    color: "#ef4444",
  },
  {
    id: 2,
    title: "Blood Sugar (FBS & PP)",
    category: "Blood",
    detail: "2 tests",
    price: 199,
    icon: FaTint,
    color: "#ef4444",
  },
  {
    id: 3,
    title: "Lipid Profile",
    category: "Blood",
    detail: "5 parameters",
    price: 499,
    icon: FaTint,
    color: "#ef4444",
  },
  {
    id: 4,
    title: "Liver Function Test (LFT)",
    category: "Blood",
    detail: "10 parameters",
    price: 699,
    icon: FaVial,
    color: "#8b5cf6",
  },
  {
    id: 5,
    title: "Thyroid Profile",
    category: "Blood",
    detail: "3 parameters",
    price: 599,
    icon: GiButterfly,
    color: "#3b82f6",
  },
  {
    id: 6,
    title: "Urine Routine",
    category: "Urine",
    detail: "12 parameters",
    price: 249,
    icon: FaFlask,
    color: "#f59e0b",
  },
  {
    id: 7,
    title: "Stool Routine",
    category: "Stool",
    detail: "6 parameters",
    price: 299,
    icon: FaPoop,
    color: "#92400e",
  },
];

function SearchTests() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTests = tests.filter((t) => {
    const matchFilter = activeFilter === "All" || t.category === activeFilter;
    const matchQuery = t.title.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div>
      {/* Header: back icon + title */}
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

        {/* Popular Searches */}
        <section>
          <SectionHeader title="Popular Searches" />
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-gray-600"
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* All Tests */}
        <section>
          <SectionHeader title="All Tests" onSeeAll={() => {}} />
          <div className="space-y-3">
            {filteredTests.map((t) => (
              <ItemBox
                key={t.id}
                icon={t.icon}
                color={t.color}
                title={t.title}
                subtitle={`${t.category} • ${t.detail}`}
                price={t.price}
              />
            ))}

            {filteredTests.length === 0 && (
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
