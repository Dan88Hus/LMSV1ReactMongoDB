import {useReducer, createContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const initialState = {
    user: null,
}

//create context
const Context = createContext()



//root reducer
const rootReducer = (state, action) => {    
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null}
        default:
            return state
    }
}

//context provider, everything in _app will be received as children

const Provider = ({children}) =>{
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const router = useRouter()

    useEffect(()=>{
        //useEffect we wrote after saving LOGIN DISPATCH as localStorage in LOGIN page
        dispatch({
            type:"LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user"))
        })
    },[])

    //whenever we get response, we execute this function
    axios.interceptors.response.use(
        function(response){
            //any status code lie within the range of 200 will cause this function to trigger
            return response
        },
        function(error){
            // any status code false outside of 2xx
            let res = error.response
            if(res.status === 401 && res.config && !res.config._isRetryRequest){
                return new Promise((resolve, reject) =>{
                    axios.get("/api/logout")
                    .then((data)=>{
                        console.log("/401 error > logout ")
                        dispatch({type: "LOGOUT"})
                        window.localStorage.removeItem("user")
                        router.push("/login")
                    })
                    .catch(err => {
                        console.log("axios interceptors error",err)
                        reject(err)
                    })
                })
            }
            return Promise.reject(error)
        }
    )

    useEffect(()=>{
        const getCsrfToken = async () =>{
            const {data} = await axios.get("/api/csrf-token")
            // console.log("CSRF", data)
            axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken

        }
        getCsrfToken()
    },[])

    return(
        <Context.Provider value={{state, dispatch}} >
            {children}
        </Context.Provider>
    )
}

export {Context, Provider}