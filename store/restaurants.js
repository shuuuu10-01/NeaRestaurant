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
  async fetchAPI({ commit }) {
    // ここにAPI通信をして検索結果を取得
    const data = await searchByPosition(35.66922, 139.761457, 1000);
    if (!data) { 
      alert('店舗情報が取得できませんでした。')
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

async function searchByPosition(lat, lng, range) {
  return new Promise((resolve, reject) => {
    axios.get(process.env.BASE_URL + "gourmet/v1/", {
      params: {
        key: process.env.API_KEY,
        lat: lat,
        lng: lng,
        range: range,
        format: "json"
      }
    })
    .then(response => {
      console.info(response.data.results.shop, "func")
      resolve(response.data.results.shop)
    })
    .catch(error => {
      console.info(error);
      reject(false)
    });
  })
}
