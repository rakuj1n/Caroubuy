import { jwtVerify } from "jose"

export const getJwtSecretKey = () => {
    const secret = process.env.SECRET

    if (!secret || secret.length === 0) {
        throw new Error('Jwt secret not set')
    }

    return secret
}

export const verifyAuth = async (token) => {
    try {
        const verified = await jwtVerify(token,new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload
    } catch (err) {
        throw new Error('Your token is invalid.')
    }
}