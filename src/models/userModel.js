import { verify } from 'crypto';
import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = await mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Пожадуйста введите имя пользователя'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Пожадуйста введите email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Пожадуйста введите пароль'],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPaaswordToken: String,
  forgotPaaswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('User', userSchema);
export default User;
