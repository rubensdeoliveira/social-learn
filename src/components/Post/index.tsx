import React from 'react'

import { Container, Image } from './styles'

import Author from '../Author'
import Comments from '../Comments'

import ImageStatic from '../../assets/teste.png'

interface CommentObject {
  nickname: string
  comment: string
}

interface PostProps {
  comments: CommentObject[]
}

const Post: React.FC<PostProps> = ({ comments }) => (
  <Container>
    <Image source={ImageStatic} />
    <Author email="jroliveirati@gmail.com" nickname="Junior" />
    <Comments comments={comments} />
  </Container>
)

export default Post
