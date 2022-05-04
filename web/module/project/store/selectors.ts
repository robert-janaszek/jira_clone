import { useSelector } from 'react-redux';
import { AppState } from "../../../store";

export const getProjectName = () => {
  const project = useSelector((state: AppState) => state.project.updates);
  return project.name;
}