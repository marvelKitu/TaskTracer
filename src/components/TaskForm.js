import React, { useState } from 'react';

const TaskForm = ({ onAddTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Pending'); // State for task status
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('P0');

  const getNextDayDate = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    return currentHour >= 12 ? nextDay.toISOString().split('T')[0] : currentDate.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(endDate) < new Date(startDate)) {
      alert('End date cannot be before start date');
      return;
    }
    const newTask = {
      title,
      description,
      startDate,
      endDate: status === 'Completed' ? endDate : '', // Include end date only if status is 'Completed'
      status,
      assignee,
      priority
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setEndDate('');
    setStatus('Pending');
    setAssignee('');
    setPriority('P0');
    setStartDate(getNextDayDate());
  };

  useState(() => {
    setStartDate(getNextDayDate());
  }, []);

  return (
    <div className="task-form-container">
      <h2>Create Task</h2>
      <span className="close" onClick={onClose}>&times;</span> {/* Close button */}
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" value={startDate} disabled />
        </div>
        {status === 'Completed' && (
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignee">Assignee:</label>
          <input type="text" id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
