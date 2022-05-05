import { createAction } from "@reduxjs/toolkit";

export const updateProjectNameAction = createAction<string | undefined>('project/update-name');
export const updateProjectCategoryAction = createAction<string | undefined>('project/update-category');
export const discardProjectUpdates = createAction('project/discard');
