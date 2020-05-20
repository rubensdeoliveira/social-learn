import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Image,
  Username,
  Edit,
  EditText,
  SaveButton,
  EmptyPhoto,
} from './styles'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { FIREBASE_STORAGE_URL } from '../../env.js'

interface UserData {
  email: string
  username: string
  name: string
}

interface ImageProps {
  base64: string
  uri: string
}

const Profile: React.FC = () => {
  const { signOut, user, token, modifyUser } = useAuth()
  const navigation = useNavigation()

  const handlePickImage = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Escolha a imagem',
        maxHeight: 600,
        maxWidth: 800,
      },
      async (res) => {
        if (!res.didCancel) {
          try {
            const response = await axios({
              url: 'uploadImage',
              baseURL: FIREBASE_STORAGE_URL,
              method: 'post',
              data: {
                image: res.data,
              },
            })

            await api.patch(`/users/${user.id}.json?auth=${token}`, {
              image: response.data.imageUrl,
            })

            await modifyUser({ ...user, image: response.data.imageUrl })
          } catch (err) {
            Alert.alert('Erro ao editar foto', err.message)
          }
        }
      },
    )
  }, [user, token, modifyUser])

  const handleLogout = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <Container>
      {user && user.image ? (
        <Image source={{ uri: user.image }} />
      ) : (
        <EmptyPhoto />
      )}
      <Edit onPress={handlePickImage}>
        <EditText>Alterar foto</EditText>
      </Edit>
      <Username>{user.username}</Username>
      <Edit
        onPress={() => {
          navigation.navigate('EditInfo')
        }}
      >
        <EditText>Alterar informações</EditText>
      </Edit>
      <SaveButton onPress={handleLogout}>Sair</SaveButton>
    </Container>
  )
}

export default Profile
