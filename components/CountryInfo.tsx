import { Country } from "../types/country";

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
      <p className="mb-2">
        <span className="font-semibold">Capital:</span>{" "}
        {country.capital?.[0] || "N/A"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Area:</span>{" "}
        {country.area !== undefined
          ? country.area.toLocaleString() + " km²"
          : "N/A"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Population:</span>{" "}
        {country.population.toLocaleString()}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Continent:</span>{" "}
        {country.continents?.[0] || "N/A"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Currency:</span>{" "}
        {country.currencies
          ? Object.values(country.currencies)
              .map((cur) => cur.name + (cur.symbol ? ` (${cur.symbol})` : ""))
              .join(", ")
          : "N/A"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Languages:</span>{" "}
        {country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Calling Code:</span>{" "}
        {country.idd && country.idd.root
          ? country.idd.root +
            (country.idd.suffixes && country.idd.suffixes.length > 0
              ? country.idd.suffixes[0]
              : "")
          : "N/A"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Country Code:</span> {country.cca3}
      </p>
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
