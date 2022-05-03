import { createReducer } from "@reduxjs/toolkit";
import { loadTasksAction, updateDropTaskAction } from "./actions";
import { rebuildWhenRemoveIndex, rebuildWhenAddIndex } from "./service";
import { ITask } from "../types";

interface TasksState {
  isFetching: boolean;
  isError: boolean;
  isLoaded: boolean;
  tasks: ITask[];
}

const initialState: TasksState = {
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

  builder.addCase(loadTasksAction.pending, (state) => {
    state.isFetching = true;
  });
  builder.addCase(loadTasksAction.fulfilled, (state, action) => {
    state.isFetching = false;
    state.isLoaded = true;
    state.tasks = action.payload;
  });
  builder.addCase(loadTasksAction.rejected, (state) => {
    state.isFetching = false;
    state.isError = true;
    state.isLoaded = true;
  });
});