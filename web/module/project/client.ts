import { Project, ProjectDTO } from "./types";

export class ProjectClient {
  public async fetch(id: string) {
    const response = await fetch('http://localhost:3000/projects/' + id);
    const projectInfo = await response.json() as Project;
    return projectInfo;
  }

  public async update(id: string, dto: ProjectDTO) {
    const response = await fetch('http://localhost:3000/projects/' + id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto),
    });
    const data = await response.json() as Project;

    return data;
  }
}

export const projectClient = new ProjectClient();
