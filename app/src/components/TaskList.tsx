import React, { useState } from 'react';
import TaskListItem from './TaskListItem';
import { useSelector } from 'react-redux';
import { Task } from '@/pages';
import TaskEditForm from './TaskEditForm';
import { TaskFormValues } from './TaskTypes';

interface TaskListProps {
  tasks: {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
  }[];

  onMarkCompleted: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;

  isEditing: boolean;
  editingTask: Task | null;
  setIsEditing: (isEditing: boolean) => void;
  handleSaveEditedTask: (updatedTask: TaskFormValues) => void;
  handleEditTask: (taskId: string) => void;
}

const PAGE_SIZE = 20;


const TaskList: React.FC<TaskListProps> = ({ tasks, onMarkCompleted, onEditTask, onDeleteTask, currentPage, totalPages, onPageChange,
  isEditing,
  editingTask,
  setIsEditing,
  handleSaveEditedTask,
  handleEditTask, }) => {

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
    <div className="grid gap-4 mt-4 ">
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
      <div className='flex flex-wrap gap-9'>
        {displayedTasks.length > 0 ? (
          displayedTasks.map(task => (
            <div key={task._id}>
              <TaskListItem
                task={task}
                onMarkCompleted={onMarkCompleted}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
              {isEditing && editingTask && editingTask._id === task._id && (
                <TaskEditForm
                  task={editingTask}
                  onCancel={() => setIsEditing(false)}
                  onSave={handleSaveEditedTask}
                  onEditTask={handleEditTask}
                />
              )}
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}

      </div>
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
