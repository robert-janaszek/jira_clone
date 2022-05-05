import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatcher } from "../../utils/use-dispatcher";
import { projectClient } from "./client";
import { discardProjectUpdates, updateProjectCategoryAction, updateProjectNameAction } from "./store/actions";
import { getProject, getProjectCategory, getProjectName } from "./store/selectors";

export const useProject = (projectId: string | string[] | undefined, onSuccess?: () => void) => {
  return useQuery(['project', projectId], () => {
    if (projectId === undefined || Array.isArray(projectId)) {
      return;
    }
    return projectClient.fetch(projectId);
  }, { staleTime: 5*60*1000, onSuccess: () => onSuccess?.()});
}

export const useProjectName = (projectId: string | string[] | undefined) => {
  const project = useProject(projectId);
  const updateProjectName = useDispatcher(updateProjectNameAction);
  const resetProjectName = () => updateProjectName(undefined);
  const updateProjectNameInStore = useCallback((name: string) => {
    if (name === project.data?.name) {
      resetProjectName();
      return;
    }
    updateProjectName(name);
  }, [project]);
  const updatedProjectName = getProjectName();
  const projectName = updatedProjectName ?? project.data?.name ?? '';

  return [projectName, updateProjectNameInStore] as const;
}

export const useProjectCategory = (projectId: string | string[] | undefined) => {
  const project = useProject(projectId);
  const updateProjectCategoryInStore = useDispatcher(updateProjectCategoryAction);
  const resetProjectCategory = () => updateProjectCategoryInStore(undefined);
  const updateProjectCategoryMemo = useCallback((projectCategory: string | null) => {
    if (!projectCategory) {
      return;
    }
    if (projectCategory === project.data?.category) {
      resetProjectCategory();
      return;
    }
    updateProjectCategoryInStore(projectCategory);
  }, [project]);
  const updatedProjectCategory = getProjectCategory();
  const projectCategory = updatedProjectCategory ?? project.data?.category ?? '';

  return [projectCategory, updateProjectCategoryMemo] as const;
}

export const useIsProjectModified = () => {
  const project = getProject();
  const anyValuesNotNull = Object.values(project).some(value => value !== undefined);
  return anyValuesNotNull;
}

export const useDiscardProjectUpdates = () => {
  const discard = useDispatcher(discardProjectUpdates);
  return discard;
}

export const useUpdateProject = (projectId: string | string[] | undefined) => {
  const project = getProject();
  const queryClient = useQueryClient();
  const projectMutation = useMutation(async () => {
    if (projectId === undefined || Array.isArray(projectId)) {
      return;
    }
    return projectClient.update(projectId, project);
  }, {
    onSuccess: async (data) => {
      if (!data) {
        queryClient.invalidateQueries(['project', projectId]);
        return;
      }

      queryClient.setQueryData(['project', projectId], () => data);
    }
  });
  return projectMutation;
}
