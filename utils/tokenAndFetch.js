import jwt from "jsonwebtoken"

export function createJWT(user) {
    return jwt.sign({user},process.env.SECRET,{expiresIn:'24h'})
    
}

export function getToken() {
    const token = localStorage.getItem('token')
    if (!token) return null

    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    }
    return token
}

export function getUser() {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function login(userData) {
    const token = await request(`/api/users/login`,'POST',userData)
    localStorage.setItem('token',token)
    return getUser()
}

export async function checkToken() {
    return await request(`/api/users/check-token`)
    .then(dateStr => new Date(dateStr))
}

export async function request(url, method = 'GET', payload = null) {
    const options = {method}
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload)
    }
    const token = getToken()
    if (token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }
    try {
        const res = await fetch(url,options)
        if (res.ok) return res.json()
        // throw new Error('Bad Request')
    } catch (err) {
        console.log(err)
    }
}