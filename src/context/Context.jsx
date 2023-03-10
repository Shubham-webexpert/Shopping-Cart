import React, { createContext, useEffect, useReducer } from 'react';
import { cartReducer, reducer } from './Reducers';
import axios from "axios";
// import { useState } from 'react';

export const ApiContext=createContext();

const initialState={
    loading:true,
    post:[],
    error:'',
}

const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialState);

    useEffect(()=>{
        axios
            .get('https://fakestoreapi.com/products/')
            .then(res=>{dispatch({
                type:"FETCH_SUCCESS",
                payload:res.data,
            })})
            .catch((error)=>{
                dispatch({
                    type:"FETCH_ERROR",
                    payload:error.data
                })
            })

    },[])

    const [cartState,cartDispatch]=useReducer(cartReducer,{
        products:state.post,
        cart:[]
    })


  return (
    <>
        <ApiContext.Provider value={{state,dispatch,cartState,cartDispatch}}>
            {children}
        </ApiContext.Provider>
    </>
  )
}

export default Context;