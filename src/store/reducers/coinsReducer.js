const initState = {
    coins: []
}

const coinsReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_COIN':
            return state;
        case 'ADD_COIN_ERROR':
            console.log(action.err)
            return state;
        case 'UPDATE_COIN':
            return state;
        case 'UPDATE_COIN_ERROR':
            console.log(action.err)
            return state;
        case 'DELETE_COIN':
            return state;
        case 'DELETE_COIN_ERROR':
            console.log(action.err)
            return state;
        default:
            return state;
    }
}

export default coinsReducer;