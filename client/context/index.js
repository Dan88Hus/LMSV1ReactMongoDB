import {useReducer, createContext, useEffect} from 'react'

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

    useEffect(()=>{
        //useEffect we wrote after saving LOGIN DISPATCH as localStorage in LOGIN page
        dispatch({
            type:"LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user"))
        })
    },[])
    return(
        <Context.Provider value={{state, dispatch}} >
            {children}
        </Context.Provider>
    )
}

export {Context, Provider}