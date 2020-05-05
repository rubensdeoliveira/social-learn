import React, { useEffect, useState, useCallback } from 'react'

import { Alert, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

import api from '../../services/api'
import 'moment/min/locales'

import {
  Container,
  CommentContainer,
  Username,
  Comment,
  Created,
  CommentContentRow,
} from './styles'
import { useAuth } from '../../hooks/auth'

const CommentsPage: React.FC = () => {
  const [comments, setComments] = useState([])

  const { token, user } = useAuth()
  const route = useRoute()
  const { id } = route.params

  const loadComments = useCallback(async (): Promise<void> => {
    try {
      const response = await api.get(`posts/${id}.json`)

      setComments(response.data.comments || [])
    } catch (err) {
      Alert.alert(
        'Erro ao carregar comentários',
        'Não foi possível carregar os comentários',
      )
    }
  }, [id])

  useEffect(() => {
    loadComments()
  }, [])

  const handleRemoveComment = useCallback(
    async (comment) => {
      try {
        const response = await api.get(`posts/${id}.json`)

        const commentsData =
          response.data.comments.filter(
            (commentData) => commentData.id !== comment.id,
          ) || []

        await api.patch(`/posts/${id}.json?auth=${token}`, {
          comments: commentsData,
        })

        await loadComments()
      } catch {
        Alert.alert(
          'Erro ao excluir comentário',
          'Não foi possível excluir o comentário, tente novamente',
        )
      }
    },
    [token, id, loadComments],
  )

  return (
    <ScrollView>
      <Container>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentContainer key={`${comment.username + index}`}>
              <CommentContentRow>
                <Username>{comment.username}: </Username>
                <Comment>{comment.comment}</Comment>
              </CommentContentRow>
              <Created>{moment(comment.created_at).calendar()}</Created>
              {user.email === comment.email && (
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={() => handleRemoveComment(comment)}
                >
                  <Icon name="times" size={15} />
                </TouchableOpacity>
              )}
            </CommentContainer>
          ))
        ) : (
          <Text>Sem comentários para exibir</Text>
        )}
      </Container>
    </ScrollView>
  )
}

export default CommentsPage
