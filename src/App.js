import React, { useState, useMemo } from 'react';
import EditTaskForm from './components/EditTaskForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import './Styles.css';

function App() {
  const [tasks, setTasks] = useState({
    pending: [],
    inprogress: [],
    completed: [],
    deployed: [],
    deferred: []
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [sortByPriority, setSortByPriority] = useState(false);

  const addTask = (newTask) => {
    const taskStatus = newTask.status.toLowerCase();
    setTasks((prevTasks) => {
      if (prevTasks.hasOwnProperty(taskStatus)) {
        return {
          ...prevTasks,
          [taskStatus]: [...prevTasks[taskStatus], newTask]
        };
      } else {
        return {
          ...prevTasks,
          pending: [...prevTasks.pending, newTask]
        };
      }
    });
    setShowTaskForm(false);
  };

  const deleteTask = (status, index) => {
    // Display confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks[status]];
        updatedTasks.splice(index, 1);
        return {
          ...prevTasks,
          [status]: updatedTasks
        };
      });
    }
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setShowEditForm(true);
  };

  const handleSaveEdit = (editedTask) => {
    // Handle save action
    setShowEditForm(false);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  // Filter and sort tasks based on filter criteria
  const filteredTasks = useMemo(() => {
    const filteredTasksByPriority = Object.entries(tasks).reduce((filtered, [status, taskList]) => {
      const filteredTaskList = taskList.filter(task => {
        return (
          (!assigneeFilter || task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())) &&
          (!priorityFilter || task.priority.toLowerCase() === priorityFilter.toLowerCase()) &&
          (!startDateFilter || task.startDate === startDateFilter) &&
          (!endDateFilter || task.endDate === endDateFilter)
        );
      });
      return { ...filtered, [status]: filteredTaskList };
    }, {});

    if (sortByPriority) {
      for (const status in filteredTasksByPriority) {
        filteredTasksByPriority[status].sort((a, b) => {
          return a.priority.localeCompare(b.priority);
        });
      }
    }

    return filteredTasksByPriority;
  }, [tasks, assigneeFilter, priorityFilter, startDateFilter, endDateFilter, sortByPriority]);

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div className="logo-container">
        <img src="logo.png" alt="Login" className="logo" />
      </div>
      <div className="header">
        <button onClick={() => setShowTaskForm(true)}>Add Task</button>
        {showTaskForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowTaskForm(false)}>&times;</span>
              <TaskForm onAddTask={addTask} onClose={() => setShowTaskForm(false)} />
            </div>
          </div>
        )}
        <label className="sort-checkbox">
          Sort by Priority:
          <input type="checkbox" checked={sortByPriority} onChange={() => setSortByPriority(!sortByPriority)} />
        </label>
      </div>
      <div className="filters">
        <input type="text" placeholder="Filter by Assignee" value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)} className="filter-input" />
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="filter-select">
          <option value="">Filter by Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        <input type="date" placeholder="Start Date" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} className="filter-input" />
        <input type="date" placeholder="End Date" value={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} className="filter-input" />
      </div>
      <div className="task-columns">
        {Object.entries(filteredTasks).map(([status, taskList]) => (
          <div key={status} className={`task-column ${status}`}>
            <h2>{status.toUpperCase()}</h2>
            <TaskList tasks={taskList} onDeleteTask={(index) => deleteTask(status, index)} onEditTask={handleEditClick} />
          </div>
        ))}
      </div>
      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelEdit}>&times;</span>
            <EditTaskForm task={editTask} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
