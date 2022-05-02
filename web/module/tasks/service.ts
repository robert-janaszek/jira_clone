import { useEffect } from "react";
import { useDispatcher } from "../../utils/use-dispatcher";
import { loadTasksAction } from "./store/actions";
import { useGetTasks } from "./store/selectors";
import { ITask, TaskDTO } from "./types";

export const useTasks = () => {
  const tasksStore = useGetTasks();
  const loadTasks = useDispatcher(loadTasksAction);
  useEffect(() => {
    if (!tasksStore.isLoaded) {
      fetchTasks(loadTasks);
    }
  }, [])
  
  return tasksStore;
}

const fetchTasks = async (loadTasks: (tasks: ITask[]) => void) => {
  const response = await fetch('http://localhost:3000/issues');
  const tasksDTOs = await response.json() as TaskDTO[];
  const tasks: ITask[] = tasksDTOs.map(task => ({
    key: 'TASK-' + task.id,
    index: task.listPosition,
    status: task.status,
  }));
  loadTasks(tasks);
}