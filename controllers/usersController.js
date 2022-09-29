'use strict'

import { UserModel } from '../models/users.js'
import { validateRegister, validateLogin, validateUpdate } from '../validators/validateUser.js'
import { findDb } from '../services/findDb.js'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'


const usersController = {
    register: async (req, res) => {

        let user

        try {
            user = await validateRegister.validateAsync({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                repeat_password: req.body.repeat_password
            })
        } catch (err) {
            res.status(406).json(`${err}`)
            return
        }

        try {
            const isUser = await findDb.user(user.email)
            if (isUser) {
                res.status(409).json(`message: user exists`)
                return
            }
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

        let hash

        try {
            hash = await argon2.hash(user.password)
            user.hash = hash
            user.password = null
            user.repeat_password = null
        } catch (err) {
            res.status(406).json(`${err}`)
            return
        }

        try {
            await UserModel.create(user)
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
        res.status(201).json(`message: success!`)
        return
    },
    login: async (req, res) => {

        let loginRequest

        try {
            loginRequest = await validateLogin.validateAsync({
                email: req.body.email,
                password: req.body.password
            })
        } catch (err) {
            res.status(406).json(`${err}`)
            return
        }

        let user

        try {
            user = await findDb.user(loginRequest.email)
            if (!user) {
                res.status(404).json(`message: user not found`)
                return
            }
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

        try {
            if (await argon2.verify(user.hash, loginRequest.password)) {
                // password match
                const now = new Date()

                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                }, process.env.JWT_SECRET, { expiresIn: '24h' })

                res.status(200).json({
                    token: token,
                    expiresAt: now.setHours(now.getHours() + 24),
                    message: 'login success!'
                })
                return
            }
            res.status(401).json(`message: user is not authorized`)
            return
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
    },
    getUser: async (req, res) => {

        let user

        try {
            user = await findDb.user(req.body.email)
            if (!user) {
                res.status(404).json(`message: user not found`)
                return
            }
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

        res.status(200).json(user)
        return

    },
    update: async (req, res) => {

        try {
            const isUser = await findDb.user(req.body.initial_email)
            if (!isUser) {
                res.status(404).json(`message: user not found`)
                return
            }
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

        let user

        try {
            user = await validateUpdate.validateAsync({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                repeat_password: req.body.repeat_password
            })
        } catch (err) {
            res.status(406).json(`${err}`)
            return
        }

        if (user.password) {
            let hash

            try {
                hash = await argon2.hash(user.password)
                user.hash = hash
                user.password = null
                user.repeat_password = null
            } catch (err) {
                res.status(406).json(`${err}`)
                return
            }
        }

        // removes empty values so that database retains those values
        for (const key in user) {
            if (user[key] === '') {
                delete user[key]
            }
        }

        try {
            await UserModel.findOneAndUpdate({
                email: req.body.initial_email
            }, user)
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
        res.status(202).json(`message: success!`)
        return
    },
    delete: async (req, res) => {

        let user

        try {
            user = await findDb.user(req.body.email)
            if (!user) {
                res.status(404).json(`message: user not found`)
                return
            }
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

        try {
            await UserModel.findOneAndDelete({
                email: user.email
            })
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

        res.status(200).json(`message: user deleted!`)
        return
    }
}

export default usersController
