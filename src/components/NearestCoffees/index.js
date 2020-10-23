import React, { useState, useEffect } from 'react'
import StoreService from '../../services/store'
import { RightBar, Head, Body, Footer, EstablishmentItem, Title, Paragraph } from './styles'
import ReactStars from 'react-rating-stars-component'

const NearestCoffees = ({ latitude, longitude }) => {
  const [stores, setStores] = useState([])

  // eslint-disable-next-line
  useEffect(() => { loadNearstStores() }, [latitude])

  const loadNearstStores = async () => {
    const response = await StoreService.index(latitude, longitude)
    setStores(response.data)
  }

  return (
    <RightBar>
      <Head>
        <h3>Find My Coffee</h3>
      </Head>

      <Body>
        <strong>Mais amados na região</strong>
        <hr />
        {
          stores.map(store => {
            return (
              <EstablishmentItem key={store.name}>
                <Title>{store.name}</Title>

                <Paragraph>
                  {store.address}
                </Paragraph>

                { store.ratings_count || 0 } Opiniões
                <ReactStars edit={false} value={store.ratings_average || 0} />
                <hr/>
              </EstablishmentItem>
            )
          })
        }
      </Body>

      <Footer>
        <h2>OneBitCode.com</h2>
        <Paragraph>
          Projeto Open Source desenvolvido na Semana Super Full
          Stack da escola online de programação
        </Paragraph>
      </Footer>
    </RightBar>
  )
}

export default NearestCoffees
