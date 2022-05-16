export interface TaskDTO {
  id: number;
  title: string;
  type: string;
  status: string;
  priority: string;
  listPosition: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateTaskDTO = Pick<TaskDTO, 'id'> & Partial<Omit<TaskDTO, 'createdAt' | 'updatedAt'>>
