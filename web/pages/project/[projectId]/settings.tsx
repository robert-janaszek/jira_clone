import { Button, TextInput } from '@mantine/core';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useProject } from '../../../module/project/service';
import { discardProjectUpdates, updateProjectNameAction } from '../../../module/project/store/actions';
import { getProjectName } from '../../../module/project/store/selectors';
import { useDispatcher } from '../../../utils/use-dispatcher';

const Board = () => {
  const { query } = useRouter();
  const projectId = query.projectId;
  const project = useProject(projectId);
  const updateProjectNameInStore = useDispatcher(updateProjectNameAction);
  const updatedProjectName = getProjectName();
  const projectName = updatedProjectName ?? project?.name ?? '';
  const discard = useDispatcher(discardProjectUpdates);
  
  return <>
    <Breadcrumb projectId={projectId} page="Settings" />
    <TextInput
      placeholder="Project name"
      label="Name"
      required
      value={projectName}
      onChange={(event) => updateProjectNameInStore(event.currentTarget.value)}
    />
    <Button onClick={() => discard(undefined) }>
      Save changes
    </Button>
  </>;
}

export default Board;
