import React from 'react'

// import { Gravatar } from 'react-native-gravatar'

import { Container, GravatarImage, Nickname } from './styles'

interface AuthorProps {
  email: string
  nickname: string
}

const Author: React.FC<AuthorProps> = ({ email, nickname }) => (
  <Container>
    <GravatarImage options={{ email, secure: true }} />
    <Nickname>{nickname}</Nickname>
  </Container>
)

export default Author
