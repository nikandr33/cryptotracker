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