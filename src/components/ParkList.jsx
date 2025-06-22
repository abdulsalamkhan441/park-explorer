import React, { useEffect, useState } from "react";
import { fetchParkData } from "../utils/fetchParkData";

const ParksList = () => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    fetchParkData().then(setParks).catch(console.error);
  }, []);

  return (
    <div>
      {parks.map((park, i) => (
        <div key={i} className="border p-4 my-2">
          <h2 className="text-lg font-bold">{park.name}</h2>
          <img src={park.image} alt={park.name} className="w-full max-w-md mb-2" />
          <p><strong>Region:</strong> {park.region}</p>
          <p>{park.description}</p>
          <p><strong>Activities:</strong> {park.activities.join(", ")}</p>
          <p><strong>Facilities:</strong> {park.facilities.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default ParksList;