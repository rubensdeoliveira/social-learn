import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useModal } from '../../hooks/modal'

import Modal from '../Modal'

import { Container, Description, Choice, ChoiceText } from './styles'

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

interface QuestionProps {
  question: QuestionData
  id: string
}

interface AnswerState {
  idQuestion: string
  correct: boolean
}

interface UserAnswersState {
  userAnswers?: AnswerState[]
}

const Question: React.FC<QuestionProps> = ({ question, id }) => {
  const choices = Object.keys(question.choices)

  const { user, token, setUserAnswersValue } = useAuth()
  const { changeVisibility, setRightAnswerValue } = useModal()

  const handleQuestionAnswered = useCallback(
    async (choice) => {
      try {
        const userAnswerCorrected = question.correctChoice === choice
        const response = await api.get(`users/${user.id}.json`)
        const { userAnswers } = response.data

        if (userAnswers == null) {
          const responseAnswer = await api.patch(
            `users/${user.id}.json?auth=${token}`,
            {
              userAnswers: [{ idQuestion: id, correct: userAnswerCorrected }],
            },
          )

          await setUserAnswersValue(responseAnswer.data.userAnswers)
        } else {
          const findIndex = userAnswers.findIndex((answer: AnswerState) => {
            return answer.idQuestion === id
          })

          if (findIndex >= 0) {
            userAnswers.splice(findIndex, 1)
          }

          const responseAnswer = await api.patch(
            `users/${user.id}.json?auth=${token}`,
            {
              userAnswers: [
                ...userAnswers,
                { idQuestion: id, correct: userAnswerCorrected },
              ],
            },
          )

          await setUserAnswersValue(responseAnswer.data.userAnswers)
        }

        setRightAnswerValue(userAnswerCorrected)
        changeVisibility(true)
      } catch {
        if (!user) {
          Alert.alert(
            'Erro',
            'Você precisa estar logado para responder a pergunta',
          )
        } else {
          Alert.alert('Ocorreu um erro', 'Tente responder a pergunta novamente')
        }
      }
    },
    [
      question,
      id,
      token,
      user,
      changeVisibility,
      setRightAnswerValue,
      setUserAnswersValue,
    ],
  )

  return (
    <Container>
      <Description>{question.description}</Description>
      {choices.map((choice) => (
        <Choice
          key={choice}
          onPress={() => {
            handleQuestionAnswered(choice)
          }}
        >
          <ChoiceText>{question.choices[choice]}</ChoiceText>
        </Choice>
      ))}
      <Modal />
    </Container>
  )
}

export default Question
