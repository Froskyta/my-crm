const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

// Создаю бэк на express
const app = express();
app.use(cors()); // Это для какой-то assess-control...
app.use(express.json({ extended: true })); // Парсинг в json ответа фронта

// Роутинг
app.use('/api/auth', require('./routes/auth.routes'));

// Даты с конфига глобального
const PORT = config.get('port');

async function start(){
    try {
        // Запускаю подключение к БД MongoDB
        // ** Обязательно проверить свой ip в белом листе в mongodb.com **
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        // Только после успешного подключения к БД запускается проект
        app.listen(PORT, () => console.log(`Приложение запустилось на порту ${PORT}`));
    }catch (e) {
        console.log("Серверная ошибка", e.message);
        process.exit(1);
    }
}

start();

