import { Button, Container, Group, LoadingOverlay, Select, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useDiscardProjectUpdates, useIsProjectModified, useProject, useProjectCategory, useProjectDescription, useProjectName, useUpdateProject } from '../../../module/project/service';
import RichTextEditor from '../../../components/rte';

const Board = () => {
  const { query } = useRouter();
  const projectId = query.projectId;
  const discard = useDiscardProjectUpdates();

  // TODO: notify about discarding updates
  const { isFetching } = useProject(projectId, discard);
  const [projectName, updateProjectName] = useProjectName(projectId);
  const [projectCategory, updateProjectCategory] = useProjectCategory(projectId);
  const [description, updateDescription] = useProjectDescription(projectId);
  const update = useUpdateProject(projectId);
  const isProjectModified = useIsProjectModified();
  
  return <>
    <Breadcrumb projectId={projectId} page="Settings" />
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={isFetching} />
      <Container py="sm">
        <TextInput
          placeholder="Project name"
          label="Type in project name"
          required
          value={projectName}
          onChange={(event) => updateProjectName(event.currentTarget.value)}
        />
      </Container>
      <Container py="sm">
        <Text>Description</Text>
        <RichTextEditor value={description} onChange={updateDescription} style={{ minHeight: 200 }} />
      </Container>
      <Container py="sm">
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
      </Container>
      <Container py="sm">
        <Group>
          <Button onClick={() => update.mutate()} disabled={!isProjectModified}>
            Save changes
          </Button>
          <Button onClick={() => discard()}>
            Discard
          </Button>
        </Group>
      </Container>
    </div>
  </>;
}

export default Board;
