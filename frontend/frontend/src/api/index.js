
import { useCookies } from "react-cookie";
import { store } from "../store"
import { CreateBase } from "easy-redux-http-call";



// https://jsonplaceholder.typicode.com/todos/1
console.log(window.localStorage,"wi")
export const apiBase = new CreateBase({
    baseApiUrl: 'http://localhost:8080/api/v1',
    store: store, defaultState: { loading: true },
    httpFn: (data) => {
        
        return window.fetch(data.endpoint, {
            method: data.method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY':`381d3f24-111e-4fa8-9d6e-d64d57472138`,
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
                ...data.headers || {},
            },
            ...(Object.keys(data.params || {}).length && {
                body: JSON.stringify(data.params)
            })
        })
        .then(async (response) => {
            let data = await response.json()
            console.log(data,"data")
            return {
                data,
                status: response.status
            }
        })
    }
})