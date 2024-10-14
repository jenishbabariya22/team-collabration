import { useState, useEffect } from 'react';
import { useStateContext } from '../../context/StateContext'; // Import your context

function AdminDashboard() {
  const { state } = useStateContext();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Load user's tasks from localStorage (assuming tasks are stored per user)
    const userTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const userTasksFiltered = userTasks.filter(task => task.userEmail === user.email);
    setTasks(userTasksFiltered);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Registered Users</h2>
        <ul className="mt-2">
          {users.map(user => (
            <li
              key={user.email}
              className="p-2 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => handleUserSelect(user)}
            >
              {user.email}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Tasks for {selectedUser.email}</h2>
          <TaskManagement tasks={tasks} selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
}

// TaskManagement Component to handle tasks for the selected user
const TaskManagement = ({ tasks, selectedUser }) => {
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    const newTask = {
      description: taskDescription,
      userEmail: selectedUser.email,
    };
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    existingTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
    setTaskDescription('');
  };

  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Add a new task"
          className="border rounded w-full py-2 px-3 mb-3"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li key={index} className="p-2 border-b">
            {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
