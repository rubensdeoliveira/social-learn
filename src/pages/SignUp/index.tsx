import React, { useCallback, useRef } from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import axios from 'axios'
import api from '../../services/api'
import { AUTH_BASE_URL, API_KEY } from '../../env.js'

import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

import logoImg from '../../assets/logo.png'

interface SignUpFormData {
  name: string
  nickname: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const nicknameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().min(4, 'Nome deve ter no mínimo 4 dígitos'),
          nickname: Yup.string()
            .min(4, 'Nome deve ter no mínimo 4 dígitos')
            .max(20, 'Nome de usuário deve ter no máximo 20 digitos'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const response = await axios.post(
          `${AUTH_BASE_URL}/signupNewUser?key=${API_KEY}`,
          {
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          },
        )

        if (response.data.localId) {
          await api.put(`/users/${response.data.localId}.json`, {
            name: data.name,
            nickname: data.nickname,
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

          return
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente',
        )
      }
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
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  nicknameInputRef.current?.focus()
                }}
              />

              <Input
                ref={nicknameInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                name="nickname"
                icon="user"
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
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
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
