import React, { useState, useCallback, useRef } from 'react'
import ImagePicker from 'react-native-image-picker'
import { Alert, ScrollView } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import api from '../../services/api'
import { FIREBASE_STORAGE_URL } from '../../env.js'
import { useAuth } from '../../hooks/auth'
import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Title,
  ImageContainer,
  Image,
  PhotoButton,
  ChoiceContainer,
  ChoiceLabel,
  ChoiceAdd,
  PickerContainer,
  Picker,
  ChoiceRemove,
} from './styles'

interface ImageProps {
  base64: string
  uri: string
}

const AddPhoto: React.FC = () => {
  const [image, setImage] = useState({} as ImageProps)
  const [choices, setChoices] = useState([{ text: '' }, { text: '' }])
  const [questionCategorie, setQuestionCategorie] = useState('')
  const [correctChoice, setCorrectChoice] = useState('')

  const { token, user } = useAuth()
  const navigation = useNavigation()

  const formRef = useRef<FormHandles>(null)

  const handlePickImage = useCallback(() => {
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

  const setInititalState = useCallback(() => {
    setImage({} as ImageProps)
    setCorrectChoice('')
    setChoices([{ text: '' }, { text: '' }])
    setQuestionCategorie('')
  }, [])

  const validations = useCallback(
    (data): boolean => {
      console.log(data.choices.choiceA)

      if (!user.isModerator) {
        Alert.alert(
          'Não autorizado',
          'Somente moderadores podem criar perguntas',
        )
        return false
      }

      if (data.description.trim() === '') {
        Alert.alert('Erro', 'Preencha a pergunta para continuar')
        return false
      }

      if (
        data.choices.choiceA.trim() === '' ||
        data.choices.choiceB.trim() === '' ||
        (data.choices.choiceC !== undefined &&
          data.choices.choiceC.trim() === '') ||
        (data.choices.choiceD !== undefined &&
          data.choices.choiceD.trim() === '')
      ) {
        Alert.alert(
          'Erro',
          'Para continuar não deixe alternativas sem preencher',
        )
        return false
      }

      if (correctChoice === null || correctChoice === '') {
        Alert.alert(
          'Erro',
          'Selecione a alternativa correta da questão para continuar',
        )
        return false
      }

      if (questionCategorie === null || questionCategorie === '') {
        Alert.alert('Erro', 'Selecione a categoria da questão para continuar')
        return false
      }

      return true
    },
    [user, correctChoice, questionCategorie],
  )

  const handleCreateQuestion = useCallback(
    async (data) => {
      try {
        if (!validations(data)) return

        let imageData = null
        if (image.base64) {
          imageData = await axios({
            url: 'uploadImage',
            baseURL: FIREBASE_STORAGE_URL,
            method: 'post',
            data: {
              image: image.base64,
            },
          })
        }

        const post = {
          user: { username: user.username, email: user.email },
          created_at: new Date(),
          question: {
            image: imageData ? imageData.data.imageUrl : undefined,
            categorie: questionCategorie,
            ...data,
            correctChoice,
          },
        }

        await api.post(`posts.json?auth=${token}`, post)

        Alert.alert('Sucesso', 'Pergunta criada com sucesso!')
        setInititalState()

        navigation.navigate('Main')
      } catch (err) {
        Alert.alert('Erro ao criar pergunta', err.message)
      }
    },
    [
      validations,
      correctChoice,
      image,
      navigation,
      questionCategorie,
      user,
      token,
      setInititalState,
    ],
  )

  const handleAddChoice = useCallback(() => {
    if (choices.length < 4) {
      const newChoices = choices
      newChoices.push({ text: '' })

      setChoices([...newChoices])
    }
  }, [choices])

  const handleRemoveChoice = useCallback(() => {
    if (choices.length > 2) {
      const newChoices = choices
      newChoices.splice(choices.length - 1, 1)

      setChoices([...newChoices])
    }
  }, [choices])

  return (
    <ScrollView>
      <Container>
        <Title>Adicione uma imagem</Title>

        <ImageContainer>
          <Image source={image} />
        </ImageContainer>

        <PhotoButton onPress={handlePickImage}>
          <Icon name="camera" size={40} />
        </PhotoButton>

        <Form ref={formRef} onSubmit={handleCreateQuestion}>
          <Input icon="help-circle" name="description" />

          <ChoiceContainer>
            <ChoiceLabel>Alternativas:</ChoiceLabel>
            <ChoiceAdd onPress={handleAddChoice}>
              <Icon size={30} name="plus-circle" color="#ff6b6b" />
            </ChoiceAdd>
            <ChoiceRemove onPress={handleRemoveChoice}>
              <Icon size={30} name="minus-circle" color="#ff6b6b" />
            </ChoiceRemove>
          </ChoiceContainer>

          {choices.map((choice, index) => (
            <Input
              key={`${choice.text + index}`}
              icon="list"
              name={`choices[choice${String.fromCharCode(65 + index)}]`}
              placeholder={`alternativa ${String.fromCharCode(65 + index)}`}
            />
          ))}

          <PickerContainer>
            <Picker
              selectedValue={correctChoice}
              onValueChange={(choice) => setCorrectChoice(choice)}
            >
              <Picker.Item
                label="Selecione a alternativa correta..."
                value={null}
              />
              {choices.map((choice, index) => (
                <Picker.Item
                  key={`${choice.text + index}`}
                  label={`alternativa ${String.fromCharCode(65 + index)}`}
                  value={`choice${String.fromCharCode(65 + index)}`}
                />
              ))}
            </Picker>
          </PickerContainer>

          <PickerContainer>
            <Picker
              selectedValue={questionCategorie}
              onValueChange={(categorie) => setQuestionCategorie(categorie)}
            >
              <Picker.Item label="Selecione a categoria..." value={null} />
              <Picker.Item label="Odontogênese" value="Odontogênese" />
              <Picker.Item label="Esmalte" value="Esmalte" />
              <Picker.Item label="Dentina e Polpa" value="Dentina e Polpa" />
              <Picker.Item label="Periodonto" value="Periodonto" />
              <Picker.Item label="Mucosa Oral" value="Mucosa Oral" />
              <Picker.Item
                label="Glândulas Salivares"
                value="Glândulas Salivares"
              />
            </Picker>
          </PickerContainer>

          <Button
            onPress={() => {
              formRef.current?.submitForm()
            }}
            style={{ marginTop: 12 }}
          >
            Salvar
          </Button>
        </Form>
      </Container>
    </ScrollView>
  )
}

export default AddPhoto
