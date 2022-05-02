import { Card, Text } from "@mantine/core";
import { Droppable } from "../dnd";

export interface StatusLaneProps {
  name: string;
  id: string;
}

export const StatusLane = ({ children, name, id }: React.PropsWithChildren<StatusLaneProps>) => (
  <Droppable droppableId={id} key={id}>
    {(dropProvided, dropSnapshot) => (
      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
        <Card sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
          height: '100%'
        })}>
          <Card.Section p="sm">
            <Text>{name}</Text>
          </Card.Section>
          {children}
          {dropProvided.placeholder}
        </Card>
      </div>
    )}
  </Droppable>
);