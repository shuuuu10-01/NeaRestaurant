export const state = () => ({
  list: []
});

export const getters = {
  list: state => {
    return state.list;
  }
};

export const actions = {
  fetchAPI({ commit }, data) {
    // ここにAPI通信をして検索結果を取得
    commit('setList', data)
  }
}

export const mutations = {
  setList(state, data) {
    state.list = data
  }
};
