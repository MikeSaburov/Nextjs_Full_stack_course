'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Вход успешен', response.data);
      toast.success('Вы вошли в систему!');
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
    } catch (error: any) {
      console.log('Неверный логин', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="font-semibold text-2xl">Войти</h1>
      <div className="flex flex-col">
        <Toaster position="top-left" reverseOrder={false} />
        {/* <br />
        <label htmlFor="username">Имя пользователя</label>
        <input
          className="p-2 rounded-md"
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="введите имя пользователя"
        /> */}

        <br />
        <label htmlFor=" email">Адрес эл. почты</label>
        <input
          className="p-2 rounded-md"
          type="email"
          name=" email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="example@example.com"
        />

        <br />
        <label htmlFor="password">Введите пароль</label>
        <input
          className="p-2 rounded-md"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="введи пароль"
        />
        <br />
        <button
          type="button"
          onClick={onLogin}
          className="py-1  bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white"
        >
          Войти
        </button>
        <Link
          href={'/signup'}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Нажми если еще нет учетки!
        </Link>
        <br />
      </div>
    </div>
  );
}
