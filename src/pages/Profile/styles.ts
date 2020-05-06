import styled from 'styled-components/native'

import Button from '../../components/Button'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px;
`

export const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 60px;
`

export const EditPhoto = styled.TouchableOpacity`
  margin-top: 10px;
`

export const EditPhotoText = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 16px;
`

export const Username = styled.Text`
  margin-top: 50px;
  font-size: 30px;
  font-family: 'Poppins-Bold';
`

export const College = styled.Text`
  font-size: 25px;
  font-family: 'Poppins-Regular';
`

export const SaveButton = styled(Button)`
  margin-top: auto;
`
