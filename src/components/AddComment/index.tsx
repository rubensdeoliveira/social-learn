import React, { useState, useCallback } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'

import { Alert } from 'react-native'
import {
  Container,
  CommentContainer,
  CommentInput,
  EditModeButton,
  CommentText,
} from './styles'

const AddComment: React.FC = () => {
  const [comment, setComment] = useState('')
  const [editMode, setEditMode] = useState(false)

  const handleAddComment = useCallback(() => {
    Alert.alert('Adicionado', comment)
  }, [comment])

  const handleCommentInputChange = useCallback((commentText) => {
    setComment(commentText)
  }, [])

  const handleEditModePress = useCallback(() => {
    setEditMode(!editMode)
  }, [editMode])

  return (
    <Container>
      {editMode ? (
        <CommentContainer>
          <CommentInput
            placeholder="Digite um comentário..."
            value={comment}
            onChangeText={(commentText) =>
              handleCommentInputChange(commentText)
            }
            onSubmitEditing={handleAddComment}
            autoFocus
          />

          <EditModeButton onPress={handleEditModePress}>
            <Icon name="times" size={15} color="#555" />
          </EditModeButton>
        </CommentContainer>
      ) : (
        <EditModeButton onPress={handleEditModePress}>
          <CommentContainer>
            <Icon name="comment-o" size={25} color="#555" />
            <CommentText>Adicione um comentário</CommentText>
          </CommentContainer>
        </EditModeButton>
      )}
    </Container>
  )
}

export default AddComment
