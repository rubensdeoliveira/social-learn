import styled, { css } from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface ContainerModalProps {
  rightAnswer: boolean
}

export const ContainerModal = styled.View<ContainerModalProps>`
  align-items: center;
  justify-content: center;
  flex: 1;
  background: green;
  padding: 20px;

  ${(props) =>
    props.rightAnswer
      ? css`
          background: #28a745;
        `
      : css`
          background: #dc3545;
        `}
`

export const Message = styled.Text`
  font-size: 25px;
  color: white;
  text-align: center;
`

export const SuccessIcon = styled(Icon)`
  margin-bottom: 10px;
`

export const ContainerCloseIcon = styled.View<ContainerModalProps>`
  align-items: center;
  padding: 20px;

  ${(props) =>
    props.rightAnswer
      ? css`
          background: #28a745;
        `
      : css`
          background: #dc3545;
        `}
`
