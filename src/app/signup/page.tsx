'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });

  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="font-semibold text-2xl">Зарегестрируйся</h1>
      <hr />
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
      <hr />
      <br />
      <label htmlFor=" email">Адрес эл. почты</label>
      <input
        className="p-2 rounded-md"
        type="text"
        name=" email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="example@example.com"
      />
      <hr />
      <br />
      <label htmlFor="password">Веедите пароль</label>
      <input
        className="p-2 rounded-md"
        type="text"
        name="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="придумай пароль"
      />
    </div>
  );
}
