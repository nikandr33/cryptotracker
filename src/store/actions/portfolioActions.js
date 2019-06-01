export const createPortfolio = (portfolio) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to db
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        firestore.collection("portfolio").add({
            ...portfolio,
            uid,
            createDate: new Date()
        }).then(() => {
            dispatch({ type: "CREATE_PORTFOLIO", portfolio });
        }).catch((err) => {
            dispatch({ type: "CREATE_PORTFOLIO_ERROR", err });
        })
    }
}