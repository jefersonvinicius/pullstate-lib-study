import React, { FormEvent, useRef } from 'react';
import './App.css';
import TaskItem from './components/TaskItem';
import TasksStats from './components/TasksStats';
import { TasksStoreActions, useTasks } from './store';

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const tasks = useTasks();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const taskText = (inputRef.current?.value ?? '').trim();
    if (taskText === '') return;

    TasksStoreActions.addNewTask(taskText);

    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="app">
      <div className="content">
        <div className="right-side">
          <div className="header">
            <form onSubmit={handleSubmit} data-testid="task-form">
              <input ref={inputRef} data-testid="task-input" placeholder="Digite sua tarefa e pressione enter..." />
            </form>
          </div>
          <div className="tasks-list">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
        <div className="left-side">
          <TasksStats />
        </div>
      </div>
    </div>
  );
}
