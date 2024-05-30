import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //проверяем есть ли пользователь в системе
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не существует' },
        { status: 400 }
      );
    }

    //проверяем правильность пароля
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Неправильный пароль' },
        { status: 400 }
      );
    }
    //создать данный для токенов
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    //создать токен
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
