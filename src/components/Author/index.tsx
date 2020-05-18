import React from 'react'

import { Container, Image, Username } from './styles'

import { useAuth } from '../../hooks/auth'

interface AuthorProps {
  email: string
  username: string
}

const Author: React.FC<AuthorProps> = ({ email, username }) => {
  const { user } = useAuth()

  return (
    <Container>
      {user && user.image && <Image source={{ uri: user.image }} />}
      <Username>{username}</Username>
    </Container>
  )
}

export default Author
