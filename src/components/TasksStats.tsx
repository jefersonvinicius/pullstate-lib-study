import { useTasksStats } from '../store';

export default function TasksStats() {
  const stats = useTasksStats();

  return (
    <div className="tasks-stats">
      <h3>Estatísticas</h3>
      <p>Total: {stats.total}</p>
      <p>Completadas: {stats.numberOfCompleted}</p>
      <p>Não completadas: {stats.numberOfNotCompleted}</p>
    </div>
  );
}
