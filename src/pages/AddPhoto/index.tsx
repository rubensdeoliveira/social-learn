import React, { useState, useCallback } from 'react'
import ImagePicker from 'react-native-image-picker'
import { Alert, ScrollView } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import { FIREBASE_STORAGE_URL } from '../../env.js'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Title,
  ImageContainer,
  Image,
  PhotoButton,
  PhotoButtonText,
  SaveButton,
  SaveButtonText,
} from './styles'

interface ImageProps {
  base64: string
  uri: string
}

const AddPhoto: React.FC = () => {
  const [image, setImage] = useState({} as ImageProps)

  const { token, user } = useAuth()
  const navigation = useNavigation()

  const pickImage = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Escolha a imagem',
        maxHeight: 600,
        maxWidth: 800,
      },
      (res) => {
        if (!res.didCancel) {
          setImage({ uri: res.uri, base64: res.data })
        }
      },
    )
  }, [])

  const save = useCallback(async () => {
    try {
      const responseImage = await axios({
        url: 'uploadImage',
        baseURL: FIREBASE_STORAGE_URL,
        method: 'post',
        data: {
          image: image.base64,
        },
      })

      const post = {
        image: responseImage.data.imageUrl,
        email: user.email,
        username: user.username,
        created_at: new Date(),
      }

      await api.post(`posts.json?auth=${token}`, post)

      Alert.alert('Sucesso', 'Pergunta criada com sucesso!')

      navigation.navigate('Feed')
    } catch {
      Alert.alert(
        'Erro ao criar pergunta',
        'Não foi possível criar a pergunta, tente novamente',
      )
    }
  }, [])

  return (
    <ScrollView>
      <Container>
        <Title>Adicione uma imagem</Title>
        <ImageContainer>
          <Image source={image} />
        </ImageContainer>
        <PhotoButton onPress={pickImage}>
          <PhotoButtonText>Escolha a foto</PhotoButtonText>
        </PhotoButton>
        <SaveButton onPress={save}>
          <SaveButtonText>Salvar</SaveButtonText>
        </SaveButton>
      </Container>
    </ScrollView>
  )
}

export default AddPhoto
