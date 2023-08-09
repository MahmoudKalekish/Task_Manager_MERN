import React, { useState } from 'react';
import TaskListItem from './TaskListItem';
import { useSelector } from 'react-redux';

interface TaskListProps {
  tasks: {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
  }[];

  onMarkCompleted: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PAGE_SIZE = 20;


const TaskList: React.FC<TaskListProps> = ({ tasks, onMarkCompleted, onDeleteTask, currentPage, totalPages, onPageChange }) => {

  const [sortBy, setSortBy] = useState<'dueDate' | 'completionStatus' | null>(null);
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);

  const sortedTasks = [...tasks];

  if (sortBy === 'dueDate') {
    sortedTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  } else if (sortBy === 'completionStatus') {
    sortedTasks.sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1));
  }

  const filteredTasks = filterCompleted !== null ? sortedTasks.filter(task => task.isCompleted === filterCompleted) : sortedTasks;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const displayedTasks = filteredTasks.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="grid gap-4 mt-4">
      <div>
        <label>
          Sort by:
          <select
            value={sortBy || ''}
            onChange={e => setSortBy(e.target.value as 'dueDate' | 'completionStatus')}>
            <option value="">None</option>
            <option value="dueDate">Due Date</option>
            <option value="completionStatus">Completion Status</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Filter by completion status:
          <select
            value={filterCompleted !== null ? filterCompleted.toString() : ''}

            onChange={e => setFilterCompleted(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}>
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </label>
      </div>
      {displayedTasks.length > 0 ? (
        displayedTasks.map(task => (
          <TaskListItem
            key={task._id}
            task={task}
            onMarkCompleted={onMarkCompleted}
            onDeleteTask={onDeleteTask}
          />
        ))
      ) : (
        <p>No tasks available.</p>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={index + 1 === currentPage ? 'active' : ''}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
