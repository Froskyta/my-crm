const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = Router();

// /api/auth/register

router.post(
    '/register',
    // MiddleWares для валидации
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 8 символов').isLength({ min: 6 })
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

        const { email, password } = request.body;

        const candidate = await User.findOne({ email });

        if (candidate) response.status(400).json({ message: 'Такой пользователь уже существует' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = User({ email, password: hashedPassword });

        await user.save();

        response.status(201).json({ message: 'Ты успешно создался' })

    }catch (e) {
        
    }
});

// /api/auth/message
router.get('/message', async (request, response) => {
    try {
        console.log("request", request.query);

        return response.status(200).json({ message: request.query })
    }catch (e) {
        
    }
});

module.exports = router;