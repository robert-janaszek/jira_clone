import { DropResult } from "react-beautiful-dnd"
import { useOptimisticallyUpdateTask, useOrderedTasks } from "./service"
import { TaskDTO } from "./types"

export const useTaskDrop = () => {
  const tasks = useOrderedTasks()
  const updateTaskMutation = useOptimisticallyUpdateTask()

  return (dropResult: DropResult) => {
    const draggedTask = tasks?.find(task => task.id.toString() === dropResult.draggableId)
    const destinationStatus = dropResult.destination?.droppableId

    if (!draggedTask) {
      return
    }
    if (!dropResult.destination) {
      return
    }
    // TODO: check if this is populated when status is not changed
    if (!destinationStatus) {
      return
    }

    const destinationLaneTasks = tasks?.filter(task => task.status === destinationStatus && task.id !== draggedTask.id)
    const destinationIndex = dropResult.destination.index;
    const prevTask = destinationLaneTasks?.[destinationIndex - 1]
    const nextTask = destinationLaneTasks?.[destinationIndex]
    const destinationListIndex = calculateNewIndex(prevTask, nextTask)
    const updatedTask: TaskDTO = {
      ...draggedTask,
      listPosition: destinationListIndex,
      status: destinationStatus
    }
    updateTaskMutation.mutate(updatedTask)
  }
}

const calculateNewIndex = (prevTask: TaskDTO | undefined, nextTask: TaskDTO | undefined): number => {
  if (!prevTask && !nextTask) {
    return 0
  }
  if (!prevTask) {
    return nextTask!.listPosition - 1
  }
  if (!nextTask) {
    return prevTask.listPosition + 1
  }

  const delta = nextTask.listPosition - prevTask.listPosition;
  return prevTask.listPosition + (delta / 2);
}
