import { RestClient } from "../rest-client";
import { TaskDTO, UpdateTaskDTO } from "./types";

export class IssueClient extends RestClient {
  public async getIssues() {
    const tasksDTOs = await this.get<TaskDTO[]>('http://localhost:3000/issues');
    return tasksDTOs;
  }

  public async updateTask(issue: TaskDTO) {
    const { id, listPosition, status, title } = issue
    return this.put<TaskDTO>('http://localhost:3000/issues/' + id, {
      body: { listPosition, status, title }
    })
  }
}

export const issueClient = new IssueClient();
