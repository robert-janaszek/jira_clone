import { useEffect, useState } from "react"
import { Project } from "./types";

const fetchProject = async (projectId: string) => {
  const response = await fetch('http://localhost:3000/projects/' + projectId);
  const projectInfo = await response.json() as Project;
  return projectInfo;
}

export const useProject = (projectId: string | string[] | undefined) => {
  const [project, setProject] = useState<Project>();
  useEffect(() => {
    if (!projectId || Array.isArray(projectId)) {
      return;
    }
    fetchProject(projectId)
      .then(project => setProject(project))
  }, [projectId]);

  return project;
}
