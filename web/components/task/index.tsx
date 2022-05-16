import { Badge, Card, Group, Modal, Text, useMantineTheme } from "@mantine/core";
import { Draggable } from "../dnd";
import { SquareCheck, Badge as BadgeIcon, AlertCircle, ArrowDown, ChevronsDown, ArrowUp, ChevronsUp, Minus } from 'tabler-icons-react'
import { TaskDTO } from "../../module/tasks/types";
import { TaskEdit } from "./task-edit";
import { useModal } from "../../module/modal/service";

export interface TaskProps {
  task: TaskDTO;
  index: number;
}

export const Task = ({ task, index }: TaskProps) => {
  const theme = useMantineTheme()
  const { open, close, onClose, isOpened } = useModal(false)


  return <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
    {(dragProvided) => (
      <div
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
      >
        <Modal
          opened={isOpened}
          onClose={close}
          title={`${task.type.toUpperCase()}: ${task.id}`}
          overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
          overlayOpacity={0.55}
          overlayBlur={3}
          size="70%"
        >
          <TaskEdit task={task} onClose={onClose} />
        </Modal>
        <Card mb="sm" sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        })}
        onClick={() => open()}>
          <Group position="left" mb={5}>
            <Badge sx={() => ({
              lineHeight: 24,
              height: 24,
            })}>{task.id}</Badge>
            <Text size="sm">{task.title}</Text>
          </Group>
          <Group position="apart">
            <TaskType type={task.type} />
            <TaskPriority priority={task.priority} />
          </Group>
        </Card>
      </div>
    )}
  </Draggable>
}

const TaskType = ({ type }: { type: string }) => {
  const theme = useMantineTheme()

  if (type === 'story') {
    return <div>
      <BadgeIcon color={theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[7]} style={{ verticalAlign: 'middle' }} />
      <span style={{ verticalAlign: 'middle' }}>Story</span>
    </div>
  }
  if (type === 'task') {
    return <div>
      <SquareCheck color={theme.colorScheme === 'dark' ? theme.colors.indigo[9] : theme.colors.indigo[7]} style={{ verticalAlign: 'middle' }} />
      <span style={{ verticalAlign: 'middle' }}>Task</span>
    </div>
  }
  if (type === 'bug') {
    return <div>
      <AlertCircle color={theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[7]} style={{ verticalAlign: 'middle' }} />
      <span style={{ verticalAlign: 'middle' }}>Bug</span>
    </div>
  }

  return null
}

const TaskPriority = ({ priority }: { priority: string }) => {
  if (priority === '5') return <ChevronsUp />
  if (priority === '4') return <ArrowUp />
  if (priority === '3') return <Minus />
  if (priority === '2') return <ArrowDown />
  if (priority === '1') return <ChevronsDown />
  return null
}