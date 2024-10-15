'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [fullName] = useState('John Doe');
  const [email] = useState('john@gmail.com');
  const [username] = useState('johnd');
  const [password] = useState('m38rmF$');
  const [showPassword] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ fullName, email, username, password });
  };

  return (
    <div className="flex justify-center items-center my-64 text-black font-jost">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              readOnly
              disabled
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              disabled
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              readOnly
              disabled
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              disabled
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="button" className="mt-1 text-blue-500">
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              type="submit"
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
