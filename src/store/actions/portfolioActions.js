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

export const deletePortfolio = (portfolioId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection("portfolio").doc(portfolioId).delete().then(() => {
            dispatch({ type: "DELETE_PORTFOLIO" });
        }).catch((err) => {
            dispatch({ type: "DELETE_PORTFOLIO_ERROR", err });
        })
    }
}

export const changePortfolio = (portfolioId, {name, desc}) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection("portfolio").doc(portfolioId).update({
            name: name,
            desc: desc
        }).then(() => {
            dispatch({ type: "UPDATE_PORTFOLIO" });
        }).catch((err) => {
            dispatch({ type: "UPDATE_PORTFOLIO_ERROR", err });
        })
    }
}