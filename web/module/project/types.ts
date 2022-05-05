export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface ProjectDTO {
  name?: string;
  category?: string;
}