import React from 'react'

import { Container, Image } from './styles'

import Author from '../Author'
import Comments from '../Comments'
import AddComment from '../AddComment'
import PublicationDate from '../PublicationDate'

interface CommentObject {
  username: string
  comment: string
}

interface PostProps {
  comments: CommentObject[]
  email: string
  username: string
  image: string
  create_at: string
}

const Post: React.FC<PostProps> = ({
  image,
  created_at,
  username,
  email,
  comments,
}) => {
  return (
    <Container>
      <Image source={{ uri: image }} />
      <PublicationDate created_at={created_at} />
      <Author email={email} username={username} />
      <Comments comments={comments} />
      <AddComment />
    </Container>
  )
}

export default Post
