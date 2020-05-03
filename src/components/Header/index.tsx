import React from 'react'

import {
  Container,
  RowContainer,
  Image,
  Title,
  UserContainer,
  Username,
  GravatarImage,
} from './styles'
import { useAuth } from '../../hooks/auth'

import logo from '../../assets/logo.png'

const Header: React.FC = () => {
  const { user } = useAuth()

  const username = user ? user.username : 'Anônimo'

  return (
    <Container>
      <RowContainer>
        <Image source={logo} />
        <Title>Historal</Title>
      </RowContainer>
      <UserContainer>
        <Username>{username}</Username>
        {user && (
          <GravatarImage options={{ email: user.email, secure: true }} />
        )}
      </UserContainer>
    </Container>
  )
}

export default Header
