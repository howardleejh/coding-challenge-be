'use strict'

import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        sku: {
            type: String,
            required: true,
            minLength: 15,
            maxLength: 18,
            uppercase: true,
            unique: true
        },
        p_collection: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
            lowercase: true
        },
        p_sub_collection: {
            type: String,
            maxLength: 30,
            lowercase: true,
            default: ''
        },
        p_title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
            lowercase: true
        },
        p_slug: {
            type: String,
            lowercase: true
        },
        image: {
            type: String,
            default: ''
        },
        stock: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
)

export const ProductModel = mongoose.model('Product', ProductSchema)