import React from 'react'

import { Container, Image } from './styles'

import Author from '../Author'

import ImageStatic from '../../assets/teste.png'

const Post: React.FC = () => (
  <Container>
    <Image source={ImageStatic} />
    <Author email="jroliveirati@gmail.com" nickname="Junior" />
  </Container>
)

export default Post
