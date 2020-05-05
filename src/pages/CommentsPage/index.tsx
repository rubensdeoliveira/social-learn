import React, { useEffect, useState } from 'react'

import { Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import api from '../../services/api'

import { Container, CommentContainer, Username, Comment } from './styles'

const CommentsPage: React.FC = () => {
  const [comments, setComments] = useState([])

  const route = useRoute()
  const { id } = route.params

  useEffect(() => {
    const loadComments = async (): Promise<void> => {
      try {
        const response = await api.get(`posts/${id}.json`)

        setComments(response.data.comments || [])
      } catch (err) {
        Alert.alert(
          'Erro ao carregar comentários',
          'Não foi possível carregar os comentários',
        )
      }
    }

    loadComments()
  }, [id, comments])

  return (
    <ScrollView>
      <Container>
        {comments &&
          comments.map((comment, index) => (
            <CommentContainer key={`${comment.username + index}`}>
              <Username>{comment.username}: </Username>
              <Comment>{comment.comment}</Comment>
            </CommentContainer>
          ))}
      </Container>
    </ScrollView>
  )
}

export default CommentsPage
