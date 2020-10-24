import API from './API'

const EstablishmentsService = {
  index: (latitude, longitude) => API.get(
    `/google_stores?latitude=${latitude}&longitude=${longitude}`
  ),

  show: (place_id) => API.get(
    `/google_stores/${place_id}`
  )
}

export default EstablishmentsService
