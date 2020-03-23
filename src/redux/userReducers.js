import { SET_USER, FETCH_USER } from './userAction'
import initialState from './initialState'

export function users(state = initialState.user, action){
    let stateCopy = {...state}
    switch(action.type){
        case SET_USER:
            let newUser = {
                id: action.payload.user.id,
                username: action.payload.user.username,
                email: action.payload.user.email,
                token: action.payload.token,
                isLoggedIn: true
            }
            let userOut = {
                id: "",
                username: "",
                email: "",
                token: "",
                isLoggedIn: false
            }
            if(stateCopy.isLoggedIn){
                console.log("logout")
                return userOut
            } 
            else{
                console.log("login")
                return newUser
            }
            // return newUser
        case FETCH_USER:
            return action.payload
        default:
            return state
    }
}

