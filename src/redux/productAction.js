export const PRODUCT = `[PRODUCT]`;

export const ADD_PRODUCT = `${PRODUCT} ADD_PRODUCT`
export const FETCH_PRODUCT = `${PRODUCT} FETCH_PRODUCT`

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product
})

export const fetchProduct = (product) => ({
    type: FETCH_PRODUCT, 
    payload: product
})