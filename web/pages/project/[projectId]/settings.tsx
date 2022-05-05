import { Button, Group, LoadingOverlay, Select, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useDiscardProjectUpdates, useProject, useProjectCategory, useProjectName } from '../../../module/project/service';

const Board = () => {
  const { query } = useRouter();
  const projectId = query.projectId;
  const discard = useDiscardProjectUpdates();

  // TODO: notify about discarding updates
  const { isFetching } = useProject(projectId, discard);
  const [projectName, updateProjectName] = useProjectName(projectId);
  const [projectCategory, updateProjectCategory] = useProjectCategory(projectId);
  
  return <>
    <Breadcrumb projectId={projectId} page="Settings" />
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={isFetching} />
      <TextInput
        placeholder="Project name"
        label="Type in project name"
        required
        value={projectName}
        onChange={(event) => updateProjectName(event.currentTarget.value)}
      />
      <Select
        label="Project category"
        placeholder="Choose project category"
        data={[
          { value: 'software', label: 'Software' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'business', label: 'Business' },
        ]}
        value={projectCategory}
        onChange={(value) => updateProjectCategory(value)}
      />
      <Group>
        <Button onClick={discard}>
          Save changes
        </Button>
        <Button onClick={discard}>
          Discard
        </Button>
      </Group>
    </div>
  </>;
}

export default Board;
