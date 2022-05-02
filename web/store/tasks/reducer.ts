import { createReducer } from "@reduxjs/toolkit";
import { updateDropTaskAction } from "./actions";
import { rebuildWhenRemoveIndex, rebuildWhenAddIndex } from "./service";
import { ITask } from "./types";


interface TasksReducerState {
  isFetching: boolean;
  isLoaded: boolean;
  tasks: ITask[];
}

const initialTasks: ITask[] = [
  { id: 'TASK-1', index: 1, status: 'backlog', },
  { id: 'TASK-2', index: 2, status: 'backlog', },
  { id: 'TASK-3', index: 3, status: 'backlog', },
  { id: 'TASK-4', index: 4, status: 'backlog', },
  { id: 'TASK-5', index: 5, status: 'ready-for-dev', },
  { id: 'TASK-6', index: 6, status: 'ready-for-dev', },
  { id: 'TASK-7', index: 7, status: 'ready-for-dev', },
  { id: 'TASK-8', index: 8, status: 'in-progress', },
  { id: 'TASK-9', index: 9, status: 'in-progress', },
  { id: 'TASK-10', index: 10, status: 'done', },
];

const initialState: TasksReducerState = {
  isFetching: false,
  isLoaded: false,
  tasks: initialTasks,
}

export const TasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateDropTaskAction, (state, action) => {
    const dropResult = action.payload;

    const draggedTask = state.tasks.find(task => task.id === dropResult.draggableId);
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
});