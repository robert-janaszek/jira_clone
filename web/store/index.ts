import { configureStore } from '@reduxjs/toolkit'
import { ProjectReducer } from '../module/project/store/reducer';

const store = configureStore({
  reducer: {
    project: ProjectReducer,
  },
})

export default store;

export type AppState = ReturnType<typeof store.getState>;