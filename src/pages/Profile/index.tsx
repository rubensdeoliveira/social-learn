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

interface UserData {
  email: string
  nickname: string
  name: string
}

const Profile: React.FC = () => {
  const { signOut, user } = useAuth()

  const logout = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <Container>
      <GravatarImage options={{ email: user.name, secure: true }} />
      <Nickname>{user.nickname}</Nickname>
      <Email>{user.email}</Email>
      <Button onPress={logout}>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  )
}

export default Profile
