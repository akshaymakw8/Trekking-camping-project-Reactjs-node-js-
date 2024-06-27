import { apiBase } from "./index";

export const getTour = apiBase.createInstance({
    endpoint: "/tours",
    method: "get",
    reducer: "tourReducer",
    key: "id",
    reduxKey: "tourDataList",
    action: "GET_TOUR_LIST",
    onSuccess: (data) => data
});

export const getTourById = apiBase.createInstance({
    endpoint: "/tour/{id}",
    method: "get",
    reducer: "tourReducer",
    key: "id",
    reduxKey: "tourData",
    action: "GET_TOUR_DATA",
    onSuccess: (data) => data
});