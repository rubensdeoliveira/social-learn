import styled from 'styled-components/native'

import { Dimensions } from 'react-native'

export const Container = styled.View``

export const Image = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: ${(Dimensions.get('window').width * 3) / 4}px;
`
