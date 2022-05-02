import { createAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";
import { ITask } from "../types";

export const loadTasksAction = createAction<ITask[]>('tasks/load');
export const updateDropTaskAction = createAction<DropResult>('tasks/update-on-drop');
