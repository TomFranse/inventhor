// Airtable Types
// Based on the Airtable API documentation

// Generic Airtable response interface
export interface AirtableResponse<T> {
  records: AirtableRecord<T>[];
  offset?: string;
}

// Generic Airtable record interface
export interface AirtableRecord<T> {
  id: string;
  createdTime: string;
  fields: T;
}

// Collaborator field type
export interface AirtableCollaborator {
  id: string;
  email: string;
  name: string;
}

// Attachment field type
export interface AirtableAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
}

// Task fields interface based on the Airtable API documentation
export interface TaskFields {
  Task: string;
  Description?: string;
  Subtasks?: string;
  Assignee?: AirtableCollaborator;
  Status?: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
  Priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  Attachments?: AirtableAttachment[];
  Progress?: number;
  Project?: string[];
  'Manual sort'?: string;
}

// Project fields interface based on the Airtable API documentation
export interface ProjectFields {
  'Project Name': string;
  'Project Description'?: string;
  Status?: 'Backlog' | 'In Progress' | 'Released' | 'Shelved';
  Owner?: AirtableCollaborator;
  Thumbnail?: AirtableAttachment[];
  Publish?: boolean;
  'Start date'?: string;
  'End date'?: string;
  Milestones?: string[];
  Tasks?: string[];
}

// Map Airtable Task to our Card component
export interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  link: string;
  isActive: boolean;
  status?: string;
  priority?: string;
} 