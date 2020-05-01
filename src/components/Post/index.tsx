import React from 'react'

import { Container, Image } from './styles'

import Author from '../Author'
import Comments from '../Comments'
import AddComment from '../AddComment'

import ImageStatic from '../../assets/teste.png'

interface CommentObject {
  nickname: string
  comment: string
}

interface PostProps {
  comments: CommentObject[]
  email: string
  nickname: string
}

const Post: React.FC<PostProps> = ({ comments, email, nickname }) => {
  return (
    <Container>
      <Image source={ImageStatic} />
      <Author email={email} nickname={nickname} />
      <Comments comments={comments} />
      <AddComment />
    </Container>
  )
}

export default Post
