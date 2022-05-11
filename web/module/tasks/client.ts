import { RestClient } from "../rest-client";
import { TaskDTO, UpdateTaskDTO } from "./types";

export class IssueClient extends RestClient {
  public async getIssues() {
    const tasksDTOs = await this.get<TaskDTO[]>('http://localhost:3000/issues');
    return tasksDTOs;
  }
  
  public async updateIssuePositionAndStatus(issue: TaskDTO) {
    const { id, listPosition, status } = issue
    return this.put<TaskDTO>('http://localhost:3000/issues/' + id, {
      body: { listPosition, status }
    })
  }
}

export const issueClient = new IssueClient();
