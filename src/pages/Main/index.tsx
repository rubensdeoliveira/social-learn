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
    { name: 'Odontogênese', icon: Odontogenese },
    { name: 'Esmalte', icon: Esmalte },
    { name: 'Dentina e Polpa', icon: DentinaPolpa },
    { name: 'Periodonto', icon: Periodonto },
    { name: 'Mucosa Oral', icon: MucosaOral },
    { name: 'Glândulas Salivares', icon: GlandulasSalivares },
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
