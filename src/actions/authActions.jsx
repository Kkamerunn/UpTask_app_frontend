import {
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_ERROR,
    SIGNOUT_USER
} from '../types'
import axiosClient from "../config/axiosClient"

export function authenticateUser(user) {
    return async (dispatch) => {
        dispatch(addUserToAuthenticate())

        try {
            const { data } = await axiosClient.post("/users/login", user)

            localStorage.setItem('token', data.token)

            dispatch(addUserToAuthenticateSuccess(data))
        } catch (error) {
            dispatch(addUserToAuthenticateError(error))
        }
    }
}

export function signOutUser() {
    return (dispatch) => {
        dispatch(removeAuthenticatedUser())
        localStorage.removeItem('token')
    }
}

const addUserToAuthenticate = () => ({
    type: AUTHENTICATE_USER,
    payload: true
})

const addUserToAuthenticateSuccess = user => ({
    type: AUTHENTICATE_USER_SUCCESS,
    payload: user
})

const addUserToAuthenticateError = err => ({
    type: AUTHENTICATE_USER_ERROR,
    payload: err
})

const removeAuthenticatedUser = () => ({
    type: SIGNOUT_USER
})