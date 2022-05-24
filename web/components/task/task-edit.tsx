import { Button, Divider, Grid, Text, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";
import { TaskDTO } from "../../module/tasks/types";
import RichTextEditor from '../rte'
import { useQueryClient } from "react-query";
import moment from 'moment';
import { useOptimisticallyUpdateTask } from "../../module/tasks/service";

export interface TaskEditProps {
  task: TaskDTO;
  onClose: (callback: () => void) => void;
}

const useStateIsModified = <T,>(initialState: T) => {
  const [value, setValue] = useState(initialState)
  const [isModified, setModified] = useState(false)
  const setValueModified = useCallback((newValue: T) => {
    if (newValue !== initialState) {
      setValue(newValue)
      if (!isModified) {
        setModified(true)
      }
    }
  }, [isModified, initialState])
  const resetModified = useCallback(() => {
    setModified(false)
  }, [])

  return {
    value,
    setValue: setValueModified,
    isModified,
    resetModified
  }
}

export const TaskEdit = ({ task, onClose }: TaskEditProps) => {
  const updateTaskMutation = useOptimisticallyUpdateTask()
  const { value: title, setValue: setTitle, isModified: isTitleModified, resetModified: resetTitleModified } = useStateIsModified(task.title)
  const { value: description, setValue: setDescription, isModified: isDescriptionModified, resetModified: resetDescriptionModified } = useStateIsModified(task.description)
  const onTitleBlur = useCallback(() => {
    if (isTitleModified) {
      resetTitleModified()
      const updatedTask = {
        ...task,
        title,
      }
      updateTaskMutation.mutate(updatedTask)
    }
  }, [task, title, isTitleModified])
  const onDescriptionSave = useCallback(() => {
    if (isDescriptionModified) {
      resetDescriptionModified()
      const updatedTask = {
        ...task,
        description
      }
      updateTaskMutation.mutate(updatedTask)
    }
  }, [task, description, isDescriptionModified]);
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
        onBlur={onTitleBlur}
      />
      <Text size="sm" weight={500}>Description</Text>
      <RichTextEditor value={description} onChange={(value) => setDescription(value)} style={{ minHeight: 200}} />
      {isDescriptionModified && <><Button onClick={onDescriptionSave}>Save</Button><Button variant="default">Cancel</Button></>}
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
