import React, { useCallback } from 'react'
import { Container, GravatarImage, Username, Email } from './styles'
import { useAuth } from '../../hooks/auth'
import Button from '../../components/Button'

interface UserData {
  email: string
  username: string
  name: string
}

const Profile: React.FC = () => {
  const { signOut, user, userAnswers } = useAuth()

  const handleLogout = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <Container>
      <GravatarImage options={{ email: user.email, secure: true }} />
      <Username>{user.username}</Username>
      <Email>{user.username}</Email>
      <Button onPress={handleLogout}>Sair</Button>
    </Container>
  )
}

export default Profile
