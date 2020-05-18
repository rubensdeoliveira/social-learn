import React from 'react'

import { Container, Image } from './styles'

import PublicationDate from '../PublicationDate'
import DeletePost from '../DeletePost'
import Question from '../Question'
import AnswerIndicator from '../AnswerIndicator'
import SeeComments from '../SeeComments'
import AddComment from '../AddComment'

import questionImg from '../../assets/question.jpg'

interface ChoiceData {
  choiceA: string
  choiceB: string
  choiceC?: string
  choiceD?: string
}

interface QuestionData {
  image?: string
  description: string
  correctChoice: string
  categorie: string
  choices: ChoiceData
}

interface CommentData {
  email: string
  username: string
  comment: string
  created_at: string
  id: string
}

interface UserData {
  username: string
  email: string
}

interface PostData {
  comments: CommentData[]
  user: UserData
  question: QuestionData
  created_at: string
  id: string
}

const Post: React.FC<PostData> = ({ question, id, created_at }) => {
  return (
    <Container>
      <Image source={question.image ? { uri: question.image } : questionImg} />
      <PublicationDate created_at={created_at} />
      <DeletePost id={id} />
      <Question question={question} id={id} />
      <AnswerIndicator id={id} />
      <SeeComments id={id} />
      <AddComment id={id} />
    </Container>
  )
}

export default Post
