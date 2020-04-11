const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = Router();

// auth/register

router.post(
    '/register',
    // MiddleWares для валидации
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 8 символов').isLength({ min: 6 })
    ],
    async (request, response) => {
    try {
        // Определяю ответ с фронта
        const { email, password } = request.body;

        // Валидация, и вывод ошибок
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        // Поиск человека в таблице под таким email
        const candidate = await User.findOne({ email });
        if (candidate) return response.status(400).json({ message: 'Такой пользователь уже существует' });

        // Хэширование пароля и запись в бд
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = User({ email, password: hashedPassword });

        // Жду успешности
        await user.save();
        return response.status(201).json({ message: 'Ты успешно создался' })

    } catch (e) { }
});

// auth/login
router.post(
    '/login',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 8 символов').isLength({ min: 6 })
    ],
    async (request, response) => {
    try {
        // Определяю ответ с фронта
        const { email, password } = request.body;

        // Валидация, и вывод ошибок
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        // Поиск пользователя
        const user = await User.findOne({ email });
        if (user) {
            // Проверка пароля
            if (await bcrypt.compare(password, user.password )){
                // Генерация JWT Token
                const token = jwt.sign(
                { userId: user.id },         // Айди пользователя
                        config.get('jwtSecret'),     // Секретный ключ для расшифровки
                { expiresIn: '1h' },          // Срок жизни
                );

                response.cookie('tracking_cookie', 'cookievalue', { httpOnly: false });
                response.status(201).json({ id: user.id, token });

                return response
            } else {
                return response.status(400).json({ message: 'Не правильный пароль' })
            }
        } else {
            return response.status(400).json({ ...user, message: 'loh' })
        }
    } catch (e) { }
});

// auth/message
router.get('/message', async (request, response) => {
    try {
       return response.status(200).json({ message: request.query })
    }catch (e) {
        
    }
});

module.exports = router;