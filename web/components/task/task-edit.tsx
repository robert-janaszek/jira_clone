import { Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { TaskDTO } from "../../module/tasks/types";
import RichTextEditor from '../rte'

export interface TaskEditProps {
  task: TaskDTO;
}

export const TaskEdit = ({ task }: TaskEditProps) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  return <div>
    <TextInput
      placeholder="Task title"
      label="Title"
      required
      value={title}
      onChange={(event) => setTitle(event.currentTarget.value)}
      onBlur={() => console.log('save this')}
    />
    <Text>Description</Text>
    <RichTextEditor value={description} onChange={(value) => setDescription(value)} />
  </div>
}
