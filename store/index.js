export const state = () => ({
  sample: 0
})

export const mutations = {
  initial(state) {
    state.sample++
  }
}
