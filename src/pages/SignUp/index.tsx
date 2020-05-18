import React, { useCallback, useRef, useState } from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import axios from 'axios'
import api from '../../services/api'
import { AUTH_BASE_URL, API_KEY } from '../../env.js'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  PickerContainer,
  Picker,
  TextInputMaskContainer,
  TextInputMask,
} from './styles'

import logoImg from '../../assets/logo.png'

interface SignUpFormData {
  name: string
  username: string
  college?: string
  email: string
  password: string
  gender: string
  occupation: string
  birthday: string
  city: string
}

const SignUp: React.FC = () => {
  const [gender, setGender] = useState(null)
  const [occupation, setOccupation] = useState(null)
  const [birthday, setBirthday] = useState('')
  const [loading, setLoading] = useState(false)

  const usernameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const cityInputRef = useRef<TextInput>(null)
  const collegeInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const repeatPasswordInputRef = useRef<TextInput>(null)

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  const validations = useCallback(
    (data): boolean => {
      if (data.name.trim() === '') {
        Alert.alert('Erro', 'Preencha o seu nome para continuar')
        return false
      }

      if (data.username.trim().length < 5) {
        Alert.alert(
          'Erro',
          'Preencha o seu nome de usuário com pelo menos 5 caracteres para continuar',
        )
        return false
      }

      if (data.username.trim().includes(' ')) {
        Alert.alert('Erro', 'Nome de usuário não deve conter espaços')
        return false
      }

      if (data.email.trim() === '') {
        Alert.alert('Erro', 'Preencha o seu e-mail para continuar')
        return false
      }

      if (gender == null) {
        Alert.alert('Erro', 'Selecione seu sexo para continuar')
        return false
      }

      if (birthday.length < 10) {
        Alert.alert('Erro', 'Digite sua data de nascimento')
        return false
      }

      if (data.city.trim() === '') {
        Alert.alert('Erro', 'Preencha a sua cidade/UF para continuar')
        return false
      }

      if (occupation == null) {
        Alert.alert(
          'Erro',
          'Selecione qual opção você se encaixa: estudante de odontologia, professor de odontologia ou outro',
        )
        return false
      }

      if (data.password.trim().length < 8) {
        Alert.alert('Erro', 'Preencha uma senha de pelo menos 8 dígitos')
        return false
      }

      if (data.repeatPassword !== data.password) {
        Alert.alert('Erro', 'As senhas digitadas não coincidem')
        return false
      }

      return true
    },
    [gender, occupation, birthday],
  )

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      setLoading(true)

      try {
        formRef.current?.setErrors({})

        if (!validations(data)) {
          setLoading(false)
          return
        }

        const responseUsers = await api.get('users.json')
        const users = responseUsers.data
        const usersKeys = Object.keys(users)

        const findUserWithSameUsername = usersKeys.find(
          (userKey: string) => users[userKey].username === data.username,
        )

        if (findUserWithSameUsername) {
          Alert.alert('Erro', 'Já existe um usuário com o mesmo username')
          return
        }

        const response = await axios.post(
          `${AUTH_BASE_URL}/signupNewUser?key=${API_KEY}`,
          {
            email: data.email.trim(),
            password: data.password.trim(),
            returnSecureToken: true,
          },
        )

        if (response.data.localId) {
          await api.put(`/users/${response.data.localId}.json`, {
            username: data.username.trim(),
            college: data.college,
            isModerator: false,
          })

          await api.put(`/usersprivate/${response.data.localId}.json`, {
            name: data.name,
            occupation: data.occupation,
            city: data.city,
            college: data.college,
            birthday,
            gender,
          })
        }

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Entre com suas informações para continuar',
        )

        navigation.goBack()
      } catch (err) {
        Alert.alert('Erro no cadastro', err.message)
      }

      setLoading(false)
    },
    [navigation, validations, gender, birthday],
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                maxLength={100}
                autoCapitalize="words"
                name="name"
                icon="no-icon"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  usernameInputRef.current?.focus()
                }}
              />

              <Input
                maxLength={20}
                ref={usernameInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                name="username"
                icon="no-icon"
                placeholder="Nome de Usuário"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="no-icon"
                placeholder="E-mail"
              />

              <PickerContainer>
                <Picker
                  selectedValue={gender}
                  onValueChange={(genderValue) => {
                    setGender(genderValue)
                  }}
                >
                  <Picker.Item label="Selecione seu sexo" value={null} />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Feminino" value="Feminino" />
                </Picker>
              </PickerContainer>

              <TextInputMaskContainer>
                <TextInputMask
                  type="datetime"
                  options={{ format: 'DD/MM/YYYY' }}
                  value={birthday}
                  placeholder="Data de Nascimento"
                  placeholderTextColor="#666360"
                  onChangeText={(masked) => {
                    setBirthday(masked)
                  }}
                />
              </TextInputMaskContainer>

              <Input
                maxLength={50}
                ref={cityInputRef}
                autoCapitalize="words"
                name="city"
                icon="no-icon"
                placeholder="Cidade/UF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  collegeInputRef.current?.focus()
                }}
              />

              <PickerContainer>
                <Picker
                  selectedValue={occupation}
                  onValueChange={(occupationValue) => {
                    setOccupation(occupationValue)
                  }}
                >
                  <Picker.Item
                    label="Qual opção você se encaixa?"
                    value={null}
                  />
                  <Picker.Item
                    label="Professor de Odontologia"
                    value="Professor de Odontologia"
                  />
                  <Picker.Item
                    label="Aluno de Odontologia"
                    value="Aluno de Odontologia"
                  />
                  <Picker.Item label="Outro" value="Outro" />
                </Picker>
              </PickerContainer>

              <Input
                maxLength={100}
                ref={collegeInputRef}
                name="college"
                icon="no-icon"
                placeholder="Instituição (caso estudante)"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="no-icon"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  repeatPasswordInputRef.current?.focus()
                }}
              />

              <Input
                ref={repeatPasswordInputRef}
                name="repeatPassword"
                icon="no-icon"
                placeholder="Repetir senha"
                secureTextEntry
                textContentType="newPassword"
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
                Cadastrar
              </Button>
            </Form>

            {loading && (
              <ActivityIndicator
                size={40}
                color="#ff6b6b"
                style={{ marginTop: 10 }}
              />
            )}

            <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
              <BackToSignInText>voltar para login</BackToSignInText>
            </BackToSignIn>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignUp
