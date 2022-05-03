import { Text } from "@mantine/core";
import { useProject } from "../../module/project/service";

export interface BreadcrumbProps {
  projectId:  string | string[] | undefined;
  page: string;
}

export const Breadcrumb = ({ projectId, page }: BreadcrumbProps) => {
  const project = useProject(projectId);

  return <Text>
    Project / {project?.name} / {page}
  </Text>
};