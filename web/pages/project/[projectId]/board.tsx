import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Breadcrumb } from '../../../components/breadcrumb';
import { ProjectBoard } from "../../../components/project-board";
import { projectClient } from '../../../module/project/client';
import { useProject } from '../../../module/project/service';
import { Project } from '../../../module/project/types';

interface BoardProps {
  project?: Project;
}

export const getServerSideProps: GetServerSideProps<BoardProps> = async (context) => {
  const projectId = context.query.projectId;
  if (!projectId || Array.isArray(projectId)) {
    return {
      notFound: true,
    };
  }

  try {
    const project = await projectClient.getProject(projectId);
    return {
      props: {
        project,
      }
    }
  } catch (_) {
    return {
      notFound: true,
    }
  }
}

const Board = (props: BoardProps) => {
  const { query } = useRouter();
  const projectId = query.projectId;
  useProject(projectId, { initialData: props.project })
  
  return <>
    <Breadcrumb projectId={projectId} page="Kanban Board" />
    <ProjectBoard />
  </>;
}

export default Board;
