import styled from 'styled-components/native'

import { Dimensions } from 'react-native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Poppins-Bold';
  margin-top: 20px;
`

export const ImageContainer = styled.View`
  width: 90%;
  height: ${Dimensions.get('window').width / 2}px;
  background: #eee;
  margin-top: 10px;
`

export const Image = styled.Image`
  width: 100%;
  height: ${Dimensions.get('window').width / 2}px;
`

export const PhotoButton = styled.TouchableOpacity`
  margin-top: 30px;
  padding: 10px;
  background: #4286f4;
`

export const PhotoButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'Poppins-Regular';
`

export const SaveButton = styled.TouchableOpacity`
  margin: 30px;
  padding: 10px;
  background: #4286f4;
`

export const SaveButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'Poppins-Regular';
`
