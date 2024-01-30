export const RoomValidation = {
    required: 'Введите название',
    pattern: {
        value: /^(?!\s+$).+$/,
        message: 'Недопустимое название',
    },
    maxLength: {
        value: 20,
        message: 'Максимальное значеие 15',
    },
}

export const ToodooValidation = {
    required: 'Напишите текст',
    maxLength: {
        value: 30,
        message: 'Превышено максимальное количество символов',
    },
    pattern: {
        value: /^(?!\s+$).+$/,
        message: 'Недопустимый текст',
    },
}

export const UserSignInValidation = {
    userName: {
        required: 'Укажите Имя польвателя',
        pattern: {
            value: /^(?!\s+$).+$/,
            message: 'Недопустимое имя пользоватея',
        },
        minLength: {
            value: 5,
            message: 'Слишком короткое имя'
        },
        maxLength: {
            value: 30,
            message: 'Превышено максимальное количество символов',
        },
    },

    password: {
        required: 'Укажите Пароль',
        pattern: {
            value: /^(?!\s+$).+$/,
            message: 'Недопустимый пароль',
        },
        minLength: {
            value: 5,
            message: 'Слишком короткий пароль'
        }
    }
}