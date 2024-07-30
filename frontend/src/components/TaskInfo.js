import { useParams } from 'react-router-dom';
import { useTasks } from './contexts/TaskContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskInfo() {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const task = tasks.find(task => task.id === parseInt(id));
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const navigate = useNavigate();

  const handleUpdateTask = () => {
    updateTask(id, { title, description, completed: task.completed });
    navigate('/');
  };

  if (!task) return <div>Task not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Task Info</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <button onClick={handleUpdateTask} className="bg-blue-500 text-white p-2 rounded">Update Task</button>
      <button onClick={() => navigate('/')} className="ml-4 bg-gray-500 text-white p-2 rounded">Back to Home</button>
    </div>
  );
}

export default TaskInfo;
