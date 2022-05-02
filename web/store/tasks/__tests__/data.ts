import { ITask } from "../types";

const backlogTasks: ITask[] = [
  { id: 'TASK-1', index: 1, status: 'backlog', },
  { id: 'TASK-2', index: 2, status: 'backlog', },
  { id: 'TASK-3', index: 3, status: 'backlog', },
  { id: 'TASK-4', index: 4, status: 'backlog', },
];

const readyForDevTasks: ITask[] = [
  { id: 'TASK-5', index: 5, status: 'ready-for-dev', },
  { id: 'TASK-6', index: 6, status: 'ready-for-dev', },
  { id: 'TASK-7', index: 7, status: 'ready-for-dev', },
]

export const initialTasks: ITask[] = [
  ...backlogTasks,
  ...readyForDevTasks,
  { id: 'TASK-8', index: 8, status: 'in-progress', },
  { id: 'TASK-9', index: 9, status: 'in-progress', },
  { id: 'TASK-10', index: 10, status: 'done', },
];