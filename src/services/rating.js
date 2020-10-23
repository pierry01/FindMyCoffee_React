import API from './API'

const RatingService = { 
  create: (store, rating) => API.post('/ratings', { 
    store: store, 
    rating: rating 
  })
}

export default RatingService