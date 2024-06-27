import { apiBase } from "./index";

export const registerApi = apiBase.createInstance({
    endpoint: "/register",
    method: "post",
    reducer: "userReducer",
    key: "id",
    reduxKey: "AddUserData",
    action: "ADD_USER_DATA",
    onSuccess: (data) => data,
    // onError: (err) => err
});

export const loginAPI = apiBase.createInstance({
    endpoint: "/login",
    method: "post",
    reducer: "userReducer",
    key: "id",
    reduxKey: "GetUserData",
    action: "GET_USER_DATA",
    onSuccess: (data) => data,
    onError: (data) => data,

});