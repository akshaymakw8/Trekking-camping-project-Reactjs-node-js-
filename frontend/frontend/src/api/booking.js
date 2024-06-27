import { apiBase } from "./index";

export const bookingAPI = apiBase.createInstance({
    endpoint: "/booking",
    method: "post",
    reducer: "bookingReducer",
    key: "id",
    reduxKey: "AddBookingData",
    action: "ADD_BOOKING_DATA",
    onSuccess: (data) => data,
    onError: (data) => data,
});

export const getBookingById = apiBase.createInstance({
    endpoint: "/booking/{id}",
    method: "get",
    reducer: "bookingReducer",
    key: "id",
    reduxKey: "bookingData",
    action: "GET_BOOKING_DATA",
    onSuccess: (data) => data
});