import { AirtableResponse, TaskFields, ProjectFields, CardData } from '../types/airtable';

// Constants
const AIRTABLE_API_URL = 'https://api.airtable.com/v0';
const BASE_ID = 'appTZNwy0h8PLgahr';
const TASKS_TABLE = 'Tasks';
const PROJECTS_TABLE = 'Projects';

/**
 * Airtable Service - Handles communication with the Airtable API
 */
class AirtableService {
  private token: string;
  
  constructor() {
    this.token = import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN;
    if (!this.token) {
      console.error('Airtable access token is missing');
    }
  }

  /**
   * Get headers for Airtable API requests
   */
  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Fetch all tasks from Airtable
   */
  async fetchTasks(): Promise<AirtableResponse<TaskFields>> {
    try {
      const response = await fetch(
        `${AIRTABLE_API_URL}/${BASE_ID}/${TASKS_TABLE}`,
        {
          method: 'GET',
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  /**
   * Fetch all projects from Airtable
   */
  async fetchProjects(): Promise<AirtableResponse<ProjectFields>> {
    try {
      const response = await fetch(
        `${AIRTABLE_API_URL}/${BASE_ID}/${PROJECTS_TABLE}`,
        {
          method: 'GET',
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  /**
   * Fetch a specific task by ID
   */
  async fetchTaskById(taskId: string): Promise<TaskFields> {
    try {
      const response = await fetch(
        `${AIRTABLE_API_URL}/${BASE_ID}/${TASKS_TABLE}/${taskId}`,
        {
          method: 'GET',
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch task: ${response.statusText}`);
      }

      const data = await response.json();
      return data.fields;
    } catch (error) {
      console.error(`Error fetching task ${taskId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch a specific project by ID
   */
  async fetchProjectById(projectId: string): Promise<ProjectFields> {
    try {
      const response = await fetch(
        `${AIRTABLE_API_URL}/${BASE_ID}/${PROJECTS_TABLE}/${projectId}`,
        {
          method: 'GET',
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.statusText}`);
      }

      const data = await response.json();
      return data.fields;
    } catch (error) {
      console.error(`Error fetching project ${projectId}:`, error);
      throw error;
    }
  }

  /**
   * Convert Airtable Tasks to CardData for the UI
   */
  mapTasksToCards(tasksResponse: AirtableResponse<TaskFields>): CardData[] {
    return tasksResponse.records.map(record => ({
      id: record.id,
      title: record.fields.Task,
      subtitle: record.fields.Description,
      // Use the first attachment's thumbnail URL as the icon if available
      icon: record.fields.Attachments && record.fields.Attachments.length > 0
        ? record.fields.Attachments[0].thumbnails?.large?.url 
        : undefined,
      link: `/tasks/${record.id}`,
      isActive: record.fields.Status !== 'Blocked',
      status: record.fields.Status,
      priority: record.fields.Priority,
    }));
  }

  /**
   * Convert Airtable Projects to CardData for the UI
   */
  mapProjectsToCards(projectsResponse: AirtableResponse<ProjectFields>): CardData[] {
    return projectsResponse.records.map(record => ({
      id: record.id,
      title: record.fields['Project Name'],
      subtitle: record.fields['Project Description'],
      // Use the first thumbnail's URL as the icon if available
      icon: record.fields.Thumbnail && record.fields.Thumbnail.length > 0
        ? record.fields.Thumbnail[0].thumbnails?.large?.url 
        : undefined,
      link: `/projects/${record.id}`,
      isActive: record.fields.Status !== 'Shelved',
      status: record.fields.Status,
    }));
  }
}

// Export a singleton instance
export const airtableService = new AirtableService(); 