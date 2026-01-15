# Interactive World Map

An interactive world map application built with Next.js that allows users to explore countries, view detailed information, and export country data as PDF reports.

## Features

- **Interactive Map**: Click on any country to view detailed information
- **Real-time Data**: Fetches up-to-date country information from REST Countries API
- **Country Details**: View capital, population, area, currencies, languages, and more
- **PDF Export**: Download country information as a formatted PDF document
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Dark Theme**: Modern dark-themed UI with smooth interactions
- **Hover Previews**: Quick country information on hover with flag display

## Tech Stack

- **Framework**: Next.js 13 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Map Library**: Datamaps
- **PDF Generation**: jsPDF
- **API**: REST Countries API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nsoro-Allan/Interactive-World-Map.git
cd Interactive-World-Map
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── CountryInfo.tsx    # Country information panel
│   ├── WorldMap.tsx       # Interactive map component
│   └── ui/                # shadcn/ui components
├── data/                  # Static data
│   └── mapData.js         # Map configuration data
├── lib/                   # Utility functions
│   ├── pdfGenerator.ts    # PDF export functionality
│   └── utils.ts           # Helper utilities
├── types/                 # TypeScript type definitions
│   └── country.ts         # Country data types
└── hooks/                 # Custom React hooks
    └── use-toast.ts       # Toast notifications
```

## Usage

1. **Explore the Map**: The world map is displayed on the main page
2. **Hover Over Countries**: See quick information in a tooltip
3. **Click a Country**: View detailed information in the side panel
4. **Export Data**: Click the "Export PDF" button to download country information

## API Reference

This application uses the [REST Countries API](https://restcountries.com/) to fetch country data:

- Endpoint: `https://restcountries.com/v3.1/all`
- Fields: name, cca3, population, flags, capital, continents, area, currencies, languages, idd

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [REST Countries API](https://restcountries.com/) for country data
- [Datamaps](https://datamaps.github.io/) for the interactive map
- [shadcn/ui](https://ui.shadcn.com/) for UI components
