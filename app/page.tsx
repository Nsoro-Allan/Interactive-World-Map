"use client";

import { useState } from 'react';
import WorldMap from '../components/WorldMap';
import CountryInfo from '../components/CountryInfo';
import { Country } from '../types/country';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-900">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center text-white">
          Interactive World Map
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <WorldMap onCountrySelect={handleCountrySelect} />
          </div>
          <div className="w-full lg:w-1/4">
            <CountryInfo country={selectedCountry} />
          </div>
        </div>
      </div>
    </main>
  );
}