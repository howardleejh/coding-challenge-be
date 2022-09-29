'use strict'

import Joi from 'joi'

const validateProduct = Joi.object({
    sku: Joi.string().min(15).max(18).uppercase().required(),
    p_collection: Joi.string().min(3).max(30).lowercase().required(),
    p_sub_collection: Joi.string().max(30).lowercase().trim().allow(''),
    p_title: Joi.string().min(3).max(30).lowercase().required(),
    p_slug: Joi.string().lowercase().required(),
    image: Joi.string().trim().allow('').default(''),
    stock: Joi.number().integer().positive().allow('').default('0'),
    createdBy: Joi.string().required(),
})

const validateSkuFilter = Joi.object({
    p_collection: Joi.string().min(3).max(30).lowercase().trim().allow('').default(''),
    p_sub_collection: Joi.string().max(30).lowercase().trim().allow('').default(''),
    p_title: Joi.string().min(3).max(30).lowercase().trim().allow('').default(''),
})

const validateUpdateProduct = Joi.object({
    sku: Joi.string().min(15).max(18).uppercase().trim().allow('').default(''),
    p_collection: Joi.string().min(3).max(30).lowercase().trim().allow('').default(''),
    p_sub_collection: Joi.string().max(30).lowercase().trim().allow('').default(''),
    p_title: Joi.string().min(3).max(30).lowercase().trim().allow('').default(''),
    p_slug: Joi.string().lowercase().trim().allow('').default(''),
    image: Joi.string().trim().allow('').default(''),
    stock: Joi.number().integer().positive().allow('', 0).default(''),
    updatedBy: Joi.string().required(),

})

export { validateProduct, validateSkuFilter, validateUpdateProduct }