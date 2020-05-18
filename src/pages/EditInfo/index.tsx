import React, { useRef, useCallback, useState } from 'react'
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import { useNavigation } from '@react-navigation/native'
import { Container, Title, BackToProfile, BackToProfileText } from './styles'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

interface EditInfoFormData {
  username: string
  college?: string
}

const EditInfo: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const formRef = useRef<FormHandles>(null)
  const collegeInputRef = useRef<TextInput>(null)
  const usernameInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()
  const { user, token, modifyUser } = useAuth()
  const initialData = { username: user.username, college: user.college }

  const handleChangeInfo = useCallback(
    async (data: EditInfoFormData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const responseUsers = await api.get('users.json')
        const users = responseUsers.data
        const usersKeys = Object.keys(users)

        const findUserWithSameUsername = usersKeys.find(
          (userKey: string) => users[userKey].username === data.username,
        )

        if (findUserWithSameUsername && user.username !== data.username) {
          setLoading(false)
          Alert.alert('Erro', 'Já existe um usuário com o mesmo username')
          return
        }

        if (data.username.trim().length < 5) {
          setLoading(false)
          Alert.alert(
            'Erro',
            'Nome de usuário deve conter pelo menos 5 caracteres',
          )
          return
        }

        if (data.username.trim().includes(' ')) {
          setLoading(false)
          Alert.alert('Erro', 'Nome de usuário não deve conter espaços')
          return
        }

        await api.patch(`users/${user.id}.json?auth=${token}`, {
          username: data.username.trim(),
          college: data.college,
        })

        await modifyUser({
          ...user,
          username: data.username.trim(),
          college: data.college,
        })

        Alert.alert('Sucesso', 'Usuário alterado com sucesso')
        navigation.navigate('Profile')
      } catch {
        Alert.alert(
          'Erro ao alterar dados',
          'Ocorreu um erro ao alterar os dados, tente novamente',
        )
      }

      setLoading(false)
    },
    [navigation, user, token, modifyUser],
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <View>
            <Title>Altere suas informações</Title>
          </View>

          <Form
            initialData={initialData}
            ref={formRef}
            onSubmit={handleChangeInfo}
          >
            <Input
              maxLength={20}
              ref={usernameInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              name="username"
              icon="no-icon"
              placeholder="Username"
              returnKeyType="next"
              onSubmitEditing={() => {
                collegeInputRef.current?.focus()
              }}
            />

            <Input
              maxLength={100}
              ref={collegeInputRef}
              name="college"
              icon="no-icon"
              placeholder="Instituição"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm()
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm()
              }}
            >
              Alterar
            </Button>
          </Form>

          {loading && (
            <ActivityIndicator
              size={40}
              color="#327fbc"
              style={{ marginTop: 10 }}
            />
          )}

          <BackToProfile onPress={() => navigation.navigate('Profile')}>
            <BackToProfileText>voltar para profile</BackToProfileText>
          </BackToProfile>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditInfo
