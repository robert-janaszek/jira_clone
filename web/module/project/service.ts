import { showNotification } from "@mantine/notifications";
import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatcher } from "../../utils/use-dispatcher";
import { projectClient } from "./client";
import { discardProjectUpdates, updateProjectCategoryAction, updateProjectDescriptionAction, updateProjectNameAction } from "./store/actions";
import { getProject, getProjectCategory, getProjectDescription, getProjectName } from "./store/selectors";
import { Project } from "./types";
import { showSuccessNotification } from "../notifications";

// TODO: change this interface into `useQuery` options interface
interface UseProjectProps {
  onSuccess?: () => void;
  initialData?: Project;
}

export const useProject = (projectId: string | string[] | undefined, props?: UseProjectProps) => {
  return useQuery(['project', projectId], () => {
    if (projectId === undefined || Array.isArray(projectId)) {
      return;
    }
    return projectClient.getProject(projectId);
  }, {
    staleTime: 5*60*1000,
    onSuccess: () => props?.onSuccess?.(),
    initialData: props?.initialData
  });
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
  const updateProjectCategory = useDispatcher(updateProjectCategoryAction);
  const resetProjectCategory = () => updateProjectCategory(undefined);
  const updateProjectCategoryInStore = useCallback((projectCategory: string | null) => {
    if (!projectCategory) {
      return;
    }
    if (projectCategory === project.data?.category) {
      resetProjectCategory();
      return;
    }
    updateProjectCategory(projectCategory);
  }, [project]);
  const updatedProjectCategory = getProjectCategory();
  const projectCategory = updatedProjectCategory ?? project.data?.category ?? '';

  return [projectCategory, updateProjectCategoryInStore] as const;
}

export const useProjectDescription = (projectId: string | string[] | undefined) => {
  const project = useProject(projectId);
  const updateProjectDescription = useDispatcher(updateProjectDescriptionAction);
  const resetProjectDescription = () => updateProjectDescription(undefined);
  const updateProjectDescriptionInStore = useCallback((projectDescription: string | null) => {
    if (!projectDescription) {
      return;
    }
    if (projectDescription === project.data?.description) {
      resetProjectDescription();
      return;
    }
    updateProjectDescription(projectDescription);
  }, [project]);
  const updatedProjectDescription = getProjectDescription();
  const projectDescription = updatedProjectDescription ?? project.data?.description ?? '';

  return [projectDescription, updateProjectDescriptionInStore] as const;
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
      showSuccessNotification({ message: 'Project saved sucessfully!' })
      if (!data) {
        queryClient.invalidateQueries(['project', projectId]);
        return;
      }

      queryClient.setQueryData(['project', projectId], () => data);
    }
  });
  return projectMutation;
}
