import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskFormValues } from '../components/TaskTypes';





export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchTasks = () => {
    if (token) {
      axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setTasks(response.data);
          setTotalPages(response.data.totalPages);
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const handleRegisterSuccess = (newToken: string) => {
    setToken(newToken);
    fetchTasks();
    setShowLogin(true);
    toast.success('Registration and login successful!');
  };

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    fetchTasks();
  };

  const handleLogout = () => {
    setToken(null);
  };

  const handleAddTask = (newTask: Task) => {
    axios.post('http://localhost:5000/api/tasks', newTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        fetchTasks();
        toast.success('Task added successfully');
      })
      .catch(error => {
        console.error('Error adding task:', error);
        toast.error('Error adding task');
      });
  };

  const handleMarkCompleted = (taskId: string) => {
    axios.put(`http://localhost:5000/api/tasks/${taskId}`, { isCompleted: true }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        fetchTasks();
        toast.success('Task marked as completed');
      })
      .catch(error => {
        console.error('Error marking task as completed:', error);
        toast.error('Error marking task as completed');
      });
  };

  const handleDeleteTask = (taskId: string) => {
    axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        fetchTasks();
        toast.success('Task deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        toast.error('Error deleting task');
      });
  };

  const handleTaskFormSubmit = (newTaskValues: TaskFormValues) => {
    const newTask: Task = {
      _id: '',
      isCompleted: false,
      ...newTaskValues,
    };

    handleAddTask(newTask);
  };


  return (
    <div>
      <ToastContainer />
      <h1 className='text-center'>Task Management App</h1>
      {!token && (
        <div>
          {showLogin ? (
            <RegisterForm
              onRegisterSuccess={handleRegisterSuccess}
              onLoginClick={() => setShowLogin(false)}
            />
          ) : (
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              onRegisterClick={() => setShowLogin(true)}
            />
          )}
        </div>
      )}
      {token && (
        <div className='pl-10 pt-10'>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <TaskForm
            onSubmit={handleTaskFormSubmit} />
          <h2 >Task List</h2>
          <TaskList
            tasks={tasks}
            onMarkCompleted={handleMarkCompleted}
            onDeleteTask={handleDeleteTask}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;