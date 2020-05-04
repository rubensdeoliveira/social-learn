import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuth } from '../../hooks/auth'

const AnswerIndicator: React.FC = ({ id }) => {
  const { userAnswers } = useAuth()

  const view = useCallback(() => {
    const findAnswer = userAnswers.find((answer) => answer.idQuestion === id)

    if (findAnswer) {
      const userAnsweredCorrected = findAnswer.correct
      return (
        <Icon
          name={userAnsweredCorrected ? 'thumbs-up' : 'thumbs-down'}
          color={userAnsweredCorrected ? '#28a745' : '#dc3545'}
          size={30}
          style={{ marginRight: 10 }}
        />
      )
    }
    return null
  }, [userAnswers, id])

  return <>{view()}</>
}

export default AnswerIndicator
