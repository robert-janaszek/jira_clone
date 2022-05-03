import { useRouter } from 'next/router';
import { Breadcrumb } from '../../../components/breadcrumb';
import { ProjectBoard } from "../../../components/project-board";

const Board = () => {
  const { query } = useRouter();
  const projectId = query.projectId;
  
  return <>
    <Breadcrumb projectId={projectId} page="Kanban Board" />
    <ProjectBoard />
  </>;
}

export default Board;
