import { createAction } from "@reduxjs/toolkit";

export const updateProjectNameAction = createAction<string>('project/update-name');
export const discardProjectUpdates = createAction('project/discard');
