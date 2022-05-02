import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";
import { ITask, TaskDTO } from "../types";

export const loadTasksAction = createAsyncThunk<ITask[]>('tasks/load', async () => {
  const response = await fetch('http://localhost:3000/issues');
  const tasksDTOs = await response.json() as TaskDTO[];
  const tasks: ITask[] = tasksDTOs.map(task => ({
    key: 'TASK-' + task.id,
    index: task.listPosition,
    status: task.status,
  }));

  return tasks;
});
export const updateDropTaskAction = createAction<DropResult>('tasks/update-on-drop');
