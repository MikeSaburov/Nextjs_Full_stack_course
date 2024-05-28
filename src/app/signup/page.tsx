'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Регстрация успешна', response.data);
      toast.success('Пользователь создан успешно!');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      console.log('Регистрация не удалась', error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="font-semibold text-2xl">
        {loading ? 'Процесс регистрации' : 'Регистрация'}
      </h1>
      <div className="flex flex-col">
        <br />
        <label htmlFor="username">Имя пользователя</label>
        <input
          className="p-2 rounded-md"
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="введите имя пользователя"
        />

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
        <label htmlFor="password">Веедите пароль</label>
        <input
          className="p-2 rounded-md"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="придумай пароль"
        />
        <br />
        <button
          type="button"
          onClick={onSignup}
          className="py-1  bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white"
        >
          {buttonDisabled
            ? 'Нельзя зарегестрироваться'
            : ' Создать пользователя'}
        </button>
        <Link
          href={'/login'}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Нажми если уже есть учетка!
        </Link>
        <br />
      </div>
    </div>
  );
}
