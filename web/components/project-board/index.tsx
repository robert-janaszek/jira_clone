import { Center, Grid, Loader, Text } from "@mantine/core";
import * as React from "react";
import { DragDropContext } from "../dnd";

import { AlertTriangle } from 'tabler-icons-react';
import { useOrderedTasks, useTasks } from "../../module/tasks/service";
import { TaskDTO } from "../../module/tasks/types";
import { StatusLane } from "../status-line";
import { Task } from "../task";
import { useTaskDrop } from "../../module/tasks/dnd-service";

const mapTasksForStatus = (tasks: TaskDTO[], taskStatus: string) => (<>
  {tasks
    .filter(({ status }) => status === taskStatus)
    .map((task, index) => <Task task={task} index={index} key={task.id} />)
  }
</>)

export const ProjectBoard = () => {
  const { isFetching, isError } = useTasks()
  const tasks = useOrderedTasks()
  const onTaskDrop = useTaskDrop()

  if (isFetching && !tasks) {
    return <Center style={{ height: '100%' }}><Loader /></Center>
  }

  if (isError) {
    return <Center style={{ height: '100%' }}><AlertTriangle /><Text size="sm">Error occured</Text></Center>
  }

  if (!tasks) {
    return <Center style={{ height: '100%' }}><AlertTriangle /><Text size="sm">Tasks were not loaded</Text></Center>
  }

  return <>
    <DragDropContext onDragEnd={onTaskDrop}>
      <Grid align="stretch" sx={() => ({ position: 'relative' })}>
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
  </>
}
