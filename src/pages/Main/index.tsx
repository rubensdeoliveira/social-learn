import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { Container, MenuItem, MenuItemIcon, MenuItemText } from './styles'
import Header from '../../components/Header'

import Sports from '../../assets/sports.png'
import Music from '../../assets/music.png'
import Science from '../../assets/science.png'
import Entertainment from '../../assets/entertainment.png'
import Code from '../../assets/code.png'
import Geek from '../../assets/geek.png'

const Main: React.FC = () => {
  const [menuItens] = useState([
    { name: 'Esportes', icon: Sports },
    { name: 'Música', icon: Music },
    { name: 'Ciência', icon: Science },
    { name: 'Entretenimento', icon: Entertainment },
    { name: 'Programação', icon: Code },
    { name: 'Mundo Geek', icon: Geek },
  ])

  const navigation = useNavigation()

  return (
    <Container>
      <Header title="Social Learn" />
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
