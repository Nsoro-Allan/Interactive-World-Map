declare namespace Datamap {
  interface DatamapOptions {
    element: HTMLElement;
    responsive?: boolean;
    fills?: {
      [key: string]: string;
    };
    geographyConfig?: {
      highlightFillColor?: string;
      highlightBorderColor?: string;
      highlightBorderWidth?: number;
      popupTemplate?: (geography: any, data: any) => string;
    };
    done?: (datamap: any) => void;
  }

  interface Datamap {
    new (options: DatamapOptions): any;
  }
}

interface Window {
  Datamap: Datamap.Datamap;
}