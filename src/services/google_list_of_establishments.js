import API from './API'

const GoogleListOfEstablishmentsService = {
  index: (latitude, longitude) => API.get(
    `/google_stores?latitude=${latitude}&longitude=${longitude}`
  )
}

export default GoogleListOfEstablishmentsService
