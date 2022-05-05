import { createAction } from "@reduxjs/toolkit";

export const updateProjectNameAction = createAction<string>('project/update-name');
export const updateProjectCategoryAction = createAction<string>('project/update-category');
export const discardProjectUpdates = createAction('project/discard');
