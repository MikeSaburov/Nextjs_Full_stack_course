'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing');
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

  const getUserDetails =  async  ()  =>  {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-left" reverseOrder={false} />
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">Profile page</p>
      <h2 className='p-3 rounded bg-green-500'>{data === 'nothing' ? 'Данных нет' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Выход из системы
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
       Получение сведений о пользователе
      </button>
    </div>
  );
}
