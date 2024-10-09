declare module 'react-resizable-panels' {
  import * as React from 'react';

  export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultSize?: number;
    order?: number;
    minSize?: number;
    maxSize?: number;
  }

  export interface PanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'horizontal' | 'vertical';
    onLayout?: (sizes: number[]) => void;
  }

  export interface PanelResizeHandleProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
  }

  export const Panel: React.FC<PanelProps>;
  export const PanelGroup: React.FC<PanelGroupProps>;
  export const PanelResizeHandle: React.FC<PanelResizeHandleProps>;
}