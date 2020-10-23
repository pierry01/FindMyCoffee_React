import React, { useState, useEffect } from 'react'
import { Container } from './styles'
import Form from './Form'
import StoreService from '../../../services/store'
import ReactStars from 'react-rating-stars-component'

const Ratings = ({ place }) => {
  const [store, setStore] = useState([])

  // eslint-disable-next-line
  useEffect(() => { loadStore() }, [place])

  const loadStore = async () => {
    setStore([])

    try {
      const response = await StoreService.show(place.place_id)
      setStore(response.data)
    } catch (e) { 
      setStore([]) 
      console.log(e)
    }
  }

  return (
    <Container>
      <h4>
        { store.ratings_count || 0 } Opiniões

        { 
          store.ratings_average && 
            <ReactStars edit={ false } value={ store.ratings_average || 0 } /> 
        }
      </h4>
      
      <hr />
      
      {
        store.ratings &&
          <div>
            {
              store.ratings.map((rating, key) => {
                return(
                  <div key={ key }>
                    <strong>{ rating.user_name }</strong>
                    <ReactStars edit={ false } value={ rating.value } />
                    <p>{ rating.opinion }</p>
                    <p>{ rating.date }</p>
                    <hr />
                  </div>
                )
              })
            }
          </div>
      }

      <Form place={ place } loadStore={ loadStore } />
    </Container>
  )
}

export default Ratings
