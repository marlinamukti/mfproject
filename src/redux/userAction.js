export const USER = `[USER]`;

export const SET_USER = `${USER} SET_USER`
export const FETCH_USER = `${USER} FETCH_USER`

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const fetchProduct = (user) => ({
    type: FETCH_USER, 
    payload: user
})