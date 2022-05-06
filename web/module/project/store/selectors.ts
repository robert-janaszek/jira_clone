import { useSelector } from 'react-redux';
import { AppState } from "../../../store";

export const getProject = () => {
  return useSelector((state: AppState) => state.project.updates);
}

export const getProjectName = () => {
  const project = getProject();
  return project.name;
}

export const getProjectCategory = () => {
  const project = getProject();
  return project.category;
}

export const getProjectDescription = () => {
  const project = getProject();
  return project.description;
}