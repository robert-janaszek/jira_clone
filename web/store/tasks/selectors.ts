import { useSelector } from 'react-redux';
import { AppState } from '..';

export const useTasks = () => {
  return useSelector((state: AppState) => state.tasks);
};
