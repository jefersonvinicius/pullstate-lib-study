import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { Task, TasksStoreActions } from './store';

describe('App', () => {
  beforeEach(() => {
    TasksStoreActions.reset();
  });

  it('should add task to list', () => {
    const { routines } = createSut();

    routines.addTask('My task very cool');

    expect(screen.getByText(/My task very cool/)).toBeInTheDocument();
  });

  it('should clear the task input after to add a task', () => {
    const { elements, routines } = createSut();

    routines.addTask('My task very cool');

    expect(elements.taskInput.value).toBe('');
  });

  it("shouldn't add task with empty text", () => {
    const { routines, elements } = createSut();

    routines.addTask(' ');

    expect(elements.allTasksItems()).toHaveLength(0);
  });

  it('should toggle completed state of task', () => {
    const task: Task = { id: 'id', text: 'Any', completed: false };
    TasksStoreActions.setTasks([task]);

    const { elements } = createSut();

    userEvent.click(elements.taskItem(task.id)!);
    expect(elements.textTask(task.id)).toHaveStyle({ 'text-decoration': 'line-through' });

    userEvent.click(elements.taskItem(task.id)!);
    expect(elements.textTask(task.id)).toHaveStyle({ 'text-decoration': 'none' });
  });

  it('should display tasks stats correctly', () => {
    const tasks: Task[] = [
      { id: 'id1', text: 'Any 1', completed: false },
      {
        id: 'id2',
        text: 'Any 2',
        completed: true,
      },
    ];
    TasksStoreActions.setTasks(tasks);

    const { routines, elements } = createSut();

    expect(screen.getByText(/Total: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Completadas: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Não completadas: 1/)).toBeInTheDocument();

    routines.addTask('Any 2');

    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    expect(screen.getByText(/Completadas: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Não completadas: 2/)).toBeInTheDocument();

    fireEvent.click(elements.taskItem('id1')!);

    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    expect(screen.getByText(/Completadas: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Não completadas: 1/)).toBeInTheDocument();
  });

  it('should delete task from list', () => {
    const tasks: Task[] = [{ id: 'id1', text: 'Any 1', completed: false }];
    TasksStoreActions.setTasks(tasks);

    const { elements } = createSut();

    expect(elements.taskItem('id1')).toBeInTheDocument();
    fireEvent.click(elements.deleteTaskButton('id1'));
    expect(elements.taskItem('id1')).not.toBeInTheDocument();
  });
});

function createSut() {
  render(<App />);

  const taskInput = screen.getByTestId<HTMLInputElement>('task-input');
  const taskItem = (taskId: string) => screen.queryByTestId(`task-${taskId}-item`);
  const textTask = (taskId: string) => screen.getByTestId(`task-${taskId}-text`);
  const allTasksItems = () => screen.queryAllByTestId(/task-.*-item/);
  const deleteTaskButton = (taskId: string) => screen.getByTestId(`task-${taskId}-delete-button`);

  const elements = {
    taskInput,
    taskItem,
    textTask,
    allTasksItems,
    deleteTaskButton,
  };

  const routines = {
    addTask,
  };

  return { elements, routines };

  function addTask(taskText: string) {
    userEvent.type(elements.taskInput, `${taskText}{enter}`);
  }
}
