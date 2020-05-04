import styled from 'styled-components/native'

import { Dimensions } from 'react-native'

export const Container = styled.View``

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`

export const Image = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: ${(Dimensions.get('window').width * 3) / 4}px;
  margin-top: 10px;
`

export const SeeCommentsText = styled.Text`
  font-family: 'Poppins-Bold';
`
