import { Select } from '@mantine/core'
import { useCallback } from 'react';
import { useOptimisticallyUpdateTask } from '../../module/tasks/service';
import { TaskDTO } from '../../module/tasks/types'

export interface StatusEditProps {
  task: TaskDTO
} 

// TODO: think how to fix status edit so it doesn't close edit modal
// TODO: probably need to use different hook than useOptimisticallyUpdateTask
export const StatusEdit = (props: StatusEditProps) => {
  const { task } = props;
  const updateTaskMutation = useOptimisticallyUpdateTask();
  const updateStatus = useCallback((status: string) => {
    const updatedTask = {
      ...task,
      status,
    }
    updateTaskMutation.mutate(updatedTask)
  }, [updateTaskMutation, task])

  return <Select
    label="Status"
    placeholder="Pick one"
    value={task.status}
    onChange={updateStatus}
    data={[
      { value: 'backlog', label: 'Backlog' },
      { value: 'ready-for-dev', label: 'Selected for development' },
      { value: 'in-progress', label: 'In progress' },
      { value: 'done', label: 'Done' },
    ]}
  />
}
