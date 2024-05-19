import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Соединение  с БД установлено');
    });
    connection.on('error', (error) => {
      console.log(
        'Ошибка соединения с БД, пожалуйста убедитесь что БД запущена' + error
      );
      process.exit();
    });
  } catch (error) {
    console.log('Что то пошло не так');
    console.log(error);
  }
}
