import React from 'react'
import { Modal as MyModal, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useModal } from '../../hooks/modal'

import {
  Message,
  ContainerModal,
  ContainerCloseIcon,
  SuccessIcon,
} from './styles'

const Modal: React.FC = () => {
  const { isVisible, changeVisibility, rightAnswer } = useModal()

  return (
    <MyModal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={() => {
        changeVisibility(false)
      }}
    >
      <ContainerModal rightAnswer={rightAnswer}>
        <SuccessIcon
          name={rightAnswer ? 'thumbs-up' : 'thumbs-down'}
          size={40}
          color="white"
        />
        <Message>
          {rightAnswer
            ? 'Parabéns, resposta correta!'
            : 'Resposta incorrenta, tente novamente!'}
        </Message>
      </ContainerModal>
      <ContainerCloseIcon rightAnswer={rightAnswer}>
        <TouchableOpacity
          onPress={() => {
            changeVisibility(false)
          }}
          style={{ marginTop: 'auto' }}
        >
          <Icon name="times-circle" size={40} color="white" />
        </TouchableOpacity>
      </ContainerCloseIcon>
    </MyModal>
  )
}

export default Modal
