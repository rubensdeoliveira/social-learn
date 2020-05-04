import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useModal } from '../../hooks/modal'

import Modal from '../Modal'

import { Container, Description, Choice, ChoiceText } from './styles'

interface QuestionData {
  description: string
}

const Question: React.FC<QuestionData> = ({ question, id }) => {
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
          await api.patch(`users/${user.id}.json?auth=${token}`, {
            userAnswers: [{ idQuestion: id, correct: userAnswerCorrected }],
          })
        } else {
          const findIndex = userAnswers.findIndex((answer) => {
            return answer.idQuestion === id
          })

          if (findIndex >= 0) {
            userAnswers.splice(findIndex, 1)
          }

          const userAnswersValue = [
            ...userAnswers,
            { idQuestion: id, correct: userAnswerCorrected },
          ]

          await api.patch(`users/${user.id}.json?auth=${token}`, {
            userAnswers: userAnswersValue,
          })

          await setUserAnswersValue(userAnswersValue)
          setRightAnswerValue(userAnswerCorrected)
          changeVisibility(true)
        }
      } catch {
        Alert.alert('Ocorreu um erro', 'Tente responder a pergunta novamente')
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
