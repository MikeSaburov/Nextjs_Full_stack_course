'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Вы успешно вышли!');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-left" reverseOrder={false} />
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">Profile page</p>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Выход из системы
      </button>
    </div>
  );
}
