'use strict'

import { UserModel } from '../models/users.js'
import { ProductModel } from '../models/products.js'

export const findDb = {
    user: async (email) => {
        try {
            const user = await UserModel.findOne({
                email: email
            })
            return user
        } catch (err) {
            return false
        }
    },
    userById: async (id) => {
        try {
            const user = await UserModel.findById(id)
            return user
        } catch (err) {
            return false
        }
    },
    product: async (item) => {
        try {
            const product = await ProductModel.findOne(item)
            return product
        } catch (err) {
            return false
        }
    },
    products: async (values) => {
        try {
            const products = await ProductModel.find(values)
            return products
        } catch (err) {
            return false
        }
    },
    productBySku: async (sku) => {
        try {
            const product = await ProductModel.findOne({
                sku: sku
            })
            return product
        } catch (err) {
            return false
        }
    }
}