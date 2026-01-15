import { jsPDF } from "jspdf";
import { Country } from "../types/country";

export const generateCountryPDF = async (country: Country) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Add background color
  pdf.setFillColor(249, 250, 251);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  // Add header background
  pdf.setFillColor(37, 99, 235);
  pdf.rect(0, 0, pageWidth, 50, "F");

  // Add title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont("helvetica", "bold");
  pdf.text(country.name.common, pageWidth / 2, 25, { align: "center" });

  // Add subtitle
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(country.name.official || "", pageWidth / 2, 35, { align: "center" });

  let yPosition = 60;

  // Add flag if available
  if (country.flags && country.flags.png) {
    try {
      const flagImg = await loadImage(country.flags.png);
      const flagWidth = 60;
      const flagHeight = 40;
      const flagX = (pageWidth - flagWidth) / 2;
      
      pdf.addImage(flagImg, "PNG", flagX, yPosition, flagWidth, flagHeight);
      yPosition += flagHeight + 15;
    } catch (error) {
      console.error("Error loading flag image:", error);
      yPosition += 10;
    }
  }

  // Add decorative line
  pdf.setDrawColor(37, 99, 235);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  // Section: Basic Information
  pdf.setTextColor(37, 99, 235);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Basic Information", margin, yPosition);
  yPosition += 10;

  pdf.setTextColor(50, 50, 50);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");

  const basicInfo = [
    { label: "Capital", value: country.capital?.[0] || "N/A" },
    { label: "Continent", value: country.continents?.[0] || "N/A" },
    { label: "Country Code", value: country.cca3 },
    {
      label: "Calling Code",
      value:
        country.idd && country.idd.root
          ? country.idd.root +
            (country.idd.suffixes && country.idd.suffixes.length > 0
              ? country.idd.suffixes[0]
              : "")
          : "N/A",
    },
  ];

  basicInfo.forEach((info) => {
    pdf.setFont("helvetica", "bold");
    pdf.text(info.label + ":", margin + 5, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(info.value, margin + 50, yPosition);
    yPosition += 8;
  });

  yPosition += 5;

  // Section: Demographics & Geography
  pdf.setTextColor(37, 99, 235);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Demographics & Geography", margin, yPosition);
  yPosition += 10;

  pdf.setTextColor(50, 50, 50);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");

  const demoInfo = [
    { label: "Population", value: country.population.toLocaleString() },
    {
      label: "Area",
      value:
        country.area !== undefined
          ? country.area.toLocaleString() + " km²"
          : "N/A",
    },
    {
      label: "Population Density",
      value:
        country.area && country.area > 0
          ? Math.round(country.population / country.area).toLocaleString() +
            " per km²"
          : "N/A",
    },
  ];

  demoInfo.forEach((info) => {
    pdf.setFont("helvetica", "bold");
    pdf.text(info.label + ":", margin + 5, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(info.value, margin + 50, yPosition);
    yPosition += 8;
  });

  yPosition += 5;

  // Section: Currency & Languages
  pdf.setTextColor(37, 99, 235);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Currency & Languages", margin, yPosition);
  yPosition += 10;

  pdf.setTextColor(50, 50, 50);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");

  // Currency
  pdf.setFont("helvetica", "bold");
  pdf.text("Currency:", margin + 5, yPosition);
  pdf.setFont("helvetica", "normal");
  const currencyText = country.currencies
    ? Object.values(country.currencies)
        .map((cur) => cur.name + (cur.symbol ? ` (${cur.symbol})` : ""))
        .join(", ")
    : "N/A";
  
  const currencyLines = pdf.splitTextToSize(currencyText, contentWidth - 50);
  pdf.text(currencyLines, margin + 50, yPosition);
  yPosition += 8 * currencyLines.length;

  // Languages
  pdf.setFont("helvetica", "bold");
  pdf.text("Languages:", margin + 5, yPosition);
  pdf.setFont("helvetica", "normal");
  const languagesText = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  
  const languageLines = pdf.splitTextToSize(languagesText, contentWidth - 50);
  pdf.text(languageLines, margin + 50, yPosition);
  yPosition += 8 * languageLines.length;

  // Add footer
  const footerY = pageHeight - 15;
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.3);
  pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "italic");
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()} | Interactive World Map`,
    pageWidth / 2,
    footerY,
    { align: "center" }
  );

  // Save the PDF
  pdf.save(`${country.name.common.replace(/\s+/g, "_")}_Country_Info.pdf`);
};

// Helper function to load images
const loadImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
};
