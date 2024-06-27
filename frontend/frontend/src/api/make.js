import { apiBase } from "./index";

export const getTemplates = apiBase.createInstance({
    endpoint: "/makes/templates?editor=go&perPage=25&page=1",
    method: "get",
    reducer: "makeReducer",
    key: "id",
    reduxKey: "userData",
    action: "GET_TEMPLATE_LIST",
    onSuccess: (data) => data.template_list
});