export const addCoin = (coin, pid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to db
        const firestore = getFirestore();

        firestore.collection("coins").add({
            ...coin,
            pid,
            createDate: new Date()
        }).then(() => {
            dispatch({ type: "ADD_COIN", coin });
        }).catch((err) => {
            dispatch({ type: "ADD_COIN_ERROR", err });
        })
    }
}

export const deleteCoin = (coinId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to db
        const firestore = getFirestore();

        firestore.collection("coins").doc(coinId).delete().then(() => {
            dispatch({ type: "DELETE_COIN" });
        }).catch((err) => {
            dispatch({ type: "DELETE_COIN_ERROR", err });
        })
    }
}

export const changeCoin = (coinId, {coin_info, amount, buy_price, date_buy, currency}) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection("coins").doc(coinId).update({
            coin_info: coin_info,
            amount: amount,
            buy_price: buy_price,
            date_buy: date_buy,
            currency: currency
        }).then(() => {
            dispatch({ type: "UPDATE_COIN" });
        }).catch((err) => {
            dispatch({ type: "UPDATE_COIN_ERROR", err });
        })
    }
}