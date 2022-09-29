'use strict'

import Joi from 'joi'

const validateRegister = Joi.object({
    first_name: Joi.string().min(3).max(25).lowercase().required(),
    last_name: Joi.string().min(3).max(25).lowercase().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password')

const validateLogin = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
}).with('email', 'password')

const validateUpdate = Joi.object({
    first_name: Joi.string().min(3).max(25).lowercase().allow(''),
    last_name: Joi.string().min(3).max(25).lowercase().allow(''),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).allow(''),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).allow(''),
    repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password')

export { validateRegister, validateLogin, validateUpdate }