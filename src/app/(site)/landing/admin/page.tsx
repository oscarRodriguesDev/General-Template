'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Credenciais inválidas');
    } else {
      window.location.href = '/dash/dashboard';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="bg-gray-900 p-10 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login with Email
          </button>
        </form>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dash/dashboard' })}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-110"
          >
            <FcGoogle size={32} />
          </button>
          
          <button
            onClick={() => signIn('facebook')}
            className="p-3 bg-blue-600 rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-110"
          >
            <FaFacebook size={32} className="text-white" />
          </button>

          <button
            onClick={() => signIn('instagram')}
            className="p-3 bg-pink-500 rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-110"
          >
            <FaInstagram size={32} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
