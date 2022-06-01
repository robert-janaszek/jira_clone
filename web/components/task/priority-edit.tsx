import { Select } from "@mantine/core"
import { useCallback } from "react"
import { useOptimisticallyUpdateTask } from "../../module/tasks/service"
import { TaskDTO } from "../../module/tasks/types"

export interface PriorityEditProps {
  task: TaskDTO
}

export const PriorityEdit = (props: PriorityEditProps) => {
  const { task } = props
  const updateTaskMutation = useOptimisticallyUpdateTask()
  const udpatePriority = useCallback((priority: string) => {
    const updatedTask = {
      ...task,
      priority,
    }
    updateTaskMutation.mutate(updatedTask)
  }, [updateTaskMutation, task])

  return <Select
    label="Priority"
    placeholder="Pick one"
    value={task.priority}
    onChange={udpatePriority}
    data={[
      { value: '1', label: 'Lowest' },
      { value: '2', label: 'Low' },
      { value: '3', label: 'Medium' },
      { value: '4', label: 'High' },
      { value: '5', label: 'Highest' },
    ]}
  />
}
