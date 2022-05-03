import { useQuery } from "react-query";
import { Project } from "./types";

const fetchProject = async (projectId: string | string[] | undefined) => {
  if (!projectId || Array.isArray(projectId)) {
    return;
  }
  const response = await fetch('http://localhost:3000/projects/' + projectId);
  const projectInfo = await response.json() as Project;
  return projectInfo;
}

export const useProject = (projectId: string | string[] | undefined) => {
  const { data: project } = useQuery(['project', projectId], () => fetchProject(projectId), { staleTime: 5*60*1000});

  return project;
}
