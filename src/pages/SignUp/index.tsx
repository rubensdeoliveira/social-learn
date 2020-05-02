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

import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

import logoImg from '../../assets/logo.png'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  const login = useCallback(() => {
    console.log('test')
  }, [])

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
            <Form
              ref={formRef}
              onSubmit={(data) => {
                console.log(data)
              }}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
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
