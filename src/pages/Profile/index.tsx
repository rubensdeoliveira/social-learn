import React, { useCallback } from 'react'
import {
  Container,
  GravatarImage,
  Username,
  Email,
  Button,
  ButtonText,
} from './styles'
import { useAuth } from '../../hooks/auth'

interface UserData {
  email: string
  username: string
  name: string
}

const Profile: React.FC = () => {
  const { signOut, user } = useAuth()

  console.log(user)

  const logout = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <Container>
      <GravatarImage options={{ email: user.email, secure: true }} />
      <Username>{user.username}</Username>
      <Email>{user.username}</Email>
      <Button onPress={logout}>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  )
}

export default Profile
