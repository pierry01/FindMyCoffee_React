import React from 'react'
import { Container } from './styles'
import Form from './Form'

const Ratings = ({ place }) => {
  return (
    <Container>
      <Form place={ place } />
    </Container>
  )
}

export default Ratings
