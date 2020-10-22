import React, { Fragment, useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const App = () => {
  const { REACT_APP_GOOGLE_API_KEY } = process.env

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => { setCurrentLocation() }, [])

  const setCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    }, error => {
      alert('Habilite a localização para usar este APP.')
    })
  }

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={ REACT_APP_GOOGLE_API_KEY }>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={ 15 }
          center={{ lat: latitude, lng: longitude }}
        >
        
        </GoogleMap>
      </LoadScript>
    </Fragment>
  )
}

export default App
