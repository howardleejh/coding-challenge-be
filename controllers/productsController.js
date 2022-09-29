'use strict'

import { ProductModel } from '../models/products.js'
import { validateProduct, validateSkuFilter, validateUpdateProduct } from '../validators/validateProducts.js'
import { findDb } from '../services/findDb.js'
import { skuGenerator } from '../services/skuGenerator.js'
import { productSlugGen } from '../services/productSlugGen.js'

const productsController = {
    list: async (req, res) => {

        try {
            const products = await ProductModel.find({})
            if (!products.length) {
                res.status(404).json(`no products found`)
                return
            }
            res.status(200).json(products)
            return
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
    },
    createProduct: async (req, res) => {

        const user = res.locals.user

        let input
        // validate user input
        try {
            input = await validateSkuFilter.validateAsync({
                p_collection: req.body.p_collection,
                p_sub_collection: req.body.p_sub_collection,
                p_title: req.body.p_title
            })
        } catch (err) {

            res.status(406).json(`${err}`)
            return
        }
        // check if product already exists
        try {
            const isProduct = await findDb.product(input)

            if (isProduct) {
                res.status(409).json(`message: product exists`)
                return
            }
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
        // generate unique sku
        const generatedSku = await skuGenerator(Object.values(input))
        // generate slug 
        const generatedSlug = productSlugGen(input)

        let newProduct

        try {
            newProduct = await validateProduct.validateAsync({
                sku: generatedSku,
                p_collection: input.p_collection,
                p_sub_collection: input.p_sub_collection,
                p_title: input.p_title,
                p_slug: generatedSlug,
                image: req.body.image,
                stock: req.body.stock,
                createdBy: user.id
            })
        } catch (err) {

            res.status(406).json(`${err}`)
            return
        }

        try {
            await ProductModel.create(newProduct)
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
        res.status(201).json(`message: success!`)
        return
    },
    filterProducts: async (req, res) => {

        let filter

        try {
            filter = await validateSkuFilter.validateAsync({
                p_collection: req.query.p_collection,
                p_sub_collection: req.query.p_sub_collection,
                p_title: req.query.p_title
            })
        } catch (err) {
            res.status(406).json(`${err}`)
            return
        }

        for (const key in filter) {
            if (filter[key] === '') {
                delete filter[key]
            }
        }

        try {
            const results = await findDb.products(filter)

            if (!results.length) {
                res.status(404).json(`message: no products found`)
                return
            }
            return res.status(200).json(results)
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
    },
    getProduct: async (req, res) => {

        try {
            const result = await findDb.productBySku(req.params.product)
            if (!result) {
                res.status(404).json(`message: product not found`)
                return
            }
            res.status(200).json(result)
            return
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

    },
    update: async (req, res) => {

        const user = res.locals.user

        try {
            const product = await findDb.productBySku(req.body.sku)
            if (!product) {
                res.status(404).json(`message: product not found`)
                return
            }
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }

        let input

        if (req.body.p_collection !== '' || req.body.p_sub_collection !== '' || req.body.p_title !== '') {
            try {
                input = await validateSkuFilter.validateAsync({
                    p_collection: req.body.p_collection,
                    p_sub_collection: req.body.p_sub_collection,
                    p_title: req.body.p_title
                })

                const generatedSku = await skuGenerator(Object.values(input))
                const generatedSlug = productSlugGen(input)

                input.sku = generatedSku
                input.p_slug = generatedSlug
            } catch (err) {

                res.status(406).json(`${err}`)
                return
            }
        } else {
            input = {
                sku: '',
                p_collection: '',
                p_sub_collection: '',
                p_title: '',
                p_slug: ''
            }
        }

        let editedProduct

        try {
            editedProduct = await validateUpdateProduct.validateAsync({
                sku: input.sku,
                p_collection: input.p_collection,
                p_sub_collection: input.p_sub_collection,
                p_title: input.p_title,
                p_slug: input.p_slug,
                image: req.body.image,
                stock: req.body.stock,
                updatedBy: user.id
            })
        } catch (err) {

            res.status(406).json(`${err}`)
            return
        }

        // removes empty values so that database retains those values
        for (const key in editedProduct) {
            if (editedProduct[key] === '') {
                delete editedProduct[key]
            }
        }

        try {
            await ProductModel.findOneAndUpdate({
                sku: req.body.sku
            }, editedProduct)
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
        res.status(202).json(`message: update success!`)
        return
    },
    delete: async (req, res) => {

        try {

            const product = await findDb.productBySku(req.params.product)

            if (!product) {
                res.status(404).json(`message: product not found`)
                return
            }

            await ProductModel.findOneAndDelete({
                sku: product.sku
            })
        } catch (err) {
            res.status(500).json(`${err}`)
            return
        }
        res.status(200).json(`message: product deleted!`)
        return
    },
}

export default productsController