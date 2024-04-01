import React, { useState } from 'react';
import './TaskList.css'; // Import CSS for styling
import EditTaskForm from './EditTaskForm';

const TaskList = ({ tasks, onDeleteTask }) => {
  const [editTask, setEditTask] = useState(null);

  const handleEditClick = (task) => {
    setEditTask(task);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  // Task card component
  const TaskCard = ({ task, index }) => (
    <div key={index} className="task-card">
      <h3>{task.title}</h3>
      <p className="description">{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Assignee: {task.assignee}</p>
      <p>Priority: {task.priority}</p>
      <div className="button-container">
        <button onClick={() => onDeleteTask(index)}>Delete</button>
        <button onClick={() => handleEditClick(task)}>Edit</button>
      </div>
      {/* Render modal for the task */}
      {editTask && editTask === task && <EditTaskForm task={editTask} onSave={handleCancelEdit} onCancel={handleCancelEdit} />}
    </div>
  );

  return (
    <div className="task-list">
      <div className="task-row">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
