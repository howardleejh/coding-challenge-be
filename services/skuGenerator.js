import argon2 from 'argon2'

const skuGenerator = async (values) => {

    let generated = 'JAXX'

    const total = values.toString()

    for (const value of values) {
        for (const index in value) {
            if (index < 3) {
                const upperCase = value[index].toUpperCase()
                generated += upperCase
            }
        }
    }

    const nonce = await argon2.hash(`nonce${total}${total.length}`)
    const nonceNoSymbols = nonce.replaceAll(/[^\w]|_/g, '')
    const modifiedNonce = nonceNoSymbols.slice(-6, -1)

    return (generated + modifiedNonce)
}

export { skuGenerator }