import { useCallback } from "react";
import { useOptimisticallyUpdateTask } from "../../module/tasks/service";
import { TaskDTO } from "../../module/tasks/types";
import { useStateIsModified } from "./state-is-modified-service";

export const useEditTaskDescription = (task: TaskDTO) => {
  const updateTaskMutation = useOptimisticallyUpdateTask()
  const { value: description, setValue: setDescription, isModified: isDescriptionModified, resetModified: resetDescriptionModified, reset: resetDescription } = useStateIsModified(task.description)

  const saveDescription = useCallback(() => {
    if (isDescriptionModified) {
      resetDescriptionModified()
      const updatedTask = {
        ...task,
        description
      }
      updateTaskMutation.mutate(updatedTask)
    }
  }, [task, description, isDescriptionModified]);

  return {
    description,
    setDescription,
    isDescriptionModified,
    resetDescriptionModified,
    saveDescription,
    resetDescription,
  }
}
