import React, { useCallback } from 'react'

import {
  Container,
  GravatarImage,
  Nickname,
  Email,
  Button,
  ButtonText,
} from './styles'

const Profile: React.FC = () => {
  const logout = useCallback(() => {
    console.log('ok')
  }, [])

  return (
    <Container>
      <GravatarImage
        options={{ email: 'fulanodetal@gmail.com', secure: true }}
      />
      <Nickname>Fulano de tal</Nickname>
      <Email>fulanodetal@gmail.com</Email>
      <Button>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  )
}

export default Profile
