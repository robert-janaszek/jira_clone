import { configureStore } from '@reduxjs/toolkit'
import { TasksReducer } from './tasks/reducer';

const store = configureStore({
  reducer: {
    tasks: TasksReducer,
  },
})

export default store;

export type AppState = ReturnType<typeof store.getState>;