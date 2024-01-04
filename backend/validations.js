import { body } from 'express-validator';
import UserModel from './models/User.js';
import bcrypt from 'bcrypt'



export const registerValidation = [
    body('email', 'Неверный Email').isEmail().custom(async value => {
        const existingUser = await UserModel.findOne({ email: value });
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует');
        } return true;
    }),
    body('password', 'Пароль должен быть больше 5 символов').isLength({ min: 5 }),
    body('userName', 'Имя должно быть больше 4 символов').isLength({ min: 4 }),
    body('userName', 'Имя не должно превышать 20 символов').isLength({ max: 20 }),
]

export const userLogin = [
    body('email', 'Неверный Email').isEmail(),
    body().isObject().custom(async (values) => {
        const user = await UserModel.findOne({ email: values.email });
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const isValidPass = await bcrypt.compare(values.password, user.passwordHash);
        if (!isValidPass) {
            throw new Error('Неверный пароль или email');
        }
        return true;
    })
];


export const postCreateValidation = [
    body('text', 'Введите текст').isLength({ min: 1 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('subTasks', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('completed', 'Неверный формат тэгов (укажите массив)').optional().isBoolean(),
    body('imageUrl', 'выв').isString().optional(),
]

