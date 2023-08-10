import React, { useState } from 'react';
import { TaskFormValues } from './TaskTypes';

interface TaskEditFormProps {
    task: TaskFormValues;
    onCancel: () => void;
    onSave: (updatedTask: TaskFormValues) => void;
    onEditTask: (taskId: string) => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onCancel, onSave, onEditTask }) => {
    const [editedTask, setEditedTask] = useState<TaskFormValues>({ ...task });

    const handleFieldChange = (fieldName: keyof TaskFormValues, value: string) => {
        setEditedTask(prevTask => ({
            ...prevTask,
            [fieldName]: value,
        }));
    };

    const handleSaveClick = () => {
        onSave(editedTask);
        onEditTask("");
    };

    const handleCancelClick = () => {
        onCancel();
        onEditTask("");
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2>Edit Task</h2>
            <input
                type="text"
                value={editedTask.title}
                onChange={e => handleFieldChange('title', e.target.value)}
                className="w-full p-2 mb-2 border rounded"
            />
            <textarea
                value={editedTask.description}
                onChange={e => handleFieldChange('description', e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Description"
            />
            <input
                type="date"
                value={editedTask.dueDate}
                onChange={e => handleFieldChange('dueDate', e.target.value)}
                className="w-full p-2 mb-2 border rounded"
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSaveClick}
            >
                Save
            </button>
            <button
                className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    );
};

export default TaskEditForm;
