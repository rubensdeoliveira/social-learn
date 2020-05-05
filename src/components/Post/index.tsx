import React from 'react'

import { Container, Image, RowContainer } from './styles'

import Author from '../Author'
import SeeComments from '../SeeComments'
import AddComment from '../AddComment'
import PublicationDate from '../PublicationDate'
import Question from '../Question'
import AnswerIndicator from '../AnswerIndicator'

interface CommentData {
  username: string
  comment: string
}

interface PostData {
  comments: CommentData[]
  user: UserData
  question: QuestionData
  created_at: string
  id: string
}

interface UserData {
  username: string
  email: string
}

interface QuestionData {
  image: string
}

const Post: React.FC<PostData> = ({
  question,
  created_at,
  user,
  comments,
  id,
}) => {
  return (
    <Container>
      <Image source={{ uri: question.image }} />
      <PublicationDate created_at={created_at} />
      <Question question={question} id={id} />
      <RowContainer>
        <Author email={user.email} username={user.username} />
        <AnswerIndicator id={id} />
      </RowContainer>
      <SeeComments id={id} />
      <AddComment id={id} />
    </Container>
  )
}

export default Post
