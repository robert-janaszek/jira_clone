import { RestClient } from "../rest-client";
import { Project, ProjectDTO } from "./types";

export class ProjectClient extends RestClient {
  public async getProject(id: string) {
    return super.get<Project>('http://localhost:3000/projects/' + id)
  }

  public async update(id: string, dto: ProjectDTO) {
    return this.put<Project>('http://localhost:3000/projects/' + id, { body: dto })
  }
}

export const projectClient = new ProjectClient();
