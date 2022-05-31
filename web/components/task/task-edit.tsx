import { Button, Divider, Grid, Text, TextInput } from "@mantine/core";
import { TaskDTO } from "../../module/tasks/types";
import RichTextEditor from '../rte'
import { useQueryClient } from "react-query";
import moment from 'moment';
import { useEditTaskTitle } from "./edit-title-service";
import { useEditTaskDescription } from "./edit-description-service";
import { StatusEdit } from "./status-edit";

export interface TaskEditProps {
  task: TaskDTO;
  onClose: (callback: () => void) => void;
}

export const TaskEdit = ({ task, onClose }: TaskEditProps) => {
  const { saveTitle, setTitle, title } = useEditTaskTitle(task)
  const { description, isDescriptionModified, resetDescription, saveDescription, setDescription} = useEditTaskDescription(task)
  
  const queryClient = useQueryClient()
  onClose(() => queryClient.invalidateQueries(['issues']))

  return <Grid>
    <Grid.Col span={8}>
      <TextInput
        placeholder="Task title"
        label="Title"
        required
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        onBlur={saveTitle}
      />
      <Text size="sm" weight={500}>Description</Text>
      <RichTextEditor value={description} onChange={(value) => setDescription(value)} style={{ minHeight: 200}} />
      {isDescriptionModified && <><Button onClick={saveDescription}>Save</Button><Button variant="default" onClick={resetDescription}>Cancel</Button></>}
    </Grid.Col>
    <Grid.Col span={4}>
      <StatusEdit task={task} />
      Assignees
      Reporter
      Priority
      <Divider my="sm" />
      <Text size="xs">Created {moment(task.createdAt).fromNow()}</Text>
      <Text size="xs">Updated {moment(task.updatedAt).fromNow()}</Text>
    </Grid.Col>
  </Grid>
}
