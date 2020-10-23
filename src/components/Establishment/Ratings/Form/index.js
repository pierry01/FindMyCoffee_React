import React, { useState } from 'react'
import { Container, Input, TextArea, Button } from './styles'
import ReactStars from 'react-rating-stars-component'
import RatingService from '../../../../services/rating'

const Form = ({ place, loadStore }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [value, setValue] = useState(1)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const store_params = {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      name: place.name,
      address: place.formatted_address,
      google_place_id: place.place_id
    }

    const rating_params = {
      value: (value == null) ? 1 : value,
      opinion: message,
      user_name: name
    }

    await RatingService.create(store_params, rating_params)

    loadStore()

    setName('')
    setMessage('')
  }

  return (
    <Container>
      <h4>Deixe sua Opinião</h4>
      
      <form autoComplete='off' onSubmit={handleSubmit}>
        <Input
          type='text'
          name='name'
          placeholder='Primeiro nome'
          onChange={ e => setName(e.target.value) }
          value={ name }
        />
        
        <TextArea 
          type='textarea' 
          name='message'
          placeholder='Sua opinião'
          onChange={ e => setMessage(e.target.value) }
          value={ message }
        />
        
        <div>
          <ReactStars
            count={ 5 }
            value={ value }
            size={ 24 }
            activeColor='#ffd700'
            onChange={ newValue => { setValue(newValue) } }
          />
          
          <Button type='submit' className='button is-danger'>Enviar</Button>
        </div>
      </form>
    </Container>
  )
}

export default Form
