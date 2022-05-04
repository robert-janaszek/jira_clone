import { createReducer } from "@reduxjs/toolkit";
import { discardProjectUpdates, updateProjectNameAction } from "./actions";

interface ProjectState {
  updates: {
    name?: string;
  }
}

const initialState: ProjectState = { updates: {}};

export const ProjectReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateProjectNameAction, (state, action) => {
    state.updates.name = action.payload;
  });

  builder.addCase(discardProjectUpdates, (state) => {
    state.updates = {};
  })
});