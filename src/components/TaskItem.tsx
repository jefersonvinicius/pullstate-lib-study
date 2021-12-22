import React from 'react';
import { Task, TasksStoreActions } from '../store';

type Props = {
  task: Task;
};

export default function TaskItem({ task }: Props) {
  const className = ['task', task.completed ? 'task-completed' : ''].join(' ');

  return (
    <div
      className={className}
      data-testid={`task-${task.id}-item`}
      onClick={() => TasksStoreActions.toggleTaskCompleted(task.id)}
    >
      <div className="task-info">
        <div className="active-indicator" style={{ backgroundColor: task.completed ? '#999' : 'cornflowerblue' }} />
        <span
          className="task-text"
          data-testid={`task-${task.id}-text`}
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
          {task.text}
        </span>
      </div>
      <button
        className="delete-button"
        data-testid={`task-${task.id}-delete-button`}
        onClick={() => TasksStoreActions.deleteTask(task.id)}
      >
        REMOVER
      </button>
    </div>
  );
}
