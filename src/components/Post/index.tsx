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
  user: UserData
  question: QuestionData
  created_at: string
}

interface UserData {
  username: string
  email: string
}

interface QuestionData {
  image: string
}

const Post: React.FC<PostProps> = ({
  question,
  created_at,
  user,
  comments,
}) => {
  return (
    <Container>
      <Image source={{ uri: question.image }} />
      <PublicationDate created_at={created_at} />
      <Author email={user.email} username={user.username} />
      <Comments comments={comments} />
      <AddComment />
    </Container>
  )
}

export default Post
