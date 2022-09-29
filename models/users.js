'use strict'

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 25,
            lowercase: true
        },
        last_name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 25,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
            lowercase: true,
        },
        hash: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const UserModel = mongoose.model('User', UserSchema)