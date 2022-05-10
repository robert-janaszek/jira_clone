import { RestClient } from "../rest-client";
import { TaskDTO } from "./types";

export class IssueClient extends RestClient {
  public async getIssues() {
    const response = await fetch('http://localhost:3000/issues');
    const tasksDTOs = await response.json() as TaskDTO[];
    return tasksDTOs;
  }
}

export const issueClient = new IssueClient();
