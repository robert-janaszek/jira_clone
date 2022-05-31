import { useCallback } from "react"
import { useOptimisticallyUpdateTask } from "../../module/tasks/service"
import { TaskDTO } from "../../module/tasks/types"
import { useStateIsModified } from "./state-is-modified-service"

export const useEditTaskTitle = (task: TaskDTO) => {
  const updateTaskMutation = useOptimisticallyUpdateTask()
  const { value: title, setValue: setTitle, isModified: isTitleModified, resetModified: resetTitleModified } = useStateIsModified(task.title)
  const saveTitle = useCallback(() => {
    if (isTitleModified) {
      resetTitleModified()
      const updatedTask = {
        ...task,
        title,
      }
      updateTaskMutation.mutate(updatedTask)
    }
  }, [task, title, isTitleModified])

  return {
    title,
    setTitle,
    isTitleModified,
    resetTitleModified,
    saveTitle,
  }
}
