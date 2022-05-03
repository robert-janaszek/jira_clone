import { useRouter } from 'next/router';
import { Breadcrumb } from '../../../components/breadcrumb';

const Board = () => {
  const { query } = useRouter();
  const projectId = query.projectId;
  
  return <>
    <Breadcrumb projectId={projectId} page="Settings" />
  </>;
}

export default Board;
