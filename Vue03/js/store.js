function updateLocalStorage(cart){
    localStorage.setItem('cart',JSON.stringify(cart));
}
var store = new Vuex.createStore({
    state: {
        cart:[]
    },
    getters:{
        productQuantity: state=>product =>{
            const item = state.cart.find(i => i.id_barang === product.id_barang)
            if (item) return item.quantity
            else return null
        },
        cartItems:state=>{
            return state.cart
        },
    },
    mutations:{
        addToCart(state, product){
            let item = state.cart.find(i => i.id_barang === product.id_barang)
            if(item){
                item.quantity++;
            } else {
                state.cart.push({...product, quantity: 1})
            }
            updateLocalStorage(state.cart)
        },
        removeFromProduct(state, product){
            let item = state.cart.find(i => i.id_barang === product.id_barang)
            if(item){
                if(item.quantity>1){
                    item.quantity--
                }else{
                    state.cart = state.cart.filter(i=>i.id_barang !== product.id_barang)
                }
            }
            updateLocalStorage(state.cart)
        },
        updateCartFromLocalStorage(state){
            const cart = localStorage.getItem('cart')
            if(cart){
                state.cart = JSON.parse(cart)
            }
        },
        reset(state){
            state.cart = [];
            updateLocalStorage(state.cart);
        }
    },
    actions:{

    },
    modules:{

    },
})