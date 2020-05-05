import React, { useState, useCallback } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { uuid } from 'uuidv4'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import {
  Container,
  CommentContainer,
  CommentInput,
  EditModeButton,
  CommentText,
} from './styles'

const AddComment: React.FC = ({ id }) => {
  const [comment, setComment] = useState('')
  const [editMode, setEditMode] = useState(false)

  const { token, user } = useAuth()
  const navigation = useNavigation()

  const handleAddComment = useCallback(async () => {
    try {
      const response = await api.get(`posts/${id}.json`)

      const comments = response.data.comments || []
      comments.push({
        comment,
        username: user.username,
        email: user.email,
        created_at: new Date(),
        id: Math.random().toString(36).substr(2, 9),
      })

      await api.patch(`/posts/${id}.json?auth=${token}`, {
        comments,
      })

      setComment('')
      setEditMode(false)
      navigation.navigate('CommentsPage', { id })
    } catch (err) {
      Alert.alert('Erro ao adicionar comentário', err.message)
    }
  }, [token, id, comment, user, navigation])

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
