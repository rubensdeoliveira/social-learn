import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  margin-bottom: 10px;
  padding: 15px;
`

export const CommentContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`

export const CommentContentRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  padding: 5px;
`

export const Username = styled.Text`
  margin-left: 5px;
  font-family: 'Poppins-Bold';
  color: #444;
`

export const Comment = styled.Text`
  color: #555;
  font-family: 'Poppins-Regular';
`

export const Created = styled.Text`
  font-size: 11px;
  font-family: 'Poppins-Regular';
  margin-left: auto;
  padding: 5px;
`
