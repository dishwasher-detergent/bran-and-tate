export const state = () => ({
    dashboard: 'add_or_edit',
    cart: [],
    session: null
})

export const mutations = {
    SET_DASHBOARD(state, value) {
        state.dashboard = value
    },
    SET_CART(state){
        if(localStorage.getItem('cart')){
            state.cart = JSON.parse(localStorage.getItem('cart'))
        }
    },
    UPDATE_CART(state,value){
        state.cart.push(value)
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REPLACE_CART(state,value){
        state.cart = value
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    SET_SESSION(state,value){
        state.session = value
        localStorage.setItem('session', JSON.stringify(value))
    }
}
