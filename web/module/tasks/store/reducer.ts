import { createReducer } from "@reduxjs/toolkit";
import { loadTasksAction, updateDropTaskAction } from "./actions";
import { rebuildWhenRemoveIndex, rebuildWhenAddIndex } from "./service";
import { ITask } from "../types";

interface TasksReducerState {
  isFetching: boolean;
  isError: boolean;
  isLoaded: boolean;
  tasks: ITask[];
}

const initialState: TasksReducerState = {
  isFetching: false,
  isError: false,
  isLoaded: false,
  tasks: [],
}

export const TasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateDropTaskAction, (state, action) => {
    const dropResult = action.payload;

    const draggedTask = state.tasks.find(task => task.key === dropResult.draggableId);
    if (!draggedTask) {
      return;
    }
    if (!dropResult.destination) {
      return;
    }

    const originalIndex = draggedTask.index;
    const dropIndex = dropResult.destination.index;
    const tasksInSourceStatus = state.tasks.filter(task => task.status === draggedTask.status);
    const tasksInDestinationStatus = state.tasks.filter(task => task.status === dropResult.destination?.droppableId);
    rebuildWhenRemoveIndex(tasksInSourceStatus, originalIndex);
    rebuildWhenAddIndex(tasksInDestinationStatus, dropIndex);

    draggedTask.index = dropResult.destination?.index;
    draggedTask.status = dropResult.destination.droppableId;

    state.tasks.sort((a, b) => a.index - b.index);
  });

  builder.addCase(loadTasksAction, (state, action) => {
    state.isLoaded = true;
    state.tasks = action.payload;
  });
});