import React from 'react'

import { Container, Image } from './styles'

import ImageStatic from '../../assets/imgs/desafio.png'

const Post: React.FC = () => (
  <Container>
    <Image source={ImageStatic} />
  </Container>
)

export default Post
