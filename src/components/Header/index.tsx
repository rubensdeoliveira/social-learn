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

import logo from '../../assets/logo.png'

const Header: React.FC = () => (
  <Container>
    <RowContainer>
      <Image source={logo} />
      <Title>Historal</Title>
    </RowContainer>
    <UserContainer>
      <Username>Junior</Username>
      <GravatarImage
        options={{ email: 'jroliveirati@gmail.com', secure: true }}
      />
    </UserContainer>
  </Container>
)

export default Header
