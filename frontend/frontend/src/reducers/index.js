import { combineReducers } from "redux";
import { bindReducer } from "../../node_modules/easy-redux-http-call/dist/index";
import userReducer from "./userReducer";
import bookingReducer from './bookingReducer';
import tourReducer from "./tourReducer";
// import makeReducer from "./makeReducer";


const newUserReducer = bindReducer(userReducer,{key : "userReducer"});
const newBookingReducer = bindReducer(bookingReducer,{key : "bookingReducer"});
const newTourReducer = bindReducer(bookingReducer,{key : "tourReducer"});
// const newMakeReducer = bindReducer(makeReducer,{key : "makeReducer"});


export default combineReducers({
    userReducer: newUserReducer,
    bookingReducer:newBookingReducer,
    tourReducer:newTourReducer
    // makeReducer:newMakeReducer
});