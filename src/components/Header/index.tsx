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

interface HeaderParams {
  title: string
}

const Header: React.FC<HeaderParams> = ({ title }) => {
  const { user } = useAuth()

  const username = user ? user.username : 'Anônimo'

  return (
    <Container>
      <RowContainer>
        <Image source={logo} />
        <Title>{title}</Title>
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
