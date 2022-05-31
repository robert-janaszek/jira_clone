import { TaskDTO } from "../types";

const backlogTasks: TaskDTO[] = [
  { key: 'TASK-1', index: 1, status: 'backlog', },
  { key: 'TASK-2', index: 2, status: 'backlog', },
  { key: 'TASK-3', index: 3, status: 'backlog', },
  { key: 'TASK-4', index: 4, status: 'backlog', },
];

const readyForDevTasks: TaskDTO[] = [
  { key: 'TASK-5', index: 5, status: 'ready-for-dev', },
  { key: 'TASK-6', index: 6, status: 'ready-for-dev', },
  { key: 'TASK-7', index: 7, status: 'ready-for-dev', },
]

export const initialTasks: TaskDTO[] = [
  ...backlogTasks,
  ...readyForDevTasks,
  { key: 'TASK-8', index: 8, status: 'in-progress', },
  { key: 'TASK-9', index: 9, status: 'in-progress', },
  { key: 'TASK-10', index: 10, status: 'done', },
];