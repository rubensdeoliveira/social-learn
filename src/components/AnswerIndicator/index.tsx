import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuth } from '../../hooks/auth'

interface AnwerIndicatoProps {
  id: string
}

interface AnswerState {
  idQuestion: string
  correct: boolean
}

const AnswerIndicator: React.FC<AnwerIndicatoProps> = ({ id }) => {
  const { userAnswers } = useAuth()

  const view = useCallback(() => {
    const findAnswer = userAnswers.find(
      (answer: AnswerState) => answer.idQuestion === id,
    )

    if (findAnswer) {
      const userAnsweredCorrected = findAnswer.correct
      return (
        <Icon
          name={userAnsweredCorrected ? 'thumbs-up' : 'thumbs-down'}
          color={userAnsweredCorrected ? '#28a745' : '#dc3545'}
          size={35}
          style={{
            marginRight: 15,
            marginTop: 15,
            marginLeft: 'auto',
            marginBottom: 0,
          }}
        />
      )
    }
    return null
  }, [userAnswers, id])

  return <>{view()}</>
}

export default AnswerIndicator
