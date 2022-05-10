import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { issueClient } from "./client";
import { TaskDTO } from "./types";

export const useTasks = () => {
  const issuesQuery = useQuery(['issues'], () => issueClient.getIssues())
  return issuesQuery
}

export const useOrderedTasks = () => {
  const { data: tasks } = useTasks();
  const orderedTasks = useMemo(() => {
    return tasks?.sort(taskSorter)
  }, [tasks])

  return orderedTasks
}

export const taskSorter = (taskA: TaskDTO, taskB: TaskDTO) =>
  taskA.listPosition - taskB.listPosition;

export const useOptimisticallyUpdateTask = () => {
  const queryClient = useQueryClient()
  const taskMutation = useMutation(async () => {
    console.log('yep, mutating');
    return 'update-task'
  }, {
    onMutate: async (updatedTask: TaskDTO) => {
      console.log(updatedTask);
      await queryClient.cancelQueries(['issues'])
      const previousData = queryClient.getQueryData<TaskDTO[]>(['issues'])

      // TODO: handle this case
      if (!previousData) {
        return
      }

      queryClient.setQueryData(['issues'], oldData => {
        const updatedTaskIndex = previousData.findIndex(task => task.id === updatedTask.id);
        if (updatedTaskIndex === -1) {
          return
        }
        const prevTasks = previousData.slice(0, updatedTaskIndex)
        const nextTasks = previousData.slice(updatedTaskIndex + 1)

        return [...prevTasks, ...nextTasks, updatedTask];
      })

      return { previousData }
    }
  })

  return taskMutation
}