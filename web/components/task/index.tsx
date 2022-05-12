import { Badge, Card, Group, Text, useMantineTheme } from "@mantine/core";
import { Draggable } from "../dnd";
import { SquareCheck, Badge as BadgeIcon, AlertCircle } from 'tabler-icons-react'
import { TaskDTO } from "../../module/tasks/types";


export interface TaskProps {
  task: TaskDTO;
  index: number;
}

export const Task = ({ task, index }: TaskProps) => {

  return <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
    {(dragProvided) => (
      <div
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
      >
        <Card mb="sm" sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        })}>
          <Group position="left">
            <Badge sx={() => ({
              lineHeight: 24,
              height: 24,
            })}>{task.id}</Badge>
            <Text size="sm">Do something</Text>
          </Group>
          <Text>this is it</Text>
          <Group position="apart">
            <TaskType type={task.type} />
            <Badge>Up</Badge>
          </Group>
        </Card>
      </div>
    )}
  </Draggable>
}

const TaskType = ({ type }: { type: string }) => {
  const theme = useMantineTheme()

  if (type === 'story') {
    return <BadgeIcon color={theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[7]} />
  }
  if (type === 'task') {
    return <SquareCheck color={theme.colorScheme === 'dark' ? theme.colors.indigo[9] : theme.colors.indigo[7]} />
  }
  if (type === 'bug') {
    return <AlertCircle color={theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[7]} />
  }

  return null
}