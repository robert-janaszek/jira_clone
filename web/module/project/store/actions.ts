import { createAction } from "@reduxjs/toolkit";

export const updateProjectNameAction = createAction<string | undefined>('project/update-name');
export const updateProjectCategoryAction = createAction<string | undefined>('project/update-category');
export const updateProjectDescriptionAction = createAction<string | undefined>('project/update-description');
export const discardProjectUpdates = createAction('project/discard');
