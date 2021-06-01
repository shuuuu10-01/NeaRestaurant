import axios from "axios";

export const state = () => ({
  list: []
});

export const getters = {
  list: state => {
    return state.list;
  }
};

export const actions = {
  async fetchAPI({ commit }, position) {
    // ここにAPI通信をして検索結果を取得
    const data = await searchByPosition(position.latitude, position.longitude, 4);
    if (!data) {
      return false
    }
    commit('setList', data)
  }
}

export const mutations = {
  setList(state, data) {
    console.info(data, "mutations")
    state.list = data
  }
};

async function searchByPosition(latitude, longitude, range) {
  return new Promise((resolve, reject) => {
    axios.get(process.env.BASE_URL + "gourmet/v1/", {
      params: {
        key: process.env.API_KEY,
        lat: latitude,
        lng: longitude,
        range: range,
        format: "json"
      }
    })
    .then(response => {
      console.info(response)
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