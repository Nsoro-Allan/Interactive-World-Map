export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca3: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  continents: string[];
  area?: number;
  currencies?: {
    [code: string]: {
      name: string;
      symbol?: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}
