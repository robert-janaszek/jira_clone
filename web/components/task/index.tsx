import { Badge, Card, Grid, Group, Modal, Text, useMantineTheme } from "@mantine/core";
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
          title={<><TaskType type={task.type} /><div style={{ display: 'inline-block', lineHeight: '24px', verticalAlign: 'top', marginLeft: 4 }}> {task.id}</div></>}
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
          <Group mb={5} style={{ flexWrap: 'nowrap' }}>
            <Badge sx={() => ({
              lineHeight: '24px',
              height: 24,
              minWidth: 30,
            })}>{task.id}</Badge>
            <Text style={{ flexGrow: 1 }} size="sm">{task.title}</Text>
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
  const containerStyle = { display: 'inline-block' }
  const taskItemsStyle = { display: 'inline-block', verticalAlign: 'top', lineHeight: '24px' }

  if (type === 'story') {
    return <div style={containerStyle}>
      <BadgeIcon color={theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[7]} style={taskItemsStyle} />
      <span style={taskItemsStyle}>Story</span>
    </div>
  }
  if (type === 'task') {
    return <div style={containerStyle}>
      <SquareCheck color={theme.colorScheme === 'dark' ? theme.colors.indigo[9] : theme.colors.indigo[7]} style={taskItemsStyle} />
      <span style={taskItemsStyle}>Task</span>
    </div>
  }
  if (type === 'bug') {
    return <div style={containerStyle}>
      <AlertCircle color={theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[7]} style={taskItemsStyle} />
      <span style={taskItemsStyle}>Bug</span>
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