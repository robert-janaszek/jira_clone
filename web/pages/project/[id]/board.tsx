import { Center, Grid, Loader, Text } from "@mantine/core";
import * as React from "react";

import { DragDropContext } from "../../../components/dnd";
import { StatusLane } from "../../../components/status-line";
import { Task } from "../../../components/task";
import { updateDropTaskAction } from "../../../store/tasks/actions";
import { useTasks } from "../../../store/tasks/selectors";
import { ITask } from "../../../store/tasks/types";
import { useDispatcher } from "../../../utils/use-dispatcher";
import { AlertTriangle } from 'tabler-icons-react';

const mapTasksForStatus = (tasks: ITask[], taskStatus: string) => (<>
  {tasks
    .filter(({ status }) => status === taskStatus)
    .map(task => <Task id={task.id} index={task.index} key={task.id} />)
  }
</>)

const Board = () => {
  const { tasks, isFetching, isError } = useTasks();
  const updateDropTask = useDispatcher(updateDropTaskAction);

  if (isFetching) {
    return <Center style={{ height: '100%' }}><Loader /></Center>;
  }

  if (isError) {
    return <Center style={{ height: '100%' }}><AlertTriangle /><Text size="sm">Error occured</Text></Center>;
  }

  return <DragDropContext onDragEnd={updateDropTask}>
    <Grid align="stretch" sx={() => ({ position: 'relative', })}>
      <Grid.Col span={3}>
        <StatusLane name="Backlog" id="backlog">
          {mapTasksForStatus(tasks, 'backlog')}
        </StatusLane>
      </Grid.Col>
      <Grid.Col span={3}>
        <StatusLane name="Ready for development" id="ready-for-dev">
          {mapTasksForStatus(tasks, 'ready-for-dev')}
        </StatusLane>
      </Grid.Col>
      <Grid.Col span={3}>
        <StatusLane name="In progress" id="in-progress">
          {mapTasksForStatus(tasks, 'in-progress')}
        </StatusLane>
      </Grid.Col>
      <Grid.Col span={3}>
        <StatusLane name="Done" id="done">
          {mapTasksForStatus(tasks, 'done')}
        </StatusLane>
      </Grid.Col>
    </Grid>
  </DragDropContext>;
}

export default Board;
