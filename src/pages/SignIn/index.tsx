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
import * as Yup from 'yup'
import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input'
import Button from '../../components/Button'

import getValidationErrors from '../../utils/getValidationErrors'

import {
  Container,
  Title,
  ForgotPassword,
  CreateAccount,
  ButtonText,
} from './styles'

import logoImg from '../../assets/logo.png'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const passwordInputRef = useRef<TextInput>(null)

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  const { signIn } = useAuth()

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          email: data.email,
          password: data.password,
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          setLoading(false)

          return
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        )
      }

      setLoading(false)
    },
    [signIn],
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
          <Image source={logoImg} />

          <View>
            <Title>Faça seu login</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
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
              Entrar
            </Button>
          </Form>

          {loading && (
            <ActivityIndicator
              size={40}
              color="#ff6b6b"
              style={{ marginTop: 10 }}
            />
          )}

          <CreateAccount onPress={() => navigation.navigate('SignUp')}>
            <ButtonText>Criar uma conta</ButtonText>
          </CreateAccount>

          <ForgotPassword onPress={() => navigation.navigate('RecoverPass')}>
            <ButtonText>Esqueci minha senha</ButtonText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn
