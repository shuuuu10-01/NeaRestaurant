import axios from "axios";

export const state = () => ({
  list: [],
  genre: [
    'G001',
    'G004',
    'G005',
    'G007',
    'G008',
    'G013',
  ],
  range: 4
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
  async fetchAPI({ state, commit }, position) {
    // ここにAPI通信をして検索結果を取得
    const data = await searchByPosition(position.latitude, position.longitude, state.range, position.start, state.genre);
    console.log(state)
    if (!data) {
      return false
    }
    if (position.start == null) {
      await commit('setList', [])
      await commit('setList', data)
    } else {
      commit('addList', data)
    }
  },
  changeGenre({ commit }, genre){
    commit('setGenre', genre)
  },
  changeRange({ commit }, range) {
    commit('setRange', range)
  }
}

export const mutations = {
  setList(state, data) {
    state.list = data
  },
  addList(state, data) {
    state.list = state.list.concat(data)
  },
  setGenre(state, genre) {
    state.genre = genre
  },
  setRange(state, range) {
    state.range = range
  }
};

async function searchByPosition(latitude, longitude, range, start, genre) {
  let genre_prams = ""
  if (genre.length !== 6) {
    genre_prams += genre[0]
    for (let i = 1; i<genre.length; i++) {
      genre_prams += ','+genre[i]
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(process.env.BASE_URL + "gourmet/v1/", {
      params: {
        key: process.env.API_KEY,
        start: start,
        lat: latitude,
        lng: longitude,
        range: range,
        genre: genre_prams,
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
