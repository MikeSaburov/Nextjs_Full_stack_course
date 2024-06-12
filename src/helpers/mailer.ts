import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sentEmail = async ({email, emailType, userId}: any) => {
    try {
        //создание хэштрованного токена
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)  
    } catch (error:any) {
        throw new Error(error.message);
    }
}