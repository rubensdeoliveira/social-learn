import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TextInputMask as TIM } from 'react-native-masked-text'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #e6e6e6;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #e6e6e6;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff6b6b;
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Poppins-Regular';
  padding-top: 15px;
`

export const TextInputMask = styled(TIM)`
  flex: 1;
  font-size: 16px;
  font-family: 'Poppins-Regular';
  padding-top: 15px;
`

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
`
