export const PRODUCT = `[PRODUCT]`;

export const ADD_PRODUCT = `${PRODUCT} ADD_PRODUCT`
export const FETCH_PRODUCT = `${PRODUCT} FETCH_PRODUCT`
export const EDIT_PRODUCT = `${PRODUCT} EDIT_PRODUCT`
export const DELETE_PRODUCT = `${PRODUCT} DELETE_PRODUCT`

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product
})

export const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product
})

export const fetchProduct = (product) => ({
    type: FETCH_PRODUCT, 
    payload: product
})

export const deleteProduct = (productid) => ({
    type: DELETE_PRODUCT,
    payload: productid
})