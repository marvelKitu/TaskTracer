import React, { useState, useEffect } from 'react';

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task || {}); // Ensure task is defined

  useEffect(() => {
    setEditedTask(task || {});
  }, [task]); // Update editedTask when task prop changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <div className="edit-task-form-container">
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <h2>Edit Task</h2>
        <label>Title:</label>
        <input type="text" name="title" value={editedTask.title || ''} onChange={handleInputChange} disabled />
        <label>Description:</label>
        <textarea name="description" value={editedTask.description || ''} onChange={handleInputChange} disabled />
        <label>Assignee:</label>
        <input type="text" name="assignee" value={editedTask.assignee || ''} onChange={handleInputChange} disabled />
        <label>Status:</label>
        <select name="status" value={editedTask.status || ''} onChange={handleInputChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <label>Priority:</label>
        <select
          name="priority"
          value={editedTask.priority || ''}
          onChange={handleInputChange}
        >
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        <div className="button-container">
          <button type="submit" onClick={handleSubmit}>Save</button>
          <button type="submit" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
