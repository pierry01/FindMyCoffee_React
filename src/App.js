import React, { Fragment, useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import Establishment from './components/Establishment'
import NearestCoffees from './components/NearestCoffees'
import EstablishmentsService from './services/establishments_service'

const App = () => {
  const { REACT_APP_GOOGLE_API_KEY } = process.env

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [locations, setLocations] = useState([])
  const [selected, setSelected] = useState({})

  // eslint-disable-next-line
  useEffect(() => { setCurrentLocation() }, [])

  const setCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      loadCoffeeShops()
    }, error => {
      alert('Habilite a localização para usar este APP.')
    })
  }

  const loadCoffeeShops = async () => {
    const response = await EstablishmentsService.index(latitude, longitude)
    setLocations(response.data.results)
  }

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={ REACT_APP_GOOGLE_API_KEY }>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={ 15 }
          center={{ lat: latitude, lng: longitude }}
        >
          {
            locations.map((item, key) => {
              return (
                <Marker
                  key={ key }
                  icon='/images/coffee-pin.png'
                  title={ item.name }
                  animation='4'
                  position={{
                    lat: item.geometry.location.lat,
                    lng: item.geometry.location.lng
                  }}
                  onClick={() => setSelected(item)}
                />
              )
            })
          }

          { selected.place_id && <Establishment place={selected} /> }

          <Marker
            title='Your location'
            icon='/images/my-location-pin.png'
            animation='2'
            position={{
              lat: latitude,
              lng: longitude
            }}
          />

          {
            (latitude !== 0 && longitude !== 0) &&
              <NearestCoffees latitude={ latitude } longitude={ longitude } />
          }
        </GoogleMap>
      </LoadScript>
    </Fragment>
  )
}

export default App
