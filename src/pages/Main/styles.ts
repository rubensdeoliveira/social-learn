import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`

export const MenuItem = styled.TouchableOpacity`
  width: 50%;
  height: 30%;
  align-items: center;
  justify-content: center;
`

export const MenuItemIcon = styled.Image`
  width: 100px;
  height: 100px;
`

export const MenuItemText = styled.Text`
  font-family: 'Poppins-Bold';
  margin-top: 10px;
  font-size: 15px;
`
