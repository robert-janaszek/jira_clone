import { useMemo } from "react";
import { useQuery } from "react-query";
import { useDispatcher } from "../../utils/use-dispatcher";
import { discardProjectUpdates, updateProjectCategoryAction, updateProjectNameAction } from "./store/actions";
import { getProjectCategory, getProjectName } from "./store/selectors";
import { Project } from "./types";

const fetchProject = async (projectId: string | string[] | undefined) => {
  if (!projectId || Array.isArray(projectId)) {
    return;
  }
  const response = await fetch('http://localhost:3000/projects/' + projectId);
  const projectInfo = await response.json() as Project;
  return projectInfo;
}

export const useProject = (projectId: string | string[] | undefined, onSuccess?: () => void) => {
  return useQuery(['project', projectId], () => fetchProject(projectId), { staleTime: 5*60*1000, onSuccess: () => onSuccess?.()});
}

export const useProjectName = (projectId: string | string[] | undefined) => {
  const project = useProject(projectId);
  const updateProjectNameInStore = useDispatcher(updateProjectNameAction);
  const updatedProjectName = getProjectName();
  const projectName = updatedProjectName ?? project.data?.name ?? '';

  return [projectName, updateProjectNameInStore] as const;
}

export const useProjectCategory = (projectId: string | string[] | undefined) => {
  const project = useProject(projectId);
  const updateProjectCategoryInStore = useDispatcher(updateProjectCategoryAction);
  const updateProjectCategoryMemo = useMemo(() => (projectCategory: string | null) => {
    if (!projectCategory) {
      return;
    }
    updateProjectCategoryInStore(projectCategory);
  }, []);
  const updatedProjectCategory = getProjectCategory();
  const projectCategory = updatedProjectCategory ?? project.data?.category ?? '';

  return [projectCategory, updateProjectCategoryMemo] as const;
}

export const useDiscardProjectUpdates = () => {
  const discard = useDispatcher(discardProjectUpdates);
  return discard;
}
