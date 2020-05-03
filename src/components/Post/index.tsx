import React from 'react'

import { Container, Image } from './styles'

import Author from '../Author'
import Comments from '../Comments'
import AddComment from '../AddComment'

interface CommentObject {
  username: string
  comment: string
}

interface PostProps {
  comments: CommentObject[]
  email: string
  username: string
  image: string
}

const Post: React.FC<PostProps> = ({ comments, email, username, image }) => {
  return (
    <Container>
      <Image source={{ uri: image }} />
      <Author email={email} username={username} />
      <Comments comments={comments} />
      <AddComment />
    </Container>
  )
}

export default Post
