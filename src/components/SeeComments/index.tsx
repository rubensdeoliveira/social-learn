import React from 'react'

import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Container, SeeAllText, SeeAllCommentContainer } from './styles'

interface CommentObject {
  username: string
  comment: string
}

interface CommentProps {
  comments: CommentObject[]
}

const SeeComments: React.FC<CommentProps> = ({ id }) => {
  const navigation = useNavigation()

  return (
    <Container>
      <SeeAllCommentContainer>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CommentsPage', { id })
          }}
        >
          <SeeAllText>Ver comentários</SeeAllText>
        </TouchableOpacity>
      </SeeAllCommentContainer>
    </Container>
  )
}

export default SeeComments
