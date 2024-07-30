import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchTasks = async () => {
      try {
        const response = await api.get('tasks/');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const newTask = { title, description };
      const response = await api.post('tasks/', newTask);
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.patch(`tasks/${id}/`, { completed: true });
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <div className="container mx-auto p-4">

      {/* Header with login/logout button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Tasks</h1>
        {isLoggedIn && (
          <button onClick={handleLogout} className="btn bg-red-500 hover:bg-red-600">
            Logout
          </button>
        )}
      </div>

      {/* Task Creation Form */}
      {isLoggedIn ? (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
          <div className="mb-4 flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="input w-full"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              className="input w-full h-32"
            />
            <button onClick={handleAddTask} className="btn w-full">
              Add Task
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <p className="text-center">Please <Link to="/Auth" className="text-blue-600 hover:underline">Login/Signup</Link> to manage tasks.</p>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="card flex flex-col gap-4">
                <Link to={`/task/${task.id}`} className="text-lg font-bold text-blue-600">
                  {task.title}
                </Link>
                <p>{task.description}</p>
                {isLoggedIn && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className={`btn mt-2 ${task.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                  >
                    {task.completed ? 'Completed' : 'Mark as Complete'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500"></p>
        )}
      </div>
    </div>
  );
};

export default Home;
