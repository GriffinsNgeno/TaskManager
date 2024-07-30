import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`tasks/${id}/`);
        setTask(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      await api.patch(`tasks/${id}/`, { title, description });
      setTask({ ...task, title, description });
      setUpdateMessage('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      setUpdateMessage('Error updating task.');
    }

    // To remove the message after 3 seconds
    setTimeout(() => {
      setUpdateMessage('');
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4">
      {task ? (
        <div className="card">
          <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
          <p className="mb-4">{task.description}</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input w-full mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input w-full mb-4"
          />
          <button onClick={handleUpdateTask} className="btn">
            Update Task
          </button>
          {updateMessage && (
            <p className="mt-4 text-green-500">{updateMessage}</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TaskDetails;
