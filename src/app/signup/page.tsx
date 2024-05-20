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
      <div className="border border-red-600 p-5 rounded-lg">
        <h1>Войти</h1>
      </div>
    </div>
  );
}
