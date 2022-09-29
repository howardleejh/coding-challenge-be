'use strict'

import jwt from 'jsonwebtoken'

const userAuth = (req, res, next) => {
    let authToken = req.headers.auth_token

    if (authToken === undefined || null) {
        res.status(401).json(`message: unauthorized access`)
        return
    }

    let user

    try {
        user = jwt.verify(authToken, process.env.JWT_SECRET)
    } catch (err) {
        res.status(401).json(`message: unauthorized access`)
        return
    }
    res.locals.user = user
    next()
    return
}

export { userAuth }