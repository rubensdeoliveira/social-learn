import React, { createContext, useCallback, useState, useContext } from 'react'

interface ModalContextData {
  isVisible: boolean
  rightAnswer: boolean
  changeVisibility(visibility: boolean): void
  setRightAnswerValue(rightAnswerValue: boolean): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

const ModalProvider: React.FC = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [rightAnswer, setRightAnswer] = useState(false)

  const changeVisibility = useCallback((visibility) => {
    setIsVisible(visibility)
  }, [])

  const setRightAnswerValue = useCallback((rightAnswerValue) => {
    setRightAnswer(rightAnswerValue)
  }, [])

  return (
    <ModalContext.Provider
      value={{ isVisible, rightAnswer, changeVisibility, setRightAnswerValue }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const useModal = (): ModalContextData => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}

export { ModalProvider, useModal }
