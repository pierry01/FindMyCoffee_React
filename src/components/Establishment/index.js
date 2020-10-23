import React, { useState, useEffect } from 'react'
import EstablishmentsService from '../../services/establishments_service'
import { LeftBar, Image, Title, Paragraph } from './styles'
import Ratings from './Ratings'

const Establishment = ({ place }) => {
  const { REACT_APP_GOOGLE_API_KEY } = process.env

  const [establishment, setEstablishment] = useState([])

  // eslint-disable-next-line
  useEffect(() => { getEstablishmentDetails() }, [place])

  const getEstablishmentDetails = async () => {
    try {
      const response = await EstablishmentsService.show(place.place_id)
      setEstablishment(response.data.result)
    } catch (e) {
      setEstablishment([])
    }
  }

  return(
    <LeftBar>
      {
        (establishment.photos) ?
          <Image 
            src={
              `https://maps.googleapis.com/maps/api/place/photo?photoreference=${ establishment.photos[0].photo_reference }&key=${ REACT_APP_GOOGLE_API_KEY }&maxwidth=400`
            }
            alt='Coffee Photo'
          /> : <Image src='/images/no_photo.jpg' alt='Coffee no Photo' />
      }
      
      <Title>{ establishment.name }</Title>
      
      {
        (establishment.opening_hours) ?
          <div>
            {
              (establishment.opening_hours.open_now === true) ? 'Open' : 'Closed'
            }
            
            <hr />
            
            {
              establishment.opening_hours.weekday_text.map((schedule, key) => {
                return <Paragraph key={ key }>{ schedule }</Paragraph>
              })
            }
          </div> : <Paragraph>'Não há cadastro de dias e horários abertos'</Paragraph>
      }
      
      <hr />
      
      <Paragraph>{ establishment.formatted_address }</Paragraph>
      
      <Ratings place={ place } />
    </LeftBar>
  )
}

export default Establishment
