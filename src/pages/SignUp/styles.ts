import styled from 'styled-components/native'
import { TextInputMask as TIM } from 'react-native-masked-text'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`

export const Title = styled.Text`
  font-family: 'Poppins-Medium';
  font-size: 24px;
  color: #333333;
  margin: 44px 0 24px;
`

export const BackToSignIn = styled.TouchableOpacity`
  margin-top: 24px;
`

export const BackToSignInText = styled.Text`
  color: #333333;
  font-size: 16px;
  font-family: 'Poppins-Regular';
`

export const PickerContainer = styled.View`
  width: 100%;
  background: #e6e6e6;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #e6e6e6;
  flex-direction: row;
  align-items: center;
  padding: 0px 5px;
`

export const Picker = styled.Picker`
  flex: 1;
  font-family: 'Poppins-Regular';
  width: 100%;
`

export const TextInputMaskContainer = styled.View`
  width: 100%;
  background: #e6e6e6;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #e6e6e6;
  flex-direction: row;
  align-items: center;
  padding: 0px 5px;
`

export const TextInputMask = styled(TIM)`
  flex: 1;
  font-size: 16px;
  font-family: 'Poppins-Regular';
  padding: 15px;
`
