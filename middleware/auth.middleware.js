const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (request, response, next) => {
    try {
        // Получаю токен
        const token = request.cookies.session_id;

        // Если нет его посылаю нахрен
        if (!token) return response.status(401).json({ message: 'Пшел нах' });

        // Расшифрую токен, если ошибка, то падаю в catch
        request.user_id = jwt.verify(token, config.get('jwtSecret'))['userId'];

        next();
    }catch (e) {
        response.status(401).json({ message: 'Пшел нах' })
    }
};