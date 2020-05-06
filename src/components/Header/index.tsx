import React from 'react'

import {
  Container,
  RowContainer,
  Title,
  ImageLogo,
  UserContainer,
  Username,
  UserImage,
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
        <ImageLogo source={logo} />
        <Title>{title}</Title>
      </RowContainer>
      <UserContainer>
        <Username>{username}</Username>
        {user && <UserImage source={{ uri: user.image }} />}
      </UserContainer>
    </Container>
  )
}

export default Header
