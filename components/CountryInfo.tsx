import { Country } from "../types/country";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { generateCountryPDF } from "../lib/pdfGenerator";

interface CountryInfoProps {
  country: Country | null;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ country }) => {
  const handleExportPDF = async () => {
    if (country) {
      await generateCountryPDF(country);
    }
  };

  if (!country) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <p className="text-lg">Select a country to view its information</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{country.name.common}</h2>
        <Button
          onClick={handleExportPDF}
          variant="outline"
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
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
