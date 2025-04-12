export interface RubricsFields {
    Vaardigheid: string;
    'Onderdeel van'?: string[];
    Projecten?: string[];
    Uitstekend?: string;
    Goed?: string;
    Redelijk?: string;
    Onvoldoende?: string;
    'Alle projecten'?: boolean;
    Categorie?: boolean;
  }
  
  export interface Rubric {
    id: string;
    fields: RubricsFields;
  }
  
  export interface RubricCategory {
    id: string;
    name: string;
    skills: Rubric[];
  }