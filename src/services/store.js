import API from './API'

const StoreService = { 
  show: (google_place_id) => API.get(`/stores/${google_place_id}`),

  index: (latitude, longitude) => API.get('/stores', { 
    params: {
      latitude: latitude,
      longitude: longitude
    }
  })
}

export default StoreService
