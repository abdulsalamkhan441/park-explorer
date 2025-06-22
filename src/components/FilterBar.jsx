import React from 'react';

const activitiesList = ['camping', 'hiking', 'swimming', 'winter sports'];
const facilitiesList = ['cabins', 'RV sites', 'pet-friendly'];
const regionsList = ['Eastern', 'Western', 'Northern Manitoba'];

export default function FilterBar({ filters, setFilters, setSearch }) {
  const toggleValue = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <div className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Search parks..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md shadow-sm"
      />

      <div className="flex flex-wrap gap-2">
        {activitiesList.map((activity) => (
          <button
            key={activity}
            className={`px-3 py-1 rounded-full border ${
              filters.activities.includes(activity)
                ? 'bg-[#9fd700] text-[#272c1a]'
                : 'bg-white text-[#446158]'
            }`}
            onClick={() => toggleValue('activities', activity)}
          >
            {activity}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {facilitiesList.map((facility) => (
          <button
            key={facility}
            className={`px-3 py-1 rounded-full border ${
              filters.facilities?.includes(facility)
                ? 'bg-[#9fd700] text-[#272c1a]'
                : 'bg-white text-[#446158]'
            }`}
            onClick={() => toggleValue('facilities', facility)}
          >
            {facility}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {regionsList.map((region) => (
          <button
            key={region}
            className={`px-3 py-1 rounded-full border ${
              filters.region === region
                ? 'bg-[#9fd700] text-[#272c1a]'
                : 'bg-white text-[#446158]'
            }`}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                region: prev.region === region ? '' : region,
              }))
            }
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
