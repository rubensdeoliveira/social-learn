import React, { useState, useCallback } from 'react'
import ImagePicker from 'react-native-image-picker'
import { Alert, ScrollView } from 'react-native'
import axios from 'axios'
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

  const { token } = useAuth()

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

      console.log(responseImage)

      const post = { image: responseImage.data.imageUrl }

      await api.post(`posts.json?auth=${token}`, post)
    } catch (err) {
      console.log(err)
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
