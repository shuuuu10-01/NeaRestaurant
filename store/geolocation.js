export const state = () => ({
  position: {
    latitude: 0,
    longitude: 0
  }
})

export const getters = {
  position: state => {
    return state.position;
  }
};

export const actions = {
  async fetchPosition () {
    if (!navigator.geolocation) { 
      //Geolocation APIを利用できない環境向けの処理
      alert("対応していないブラウザです"); 
    }

    //Geolocation APIを利用できる環境向けの処理
    await new Promise((resolve, reject) => {
      const position = navigator.geolocation.getCurrentPosition(
        success => {
          successCallback(success)
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

export const mutations = {
  setPosition(state, data) {
    state.position = data
  }
}

function successCallback(position) {
  const data = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
  mutations.setPosition(data);
  console.info(position.coords)
}

function errorCallback(position) {
  alert("位置情報が取得できませんでした。"+ '\n'+ position.message)
  console.info(position)
}
