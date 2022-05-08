import { Center, Grid, Loader, Text, Title } from "@mantine/core";
import * as React from "react";
import { DragDropContext } from "../dnd";

import { AlertTriangle } from 'tabler-icons-react';
import { updateDropTaskAction } from "../../module/tasks/store/actions";
import { useTasks } from "../../module/tasks/service";
import { ITask } from "../../module/tasks/types";
import { useDispatcher } from "../../utils/use-dispatcher";
import { StatusLane } from "../status-line";
import { Task } from "../task";

const mapTasksForStatus = (tasks: ITask[], taskStatus: string) => (<>
  {tasks
    .filter(({ status }) => status === taskStatus)
    .map(task => <Task id={task.key} index={task.index} key={task.key} />)
  }
</>)

// TODO: fix dnd. It doesn't work after going to this page via link
export const ProjectBoard = () => {
  const { tasks, isFetching, isError, isLoaded } = useTasks();
  const updateDropTask = useDispatcher(updateDropTaskAction);

  if (isFetching || !isLoaded) {
    return <Center style={{ height: '100%' }}><Loader /></Center>;
  }

  if (isError) {
    return <Center style={{ height: '100%' }}><AlertTriangle /><Text size="sm">Error occured</Text></Center>;
  }

  return <>
    <DragDropContext onDragEnd={updateDropTask}>
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
    </DragDropContext>
  </>;
}
