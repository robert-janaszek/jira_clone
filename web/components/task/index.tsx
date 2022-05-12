import { Badge, Card, Group, Text } from "@mantine/core";
import { Draggable } from "../dnd";


export interface TaskProps {
  taskId: string;
  index: number;
}

export const Task = ({ taskId, index }: TaskProps) => (
  <Draggable draggableId={taskId} index={index} key={taskId}>
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
            })}>{taskId}</Badge>
            <Text size="sm">Do something</Text>
          </Group>
          <Text>this is it</Text>
          <Group position="apart">
            <Text>Task</Text>
            <Badge>Up</Badge>
          </Group>
        </Card>
      </div>
    )}
  </Draggable>
);
