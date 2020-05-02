import React, { useState, useCallback, useRef } from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Title,
  ForgotPassword,
  CreateAccount,
  ButtonText,
} from './styles'

import logoImg from '../../assets/logo.png'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const passwordInputRef = useRef<TextInput>(null)

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  const handleSignIn = useCallback((data: Object) => {
    console.log(data)
  }, [])

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

          <CreateAccount onPress={() => navigation.navigate('SignUp')}>
            <ButtonText>Criar uma conta</ButtonText>
          </CreateAccount>

          <ForgotPassword>
            <ButtonText>Esqueci minha senha</ButtonText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn
