import styled from 'styled-components/native'

import { Dimensions } from 'react-native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Poppins-Bold';
`

export const ImageContainer = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').width / 2}px;
  background: #e6e6e6;
  margin-top: 10px;
  border-radius: 10px;
`

export const Image = styled.Image`
  width: 100%;
  height: ${Dimensions.get('window').width / 2}px;
`

export const PhotoButton = styled.TouchableOpacity`
  margin-top: 30px;
  margin-bottom: 30px;
`

export const ChoiceContainer = styled.View`
  flex-direction: row;
  font-size: 20px;
  color: #fff;
  font-family: 'Poppins-Regular';
  width: 100%;
  padding: 15px 0;
`

export const ChoiceLabel = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Bold';
  margin-right: 10px;
`

export const ChoiceAdd = styled.TouchableOpacity`
  margin-right: 5px;
`

export const ChoiceRemove = styled.TouchableOpacity``

export const PickerContainer = styled.View`
  width: 100%;
  background: #e6e6e6;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #e6e6e6;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  padding: 0px 5px;
`

export const Picker = styled.Picker`
  flex: 1;
`
