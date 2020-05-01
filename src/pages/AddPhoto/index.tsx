import React, { useState, useCallback } from 'react'
import ImagePicker from 'react-native-image-picker'

import { Alert, ScrollView } from 'react-native'
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

const AddPhoto: React.FC = () => {
  const [image, setImage] = useState({})

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
    Alert.alert('Image adicionada!')
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
