import React, { useEffect, useState, useCallback } from 'react'

import {
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import {
  Container,
  CommentContainer,
  Username,
  Comment,
  Created,
  CommentContentRow,
} from './styles'
import { useAuth } from '../../hooks/auth'

interface CommentData {
  email: string
  userId: string
  comment: string
  created_at: string
  id: string
  username: string
}

const CommentsPage: React.FC = () => {
  const [comments, setComments] = useState([])

  const { token, user } = useAuth()
  const route = useRoute()
  const { id } = route.params
  const navigation = useNavigation()

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
      Alert.alert('Atenção', 'Deseja mesmo excluir o comentário?', [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              if (!token) return

              const response = await api.get(`posts/${id}.json`)

              const commentsData =
                response.data.comments.filter(
                  (commentData: CommentData) => commentData.id !== comment.id,
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
        },
      ])
    },
    [token, id, loadComments],
  )

  return (
    <ScrollView>
      <Container>
        {comments && comments.length > 0 ? (
          comments.map((comment: CommentData, index) => (
            <CommentContainer key={`${comment.username + index}`}>
              <CommentContentRow>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('UserInfo', {
                      userId: comment.userId,
                      email: comment.email,
                    })
                  }}
                >
                  <Username>{comment.username}: </Username>
                </TouchableWithoutFeedback>
                <Comment>{comment.comment}</Comment>
              </CommentContentRow>
              <Created>
                {format(parseISO(comment.created_at), "dd'/'MM'/'yyyy HH:mm", {
                  locale: pt,
                })}
              </Created>
              {user && (user.id === comment.userId || user.isModerator) && (
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
