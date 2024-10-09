"use client";

import { useEffect, useRef, useState } from 'react';
import { Country } from '../types/country';
import { simplemaps_worldmap_mapdata } from '../data/mapData';

interface WorldMapProps {
  onCountrySelect: (country: Country) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (mapRef.current && countries.length > 0 && typeof window.Datamap === 'function') {
      const map = new window.Datamap({
        element: mapRef.current,
        responsive: true,
        fills: {
          defaultFill: '#1f2937', // Dark blue-gray
          highlightFill: '#3b82f6' // Bright blue for highlighting
        },
        geographyConfig: {
          highlightFillColor: '#3b82f6',
          highlightBorderColor: '#60a5fa',
          highlightBorderWidth: 1,
          popupTemplate: (geography: any, data: any) => {
            const country = countries.find(c => c.cca3 === geography.id);
            return `<div class="hoverinfo">
              <strong>${geography.properties.name}</strong>
              ${country ? `<br/>Population: ${country.population.toLocaleString()}` : ''}
            </div>`;
          }
        },
        done: (datamap: any) => {
          datamap.svg.selectAll('.datamaps-subunit').on('click', (geography: any) => {
            const country = countries.find(c => c.cca3 === geography.id);
            if (country) {
              onCountrySelect(country);
            }
          });
        }
      });

      window.addEventListener('resize', function() {
        map.resize();
      });
    }
  }, [countries, onCountrySelect]);

  return (
    <div className="world-map w-full h-[70vh] md:h-[80vh] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default WorldMap;