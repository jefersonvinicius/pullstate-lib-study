import { Store } from 'pullstate';
import { v4 as uuid } from 'uuid';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

interface ITasksStore {
  tasks: Task[];
}

export const TasksStore = new Store<ITasksStore>({
  tasks: [],
});

export function useTasks() {
  return TasksStore.useState((state) => state.tasks);
}

export function useTasksStats() {
  return TasksStore.useState((state) => {
    const numberOfCompleted = state.tasks.filter((t) => t.completed).length;

    return {
      total: state.tasks.length,
      numberOfCompleted,
      numberOfNotCompleted: state.tasks.length - numberOfCompleted,
    };
  });
}
export class TasksStoreActions {
  static addNewTask(text: string) {
    TasksStore.update((state) => {
      state.tasks.push(createNewTask(text));
    });
  }

  static toggleTaskCompleted(taskId: string) {
    TasksStore.update((state) => {
      const taskToUpdate = state.tasks.find((t) => t.id === taskId);
      if (!taskToUpdate) return;

      taskToUpdate.completed = !taskToUpdate.completed;
    });
  }

  static deleteTask(taskId: string) {
    TasksStore.update((state) => {
      const index = state.tasks.findIndex((t) => t.id === taskId);
      if (index === -1) return;

      state.tasks.splice(index, 1);
    });
  }

  static setTasks(tasks: Task[]) {
    TasksStore.update((state) => {
      state.tasks = tasks;
    });
  }

  static reset() {
    TasksStore.update((state) => {
      state.tasks = [];
    });
  }
}

function createNewTask(text: string): Task {
  return {
    completed: false,
    id: uuid(),
    text,
  };
}
