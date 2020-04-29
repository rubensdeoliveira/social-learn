import styled from 'styled-components/native'

import { Gravatar } from 'react-native-gravatar'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const GravatarImage = styled(Gravatar)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin: 0 10px;
`

export const Nickname = styled.Text`
  color: #444;
  margin: 10px 0;
  font-size: 15px;
  font-family: 'Poppins-Bold';
`
