import React, { useEffect } from 'react';

export default function Modal({ park, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className="bg-white p-6 rounded-xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto animate-fadeInUp shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-[#446158] hover:text-[#9fd700] transition-colors duration-300"
          aria-label="Close modal"
        >
          ✕
        </button>
        
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-[#272c1a] mb-1">{park.name}</h2>
          <p className="text-sm text-[#446158] font-medium">{park.region}</p>
        </div>
        
        <div className="relative rounded-lg overflow-hidden mb-4 group">
          <img
            src={park.image}
            alt={park.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#272c1a]/70 to-transparent"></div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#272c1a] mb-2">About This Park</h3>
          <p className="text-[#446158] leading-relaxed">{park.description}</p>
        </div>
        
        {park.activities && park.activities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#272c1a] mb-2">Activities</h3>
            <div className="flex flex-wrap gap-2">
              {park.activities.map((activity, idx) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-[#446158]/10 to-[#9fd700]/10 text-[#272c1a] border border-[#446158]/20"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.name + ' Manitoba')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center font-medium bg-gradient-to-r from-[#446158] to-[#272c1a] text-[#fffeef] py-3 rounded-lg mt-4 hover:opacity-90 transition-opacity duration-300 shadow-md"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
}