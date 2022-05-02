import { createAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";

export const updateDropTaskAction = createAction<DropResult>('update-on-drop');
