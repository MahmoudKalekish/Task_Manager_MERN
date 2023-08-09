import React from 'react';
import { useDispatch } from 'react-redux';
import { markTaskCompleted, deleteTask } from '../redux/tasksSlice';

interface TaskListItemProps {
  task: {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
  };
  onMarkCompleted: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onMarkCompleted, onDeleteTask }) => {
  const dispatch = useDispatch();

  const handleCompleteTask = () => {
    dispatch(markTaskCompleted(task._id));
    onMarkCompleted(task._id);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task._id));
    onDeleteTask(task._id);
  };

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''} max-w-md mx-auto p-4 border rounded shadow`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      {!task.isCompleted && (
        <button
          onClick={handleCompleteTask}
          className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mark Completed
        </button>
      )}
      <button
        onClick={handleDeleteTask}
        className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskListItem;
