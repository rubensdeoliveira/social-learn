import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import { Container } from './styles'

interface DeletePostProps {
  id: string
}

const DeletePost: React.FC<DeletePostProps> = ({ id }) => {
  const { token, user } = useAuth()
  const navigation = useNavigation()

  const handleDeletePost = useCallback(() => {
    Alert.alert(
      'Atenção',
      'Deseja mesmo excluir a pergunta selecionada definitivamente?',
      [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              if (!user.isModerator) {
                Alert.alert(
                  'Erro ao deletar pergunta',
                  'Você não tem permissões para deletar a pergunta',
                )
                return
              }

              await api.delete(`posts/${id}.json?auth=${token}`)

              Alert.alert('Sucesso', 'Pergunta excluída com sucesso')

              navigation.navigate('Main')
            } catch {
              Alert.alert(
                'Erro ao deletar pergunta',
                'Não foi possível deletar a pergunta, tente novamente',
              )
            }
          },
        },
      ],
    )
  }, [id, token, user, navigation])

  return (
    <>
      {user && user.isModerator && (
        <Container onPress={handleDeletePost}>
          <Icon name="trash-2" size={30} color="#ff6b6b" />
        </Container>
      )}
    </>
  )
}

export default DeletePost
