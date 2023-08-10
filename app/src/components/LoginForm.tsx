import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  onRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userData = { email, password };
    axios.post('https://tasks-1njw.onrender.com/api/auth/login', userData)
      .then(response => {
        const token = response.data.token;
        toast.success('Login successful');
        onLoginSuccess(token);
      })
      .catch(error => {
        console.error('Error logging in:', error);
        toast.error('Error logging in');
      });
  };


  return (
    <div className="max-w-md mx-auto p-4 m-32 border rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="mt-2 text-center text-sm">
        {"Don't have an account?"}{' '}
        <button
          className="text-blue-500 hover:underline"
          onClick={onRegisterClick}
        >
          Register
        </button>
      </p>    </div>
  );
};

export default LoginForm;