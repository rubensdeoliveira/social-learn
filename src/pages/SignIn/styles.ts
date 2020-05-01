import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`

export const Title = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 24px;
  color: #333333;
  margin: 64px 0 24px;
`

export const Input = styled.TextInput`
  margin-top: 20px;
  width: 90%;
  background: #fff;
  height: 40px;
  border-width: 1px;
  border-color: #eee;
  font-family: 'Poppins-Regular';
`

export const Button = styled.TouchableOpacity`
  margin-top: 30px;
  padding: 10px;
  background: #4286f4;
`

export const ButtonText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 20px;
  color: #fff;
`
