import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px;
`

export const Back = styled.TouchableOpacity`
  margin-top: auto;
`

export const BackText = styled.Text`
  color: #333333;
  font-size: 16px;
  font-family: 'Poppins-Regular';
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

export const Username = styled.Text`
  margin-top: 30px;
  font-size: 30px;
  font-family: 'Poppins-Bold';
  text-align: center;
  color: #000;
`
