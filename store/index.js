export const state = () => ({
    dashboard: 'add_or_edit',
    cart: []
})

export const mutations = {
    SET_DASHBOARD(state, value) {
        state.dashboard = value
    },
    UPDATE_CART(state,value){
        state.cart.push(value)
    }
}

