// API Configuration
export interface AirtableConfig {
  baseUrl: string;
  baseId: string;
  apiKey: string;
}

// Generic Airtable Response
export interface AirtableResponse<T> {
  records: AirtableSingleRecord<T>[];
  offset?: string;
}

// Activity Types
export interface ActivityFields {
  Activiteit: string;
  Functie: string;
  Icon?: Array<{ url: string }>;
  Instructies: string;
  'Instructies A2'?: string;
  'Instructies A1'?: string;
  'Instructies Engels'?: string;
  'Instructies Arabisch'?: string;
  Video?: string;
  Werkblad?: string;
  Status?: 'Concept' | 'Live';
  Projecten: string[];
}

export interface Activity {
  id: string;
  fields: ActivityFields;
}

// Component Props
export interface CardProps {
  title: string;
  subtitle: string;
  icon?: string; // Changed from Array<{ url: string }> to string
  link: string;
}

// Flowchart Types
export interface FlowchartFields {
  'Question-or-endpoint': string;
  type: string;
  'if-yes'?: string[];
  'if-no'?: string[];
  Activities?: string[];
}

export interface FlowchartNode {
  type: 'intro' | 'question' | 'endpoint';
  question: string;
  next?: string; // Optional for intro nodes
  yes: string | null;
  no: string | null;
  endpoint: boolean;
  activities: Array<{
    id: string;
    title: string;
    description: string;
    url: string;
  }>;
}

export interface ProcessedFlowchart {
  [key: string]: FlowchartNode;
}

// API Error Types
export interface AirtableErrorResponse {
  error: {
    type: string;
    message: string;
  };
}

// Cache Types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Project Types
export interface ProjectFields {
  Project: string;
  'Grote vraag': string;
  Beschrijving: string;
  Afbeelding?: Array<{ url: string }>;
  Niveau: string[];
  Leerjaar: string[];
  'Thema-lookup': string[];
  'Naam-lookup': string[];
  Tijdsduur?: string;
  'Leerdoelen generated': string;
  'Leerdoelen handmatig': string;
  'Productkaarten': string[];  // Linked record field
  'Activiteiten': string[];    // Linked record field
  'Lesbrief'?: string;
  'P-INTRO'?: string;
  'P-TERUGBLIK'?: string;
  Created?: string;
  Notities?: string;
  'INTRO-presentatie'?: string;
  'INTRO-instructies'?: string;
  'ONDERZOEK-presentatie'?: string;
  'ONDERZOEK-instructies'?: string;
  'BEDENK-presentatie'?: string;
  'BEDENK-instructies'?: string;
  'MAAK-presentatie'?: string;
  'MAAK-instructies'?: string;
  'TERUGBLIK-presentatie'?: string;
  'TERUGBLIK-instructies'?: string;
  Media?: string[];
  Rubrics?: string[];
  Doelen?: string[];
}

export interface Project {
  id: string;
  fields: ProjectFields;
}

// Add these new types
export interface ThemaFields {
  Name: string; // or whatever the actual field name is in Airtable
}

export interface AuteurFields {
  Name: string; // or whatever the actual field name is in Airtable
}

// Add this new interface for single record responses
export interface AirtableSingleRecord<T> {
  id: string;
  fields: T;
  createdTime?: string;
}

export interface Thumbnail {
  url: string;
  thumbnails?: {
    small?: { url: string; };
    large?: { url: string; };
    full?: { url: string; };
  };
}

export interface ProductkaartFields {
  Titel: string;
  Beschrijving: string;
  Thumbnail?: Array<Thumbnail>;
  Criteria?: string;
  'Tools-lookup'?: string[];
  'Voorbeelden-url'?: string[];
  Status?: 'Concept' | 'Live';
}

export interface Productkaart {
  id: string;
  fields: ProductkaartFields;
}

// Need to add RubricsFields interface
export interface Rubric {
  id: string;
  fields: {
    Vaardigheid: string;
    Categorie?: boolean;
    'Onderdeel van'?: string[];
    'Alle projecten'?: boolean;
    Projecten?: string[];
    Uitstekend?: string;
    Goed?: string;
    Redelijk?: string;
    Onvoldoende?: string;
  };
}

export interface MediaFields {
  Titel: string;
  Beschrijving?: string;
  URL?: string;
  Status?: 'Concept' | 'Live';
  Afbeelding?: Array<{ url: string }>;
  Projecten?: string[];
}

export interface Media {
  id: string;
  fields: MediaFields;
}
