import {
    GET_USER,
    UPDATE_USER_INFO,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PASSWORD,
    SET_LOADING,
    SET_SUCCESS
} from "../actionTypes";

const initialState = {
    success: null,
    user: null,
    errors: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER: {
            return {
                ...state,
                user: action.payload.success ? action.payload.user : null,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case UPDATE_USER_INFO: {
            return {
                ...state,
                success: action.payload.success ? true : false,
                user: action.payload.success ? action.payload.user : null,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case UPDATE_USER_EMAIL: {
            return {
                ...state,
                success: action.payload.success ? true : false,
                user: action.payload.success ? action.payload.user : null,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case UPDATE_USER_PASSWORD: {
            return {
                ...state,
                success: action.payload.success ? true : false,
                user: action.payload.success ? action.payload.user : null,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case SET_SUCCESS: {
            return {
                ...state,
                success: action.payload
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        default:
            return state;
    }
}
