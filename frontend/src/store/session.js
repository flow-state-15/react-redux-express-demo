import { csrfFetch } from './csrf';

const SET_USER = 'action/SET_USER'
const REMOVE_USER = 'action/REMOVE_USER'

export function actionSetUser (user){
    return {
        type: SET_USER,
        user
    }
}

export function actionRemoveUser (){
    return {
        type: REMOVE_USER
    }
}

export const thunkLogin = (credentials) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
    if (res.ok){
        const { user } = await res.json();
        dispatch(actionSetUser(user))
        return user
    } else {
        console.log('<<< ERROR SETTING USER >>>  res:: ', res.json())
    }
}

export const thunkSignup = (credentials) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
    if (res.ok){
        const { user } = await res.json();
        dispatch(actionSetUser(user))
        return user
    } else {
        console.log('<<< ERROR SIGNUP USER >>>  res:: ', res.json())
    }
}

export const thunkRestoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    if (res.ok){
        const { user } = await res.json();
        dispatch(actionSetUser(user))
        return user
    } else {
        console.log('<<< ERROR RESTORING USER >>>  res:: ', res.json())
    }
}

export const thunkLogout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(actionRemoveUser());
    return await res.json();
}

const initialState = {
    user: null
}

function sessionReducer (state=initialState, action){
    switch (action.type){
        case SET_USER:
            return { user: action.user }
        case REMOVE_USER:
            return { user: null }
        default:
            return state
    }
}

export default sessionReducer;
