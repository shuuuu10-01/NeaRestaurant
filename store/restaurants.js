import axios from "axios";

export const state = () => ({
  list: []
});

export const getters = {
  list: state => {
    return state.list;
  },
  one: state => (id) => {
    const check = state.list.filter((item) => {
      return (item.id === id)
    })
    if (check.length === 0) {
      return false
    }
    return check
  }
};

export const actions = {
  async fetchAPI({ commit }, position) {
    // ここにAPI通信をして検索結果を取得
    const data = await searchByPosition(position.latitude, position.longitude, 4, position.start);
    if (!data) {
      return false
    }
    if (position.start == null) {
      commit('setList', data)
    } else {
      commit('addList', data)
    }
  }
}

export const mutations = {
  setList(state, data) {
    state.list = data
  },
  addList(state, data) {
    state.list = state.list.concat(data)
  }
};

async function searchByPosition(latitude, longitude, range, start) {
  return new Promise((resolve, reject) => {
    axios.get(process.env.BASE_URL + "gourmet/v1/", {
      params: {
        key: process.env.API_KEY,
        start: start,
        lat: latitude,
        lng: longitude,
        range: range,
        format: "json"
      }
    })
    .then(response => {
      if (response.data.results.shop) {
        resolve(response.data.results.shop);
      } else {
        alert("店舗が見つかりませんでした。\n" + response.data.results.error[0].message)
        resolve();
      }
    })
    .catch(error => {
      console.info(error);
      reject(false)
    });
  })
}
