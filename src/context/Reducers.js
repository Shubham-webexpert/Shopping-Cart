export const reducer=(state,action)=>{
    switch (action.type) {
        case "FETCH_SUCCESS":
            return{
                loading:false,
                post:action.payload,
                error:'',
                cart:[]
            }

            case "FETCH_ERROR":
                return{
                    loading:false,
                    post:[],
                    error:action.payload,
                    cart:[]
                }

           
            
            
        default:
            return state;
    }
}

export const cartReducer=(state,action)=>{
    switch (action.type) {
        case "ADD_TO_CART":
            return {...state, cart:[...state.cart,{...action.payload,qty:1}]};
            
        
    
        default:
            return state;
    }
}