export const state = () => ({
  position: {
    latitude: 35.677408,
    longitude: 139.766339
  }
})

export const getters = {
  position: state => {
    return state.position;
  }
};

export const mutations = {
  setPosition(state, data) {
    console.info(data)
    state.position = data;
  }
};

export const actions = {
  async fetchPosition ({ commit }) {
    if (!navigator.geolocation) { 
      //Geolocation APIを利用できない環境向けの処理
      alert("対応していないブラウザです");
      return false
    }

    //Geolocation APIを利用できる環境向けの処理
    await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        success => {
          console.info(success)
          const data = {
            latitude: success.coords.latitude,
            longitude: success.coords.longitude
          };
          commit("setPosition", data);
          resolve()
        }, 
        error => {
          errorCallback(error);
          reject()
        }, 
        {
          enableHighAccuracy: true,
          timeout: 6000,
          maximumAge: 600000
        }
      )
    })
  }
};

function errorCallback(position) {
  alert("位置情報が取得できませんでした。\n"+ String(position.message))
  console.info(position)
}
