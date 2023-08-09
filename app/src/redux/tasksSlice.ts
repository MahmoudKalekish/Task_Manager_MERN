import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { Dispatch } from 'redux';


interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    markTaskCompleted: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task._id === action.payload);
      if (task) {
        task.isCompleted = true;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
  },
});

export const { addTask, markTaskCompleted, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;

export const fetchTasks = (): AppThunk => async (dispatch: any) => {
  try {
    const response = await fetch('https://tasks-1njw.onrender.com/api/tasks');
    const data = await response.json();
    dispatch(addTask(data));
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};
