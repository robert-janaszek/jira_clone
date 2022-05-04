import { configureStore } from '@reduxjs/toolkit'
import { ProjectReducer } from '../module/project/store/reducer';
import { TasksReducer } from '../module/tasks/store/reducer';

const store = configureStore({
  reducer: {
    tasks: TasksReducer,
    project: ProjectReducer,
  },
})

export default store;

export type AppState = ReturnType<typeof store.getState>;