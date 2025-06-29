import { Country } from '../types/country';

interface CountryInfoProps {
  country: Country | null;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ country }) => {
  if (!country) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <p className="text-lg">Select a country to view its information</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
      <p className="mb-2"><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
      <p className="mb-2"><span className="font-semibold">Area:</span> {country.area !== undefined ? country.area.toLocaleString() + ' km²' : 'N/A'}</p>
      <p className="mb-2"><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
      <p className="mb-2"><span className="font-semibold">Region:</span> {country.region}</p>
      {country.flags && (
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="mt-4 w-full max-w-[200px] h-auto rounded-md shadow-md"
        />
      )}
    </div>
  );
};

export default CountryInfo;