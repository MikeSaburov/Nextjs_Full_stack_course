import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
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

export default mongoose.models.User || mongoose.model('User', userSchema);
