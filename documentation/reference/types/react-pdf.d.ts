declare module '@react-pdf/renderer' {
  import { ComponentType, ReactElement, ReactNode } from 'react';

  interface DocumentProps {
    children?: ReactNode;
  }

  interface PageProps {
    size?: string;
    orientation?: 'portrait' | 'landscape';
    style?: any;
    children?: ReactNode;
  }

  interface ViewProps {
    style?: any;
    children?: ReactNode;
  }

  interface TextProps {
    style?: any;
    children?: ReactNode;
  }

  interface ImageProps {
    src: string;
    style?: any;
    cache?: boolean;
  }

  interface StyleSheet {
    create: <T extends { [key: string]: any }>(styles: T) => T;
  }

  interface Font {
    register: (config: {
      family: string;
      fonts: Array<{
        src: string;
        fontWeight?: number;
        fontStyle?: string;
      }>;
    }) => void;
  }

  interface PDFInstance {
    toBlob: () => Promise<Blob>;
    toBuffer: () => Promise<Buffer>;
  }

  export const Document: ComponentType<DocumentProps>;
  export const Page: ComponentType<PageProps>;
  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const Image: ComponentType<ImageProps>;
  export const StyleSheet: StyleSheet;
  export const Font: Font;
  export const PDFViewer: ComponentType<{ style?: any; children?: ReactNode }>;
  export function pdf(element: ReactElement): PDFInstance;
}

declare module '@react-pdf/renderer/lib/react-pdf.browser.js' {
  import { ComponentType } from 'react';

  interface ImageProps {
    src: string;
    style?: any;
    cache?: boolean;
  }

  export const Image: ComponentType<ImageProps>;
} 