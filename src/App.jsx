import React, { useState, useEffect } from 'react';
import ParkCard from './components/ParkCard';
import FilterBar from './components/FilterBar';
import Modal from './components/Modal';
import parksData from '../public/parkData.json';
import { parkImages } from './assets/images';

export default function App() {
  const [parks, setParks] = useState([]);
  const [filters, setFilters] = useState({ activities: [], facilities: [], region: '' });
  const [search, setSearch] = useState('');
  const [selectedPark, setSelectedPark] = useState(null);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const parksWithImages = parksData.map(park => ({
        ...park,
        image: parkImages[park.name]
      }));
      setParks(parksWithImages);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (parkName) => {
    setFavorites((prev) =>
      prev.includes(parkName) ? prev.filter((p) => p !== parkName) : [...prev, parkName]
    );
  };

  const filteredParks = parks.filter((park) => {
    const matchSearch = park.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = filters.region ? park.region === filters.region : true;
    const matchActivities = filters.activities.every((a) => park.activities.includes(a));
    return matchSearch && matchRegion && matchActivities;
  });

  const currentMonth = new Date().getMonth();
  const seasonalHighlight = (park) =>
    currentMonth === 11 && park.activities.includes('winter sports');

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto bg-[#fffeef]">
      <header className="relative overflow-hidden rounded-xl mb-8 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[#272c1a] to-[#446158] opacity-80"></div>
        <div className="relative z-10 p-6 md:p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#9fd700] animate-fadeIn">
            Manitoba Parks Explorer
          </h1>
          <p className="text-[#fffeef] text-lg animate-fadeIn delay-100">
            Discover the natural beauty of Manitoba
          </p>
        </div>
      </header>

      <FilterBar filters={filters} setFilters={setFilters} setSearch={setSearch} />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#9fd700]"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
          {filteredParks.map((park, idx) => (
            <ParkCard
              key={idx}
              park={park}
              onClick={() => setSelectedPark(park)}
              isFavorite={favorites.includes(park.name)}
              toggleFavorite={toggleFavorite}
              highlight={seasonalHighlight(park)}
            />
          ))}
        </div>
      )}

      {filteredParks.length === 0 && !isLoading && (
        <div className="text-center py-12 animate-fadeIn">
          <h3 className="text-xl text-[#446158]">No parks match your search criteria</h3>
          <button 
            onClick={() => {
              setFilters({ activities: [], facilities: [], region: '' });
              setSearch('');
            }}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#446158] to-[#272c1a] text-[#fffeef] rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
          >
            Reset Filters
          </button>
        </div>
      )}

      {selectedPark && (
        <Modal park={selectedPark} onClose={() => setSelectedPark(null)} />
      )}

      <footer className="text-center mt-10 py-6 border-t border-[#446158]/20 animate-fadeIn">
        <a
          href="https://www.gov.mb.ca/nrnd/parks/volunteer.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#446158] underline hover:text-[#272c1a] transition-colors duration-300"
        >
          Volunteer with Manitoba Parks
        </a>
        <p className="text-sm text-[#446158]/80 mt-2">
          © {new Date().getFullYear()} Manitoba Parks Explorer
        </p>
      </footer>
    </div>
  );
}