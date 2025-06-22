import React from 'react';

export default function ParkCard({ park, onClick, isFavorite, toggleFavorite, highlight }) {
  return (
    <div
      className={`park-card relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${highlight ? 'ring-4 ring-[#9fd700] animate-pulse' : ''}`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={park.image}
          alt={park.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#272c1a]/80 to-transparent"></div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(park.name);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 rounded-full p-2 transition-all duration-300 ${isFavorite ? 
            'bg-[#fffeef] text-[#9fd700] shadow-md' : 
            'bg-[#272c1a]/70 text-[#fffeef] hover:bg-[#272c1a]'}`}
        >
          {isFavorite ? (
            <span className="text-xl animate-bounce">★</span>
          ) : (
            <span className="text-xl hover:scale-110 transition-transform">☆</span>
          )}
        </button>
      </div>
      
      <div className="p-4 bg-[#fffeef]">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-[#272c1a]">{park.name}</h2>
          <span className="text-sm text-[#446158] bg-[#446158]/10 px-2 py-1 rounded-full">
            {park.region}
          </span>
        </div>
        
        <p className="text-sm text-[#446158] mt-2 line-clamp-2">{park.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {park.activities.slice(0, 4).map((activity, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-[#446158]/10 to-[#9fd700]/10 text-[#272c1a] border border-[#446158]/20"
            >
              {activity}
            </span>
          ))}
          {park.activities.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-full bg-[#272c1a]/5 text-[#272c1a]">
              +{park.activities.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}