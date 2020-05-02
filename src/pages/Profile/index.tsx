import React, { useCallback } from 'react'
import {
  Container,
  GravatarImage,
  Nickname,
  Email,
  Button,
  ButtonText,
} from './styles'
import { useAuth } from '../../hooks/auth'

const Profile: React.FC = () => {
  const { signOut } = useAuth()

  const logout = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <Container>
      <GravatarImage
        options={{ email: 'fulanodetal@gmail.com', secure: true }}
      />
      <Nickname>Fulano de tal</Nickname>
      <Email>fulanodetal@gmail.com</Email>
      <Button onPress={logout}>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  )
}

export default Profile
