const initState = {
    signInError: null,
    signUpError: null
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                signInError: action.err
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                signInError: null
            }
        case 'REGISTERATION_ERROR':
            return {
                ...state,
                signUpError: action.err
            }
        case 'REGISTERATION_SUCCESS':
            return {
                ...state,
                signUpError: null
            }
        case 'SIGNOUT_SUCCESS':
            return state;
        default:
            return state;
    }
}

export default authReducer