const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
// const nodemailer = require('nodemailer');

const router = Router();

// auth/register

router.post(
    '/register',
    // MiddleWares для валидации
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов').isLength({min: 6})
    ],
    async (request, response) => {
        try {
            // Определяю ответ с фронта
            const {email, password} = request.body;

            // Валидация, и вывод ошибок
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({errors: errors.array().map(({msg}) => msg)});

            // Поиск человека в таблице под таким email
            if (await User.findOne({email})) return response.status(400).json({errors: 'Такой пользователь уже существует'});

            // Хэширование пароля и запись в бд
            const user = await User({email, password: await bcrypt.hash(password, 12)});

            // Жду успешности
            await user.save();
            return response.status(201).json({message: 'ok'})

        } catch (e) {
        }
    });

// auth/login
router.post(
    '/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов').isLength({min: 6})
    ],
    async (request, response) => {
        try {
            // Определяю ответ с фронта
            const {email, password} = request.body;

            // Валидация, и вывод ошибок
            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({errors: errors.array().map(({msg}) => msg)});

            // Поиск пользователя
            const user = await User.findOne({email});
            if (user) {
                // Проверка пароля
                if (await bcrypt.compare(password, user.password)) {
                    const time_session = config.get('session_time_hour');

                    // Генерация JWT Token
                    const token = jwt.sign(
                        {userId: user.id},                        // ID пользователя
                        config.get('jwtSecret'),                    // Секретный ключ для расшифровки
                        {expiresIn: `${time_session}h`},          // Срок жизни
                    );

                    return response
                        .cookie('session_id', token, {
                            httpOnly: true,
                            expires: new Date(Date.now() + time_session * 3600000)
                        })
                        .cookie('session', true, {expires: new Date(Date.now() + time_session * 3600000)})
                        .status(200).json({message: 'ok'});
                } else {
                    return response.status(400).json({errors: 'Лох, который неправильно ввел пароль'})
                }
            } else {
                return response.status(400).json({...user, errors: 'Лох, которого нет в базе'})
            }
        } catch (e) {
            console.log(e)
        }
    });

// auth/logout
router.get('/logout', async (request, response) => {
    try {
        return response
            .clearCookie('session_id')
            .clearCookie('session')
            .status(200).json({message: 'ok'});
    } catch (e) {
    }
});

// auth/message
router.get('/message', auth, async (request, response) => {
    try {
        // const transporter = await nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'testforfroskyta@gmail.com',
        //         pass: '80nimeto'
        //     }
        // });
        //
        // transporter.sendMail({ from: 'testforfroskyta@gmail.com', to: 'froskyta.dev@gmail.com', subject: 'Sending Email using Node.js', text: 'That was easy!' });
        return response.status(200).json({message: request.query})
    } catch (e) {
        console.log("Почта", e.message)
    }
});

module.exports = router;