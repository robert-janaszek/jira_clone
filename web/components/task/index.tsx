import { Badge, Card, Group, Text } from "@mantine/core";
import { Draggable } from "../dnd";


export interface TaskProps {
  id: string;
  index: number;
}

export const Task = ({ id, index }: TaskProps) => (
  <Draggable draggableId={id} index={index}>
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
            })}>{id}</Badge>
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
