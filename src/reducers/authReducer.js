import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null
}

export const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };

        case types.logout:
            return { };

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
            
    
        default:
            return state;
    }
}


export const registerReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.setError:
            return {
                ...state,
                msgError: action.payload
            };

        case types.removeError:
            return {
                ...state,
                msgError: null
            };
            
    
        default:
            return state;
    }
}
