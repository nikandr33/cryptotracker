const initState = {
    portfolio: []
}

const portfoliosReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_PORTFOLIO':
            return state;
        case 'CREATE_PROJECT_ERROR':
            return state;
        default:
            return state;
    }
}

export default portfoliosReducer;