import styled from 'styled-components/native'

import { Gravatar } from 'react-native-gravatar'

export const Container = styled.View`
  flex: 1;
  align-items: center;
`

export const GravatarImage = styled(Gravatar)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 100px;
`

export const Nickname = styled.Text`
  margin-top: 30px;
  font-size: 30px;
  font-family: 'Poppins-Bold';
`

export const Email = styled.Text`
  margin-top: 20px;
  font-size: 25px;
`

export const Button = styled.TouchableOpacity`
  margin-top: 30px;
  padding: 10px;
  background: #4286f4;
`

export const ButtonText = styled.Text`
  font-size: 20px;
  font-family: 'Poppins-Regular';
  color: #fff;
`
