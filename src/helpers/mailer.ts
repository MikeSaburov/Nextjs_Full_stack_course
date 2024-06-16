import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //создание хэштрованного токена
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPaaswordToken: hashedToken,
        forgotPaaswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0f93b5707f9fe3",
        pass: "dc73f2db26a6f3",
        //Данные необходимо засунуть в .env
      },
    });
    const mailOptions = {
      from: "admin@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Подтвердите эл. почту" : "Сбросить пароль",
      html: `<p>Click <a hef="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a>  to 
      ${
        emailType === "VERIFY" ? "Подтвердите эл. почту" : "Сбросить пароль"
      }или скопируйте и вставьте ссылку ниже в свой браузер.<br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const masilresponse = await transporter.sendMail(mailOptions);
    return masilresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
