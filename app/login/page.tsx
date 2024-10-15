'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../components/AuthContext';
import { motion } from 'framer-motion';
import Loading from '../login/loading';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      const user = users.find(
        (user: any) => user.username === username && user.password === password
      );

      if (user) {
        login();
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/');
      } else {
        setError('Invalid username or password.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred. Please try again later.');
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center items-center my-64 text-black font-jost">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-lg border border-slate-600 hover:border-blue-600 hover:bg-transparent hover:text-black"
          >
            Log In
          </motion.button>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="w-full mt-2 font-bold py-2 px-4 rounded-lg border border-slate-600 hover:border-blue-600 hover:bg-transparent hover:text-black"
            >
              Register
            </motion.button>
          </Link>
        </form>
      </div>
    </div>
  );
}
