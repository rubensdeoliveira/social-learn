import React from 'react'

import { Container, GravatarImage, Username } from './styles'

interface AuthorProps {
  email: string
  username: string
}

const Author: React.FC<AuthorProps> = ({ email, username }) => (
  <Container>
    <GravatarImage options={{ email, secure: true }} />
    <Username>{username}</Username>
  </Container>
)

export default Author
