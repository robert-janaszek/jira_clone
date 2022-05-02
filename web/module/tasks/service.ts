import { useEffect } from "react";
import { useAsyncDispatcher, useDispatcher } from "../../utils/use-dispatcher";
import { loadTasksAction } from "./store/actions";
import { useGetTasks } from "./store/selectors";

export const useTasks = () => {
  const tasksStore = useGetTasks();
  const loadTasks = useAsyncDispatcher(loadTasksAction);
  useEffect(() => {
    if (!tasksStore.isLoaded) {
      loadTasks();
    }
  }, []);
  
  return tasksStore;
}

