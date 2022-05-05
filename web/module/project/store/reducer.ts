import { createReducer } from "@reduxjs/toolkit";
import { discardProjectUpdates, updateProjectCategoryAction, updateProjectNameAction } from "./actions";

interface ProjectState {
  updates: {
    name?: string;
    category?: string;
  }
}

const initialState: ProjectState = { updates: {}};

export const ProjectReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateProjectNameAction, (state, action) => {
    state.updates.name = action.payload;
  });
  builder.addCase(updateProjectCategoryAction, (state, action) => {
    state.updates.category = action.payload;
  });

  builder.addCase(discardProjectUpdates, (state) => {
    state.updates = {};
  })
});