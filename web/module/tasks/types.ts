export interface ITask {
  key: string;
  index: number;
  status: string;
}

export interface TaskDTO {
  id: number;
  title: string;
  type: string;
  status: string;
  priority: string;
  listPosition: number;
  description: string;
}