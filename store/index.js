export const state = () => ({
    dashboard: 'add_or_edit',
})

export const mutations = {
    SET_DASHBOARD(state, value) {
        state.dashboard = value
    }
}

