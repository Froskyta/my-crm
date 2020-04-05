const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port');

async function start(){
    try {
        // Запускаю подключение к БД MongoDB
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

