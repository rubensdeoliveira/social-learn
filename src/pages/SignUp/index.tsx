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
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import axios from 'axios'
import api from '../../services/api'
import { AUTH_BASE_URL, API_KEY } from '../../env.js'

import Input from '../../components/Input'
import Button from '../../components/Button'

import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

import logoImg from '../../assets/logo.png'

interface SignUpFormData {
  name: string
  username: string
  college?: string
  email: string
  password: string
  repeatPassword: string
  gender: string
  occupation: string
  birthday: string
  city: string
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const usernameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const repeatPasswordInputRef = useRef<TextInput>(null)

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      setLoading(true)

      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().min(
            6,
            'Nome deve possuir pelo menos 6 caracteres',
          ),
          username: Yup.string()
            .min(6, 'Nome de usuário deve possuir pelo menos 6 caracteres')
            .max(20, 'Nome de usuário deve possuir no máximo 20 caracteres'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
          repeatPassword: Yup.string().required(
            'Campo repetir senha obrigatória',
          ),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

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

        if (data.password !== data.repeatPassword) {
          Alert.alert('Erro', 'Senhas não coincidem')
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
            name: data.name,
            username: data.username.trim(),
            isModerator: false,
          })
        }

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Entre com suas informações para continuar',
        )

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          setLoading(false)

          return
        }

        Alert.alert('Erro no cadastro', err.message)
      }

      setLoading(false)
    },
    [navigation],
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
                color="#327fbc"
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
