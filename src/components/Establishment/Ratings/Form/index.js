import React, { useState } from 'react'
import { Container, Input, TextArea, Button } from './styles'
import ReactStars from 'react-rating-stars-component'

const Form = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [value, setValue] = useState(1)

  return (
    <Container>
      <h4>Deixe sua Opinião</h4>
      
      <form autoComplete='off'>
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
