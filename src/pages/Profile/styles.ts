import styled from 'styled-components/native'

import Button from '../../components/Button'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px;
`

export const EmptyPhoto = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 60px;
  background-color: #eee;
`

export const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 60px;
`

export const Edit = styled.TouchableOpacity`
  margin-top: 10px;
`

export const EditText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 12px;
  color: #333;
`

export const Username = styled.Text`
  margin-top: 30px;
  font-size: 30px;
  font-family: 'Poppins-Bold';
  text-align: center;
  color: #000;
`

export const SaveButton = styled(Button)`
  margin-top: auto;
`
