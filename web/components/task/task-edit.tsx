import { Divider, Grid, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { TaskDTO } from "../../module/tasks/types";
import RichTextEditor from '../rte'
import { useQueryClient } from "react-query";
import moment from 'moment';

export interface TaskEditProps {
  task: TaskDTO;
  onClose: (callback: () => void) => void;
}

export const TaskEdit = ({ task, onClose }: TaskEditProps) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
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
      />
      <Text size="sm" weight={500}>Description</Text>
      <RichTextEditor value={description} onChange={(value) => setDescription(value)} style={{ minHeight: 200}} />
    </Grid.Col>
    <Grid.Col span={4}>
      Status
      Assignees
      Reporter
      Priority
      <Divider my="sm" />
      <Text size="xs">Created {moment(task.createdAt).fromNow()}</Text>
      <Text size="xs">Updated {moment(task.updatedAt).fromNow()}</Text>
    </Grid.Col>
  </Grid>
}
