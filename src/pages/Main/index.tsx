import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { Container, MenuItem, MenuItemIcon, MenuItemText } from './styles'

import Odontogenese from '../../assets/odontogenese.png'
import Esmalte from '../../assets/esmalte.png'
import DentinaPolpa from '../../assets/dentina-e-polpa.png'
import Periodonto from '../../assets/periodonto.png'
import MucosaOral from '../../assets/mucosa-oral.png'
import GlandulasSalivares from '../../assets/glandulas-salivares.png'
import Header from '../../components/Header'

const Main: React.FC = () => {
  const [menuItens] = useState([
    { name: 'Esportes', icon: Odontogenese },
    { name: 'Música', icon: Esmalte },
    { name: 'Ciência', icon: DentinaPolpa },
    { name: 'Entretenimento', icon: Periodonto },
    { name: 'Curiosidades', icon: MucosaOral },
    { name: 'Mundo Geek', icon: GlandulasSalivares },
  ])

  const navigation = useNavigation()

  return (
    <Container>
      <Header title="Historal" />
      {menuItens.map((menuItem) => (
        <MenuItem
          key={menuItem.name}
          onPress={() => {
            navigation.navigate('Feed', { categorie: menuItem.name })
          }}
        >
          <MenuItemIcon source={menuItem.icon} />
          <MenuItemText>{menuItem.name}</MenuItemText>
        </MenuItem>
      ))}
    </Container>
  )
}

export default Main
