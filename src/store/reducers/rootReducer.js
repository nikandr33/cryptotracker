import portfolioReducer from "./portfoliosReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    portfolios: portfolioReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;

