import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

export const useGetTasks = () => {
  const tasksState = useSelector((state: AppState) => state.tasks);
  return tasksState;
};
