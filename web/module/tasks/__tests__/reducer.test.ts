import { DropResult } from "react-beautiful-dnd";
import { updateDropTaskAction } from "../store/actions";
import { TasksReducer } from "../store/reducer";
import { initialTasks } from "./data";

const initialState = {
  isFetching: false,
  isError: false,
  tasks: initialTasks,
}

describe('TestsReducer', () => {
  it('Should reorder tasks in the same status', () => {
    const drag = { draggableId: 'TASK-2', destination: { droppableId: 'backlog', index: 3 } } as any as DropResult;
    const action = updateDropTaskAction(drag);
    const newState = TasksReducer(initialState, action);
    const backlogTasks = newState.tasks.filter(task => task.status === 'backlog');

    expect(backlogTasks).toEqual([
      { id: 'TASK-1', index: 1, status: 'backlog', },
      { id: 'TASK-3', index: 2, status: 'backlog', },
      { id: 'TASK-2', index: 3, status: 'backlog', },
      { id: 'TASK-4', index: 4, status: 'backlog', },
    ]);
  });

  it('Should reorder first task within one status', () => {
    const drag = { draggableId: 'TASK-1', destination: { droppableId: 'backlog', index: 3 } } as any as DropResult;
    const action = updateDropTaskAction(drag);
    const newState = TasksReducer(initialState, action);
    const backlogTasks = newState.tasks.filter(task => task.status === 'backlog');
    
    expect(backlogTasks).toEqual([
      { id: 'TASK-2', index: 1, status: 'backlog', },
      { id: 'TASK-3', index: 2, status: 'backlog', },
      { id: 'TASK-1', index: 3, status: 'backlog', },
      { id: 'TASK-4', index: 4, status: 'backlog', },
    ]);
  });

  it('Should reorder last task within one status', () => {
    const drag = { draggableId: 'TASK-4', destination: { droppableId: 'backlog', index: 1 } } as any as DropResult;
    const action = updateDropTaskAction(drag);
    const newState = TasksReducer(initialState, action);
    const backlogTasks = newState.tasks.filter(task => task.status === 'backlog');
    
    expect(backlogTasks).toEqual([
      { id: 'TASK-4', index: 1, status: 'backlog', },
      { id: 'TASK-1', index: 2, status: 'backlog', },
      { id: 'TASK-2', index: 3, status: 'backlog', },
      { id: 'TASK-3', index: 4, status: 'backlog', },
    ]);
  });

  it('Should reorder task between statuses', () => {
    const drag = { draggableId: 'TASK-2', destination: { droppableId: 'ready-for-dev', index: 6 } } as any as DropResult;
    const action = updateDropTaskAction(drag);
    const newState = TasksReducer(initialState, action);
    const backlogTasks = newState.tasks.filter(task => task.status === 'backlog');
    const readyForDevTasks = newState.tasks.filter(task => task.status === 'ready-for-dev');
    
    expect(backlogTasks).toEqual([
      { id: 'TASK-1', index: 1, status: 'backlog', },
      { id: 'TASK-3', index: 2, status: 'backlog', },
      { id: 'TASK-4', index: 3, status: 'backlog', },
    ]);
    expect(readyForDevTasks).toEqual([
      { id: 'TASK-5', index: 5, status: 'ready-for-dev', },
      { id: 'TASK-2', index: 6, status: 'ready-for-dev', },
      { id: 'TASK-6', index: 7, status: 'ready-for-dev', },
      { id: 'TASK-7', index: 8, status: 'ready-for-dev', },
    ]);
  });

  it('Should reorder task at the end of different status', () => {
    const drag = { draggableId: 'TASK-2', destination: { droppableId: 'ready-for-dev', index: 8 } } as any as DropResult;
    const action = updateDropTaskAction(drag);
    const newState = TasksReducer(initialState, action);
    const backlogTasks = newState.tasks.filter(task => task.status === 'backlog');
    const readyForDevTasks = newState.tasks.filter(task => task.status === 'ready-for-dev');
    
    expect(backlogTasks).toEqual([
      { id: 'TASK-1', index: 1, status: 'backlog', },
      { id: 'TASK-3', index: 2, status: 'backlog', },
      { id: 'TASK-4', index: 3, status: 'backlog', },
    ]);
    expect(readyForDevTasks).toEqual([
      { id: 'TASK-5', index: 5, status: 'ready-for-dev', },
      { id: 'TASK-6', index: 6, status: 'ready-for-dev', },
      { id: 'TASK-7', index: 7, status: 'ready-for-dev', },
      { id: 'TASK-2', index: 8, status: 'ready-for-dev', },
    ]);
  });
});
