import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'


export const register = async (req, res) => {
    try {
        let { email, userName, gradient } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: email,
            userName: userName,
            passwordHash: hash,
            color: gradient
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        },
            'secret123',
            {
                expiresIn: '30d'
            }
        )
        const { passwordHash, ...userData } = user._doc
        res.json({
            ...userData, token
        })
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d'
        });

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,

        });
    } catch (error) {
        res.status(500).json({
            message: 'Произошла ошибка на сервере'
        });
    }
}


export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            res.status(404).json({
                message: 'Пользователь не найден'
            });
            return;
        }
        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Произошла ошибка на сервере'
        });
    }
}
