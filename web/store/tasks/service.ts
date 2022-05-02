import { ITask } from "./types";

export const rebuildWhenRemoveIndex = (tasks: ITask[], index: number) => {
  tasks.filter(task => task.index >= index)
    .forEach(task => task.index = task.index - 1);
}

export const rebuildWhenAddIndex = (tasks: ITask[], index: number) => {
  tasks.filter(task => task.index >= index)
    .forEach(task => task.index = task.index + 1);
}