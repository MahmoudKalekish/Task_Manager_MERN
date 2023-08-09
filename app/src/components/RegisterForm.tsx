import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterFormProps {
  onRegisterSuccess: (token: string) => void;
  onLoginClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onLoginClick }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const userData = { username, email, password };
    axios.post('http://localhost:5000/api/auth/register', userData)
      .then(response => {
        const token = response.data.token;
        toast.success('User registered successfully');
        onRegisterSuccess(token);
      })
      .catch(error => {
        console.error('Error registering user:', error);
        toast.error('Error registering user');
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 m-32 border rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
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
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="mt-2 text-center text-sm">
        Already have an account?{' '}
        <button
          className="text-blue-500 hover:underline"
          onClick={onLoginClick}
        >
          Login
        </button>
      </p>    </div>
  );
};

export default RegisterForm;
