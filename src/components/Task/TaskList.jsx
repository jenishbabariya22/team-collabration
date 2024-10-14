import { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([
    { title: 'Task 1', priority: 'high', dueDate: '2024-10-15' },
    { title: 'Task 2', priority: 'low', dueDate: '2024-10-20' },
  ]);

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item p-2 border mb-2">
          <h3>{task.title}</h3>
          <p>{task.priority}</p>
          <p>{task.dueDate}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
