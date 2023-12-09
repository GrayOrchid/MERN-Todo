import { body } from 'express-validator';


export const registerValidation = [
    body('email', 'Неврный Email').isEmail(),
    body('password', 'Пароль должен быть больше 5 символов').isLength({ min: 5 }),
    body('userName', 'Имя должно быть больше 5 символов').isLength({ min: 5 }),
]

export const postCreateValidation = [
    body('text', 'Введите текст').isLength({ min: 1 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('subTasks', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('completed', 'Неверный формат тэгов (укажите массив)').optional().isBoolean(),
    body('imageUrl', 'выв').isString().optional(),
]