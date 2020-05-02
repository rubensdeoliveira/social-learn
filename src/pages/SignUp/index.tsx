import React, { useState, useCallback } from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

import logoImg from '../../assets/logo.png'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoFocus
              keyboardType="email-address"
              value={email}
              onChangeText={(emailText) => setEmail(emailText)}
            />

            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={(emailText) => setEmail(emailText)}
            />

            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              value={email}
              onChangeText={(emailText) => setEmail(emailText)}
            />

            <Button
              onPress={() => {
                console.log('test')
              }}
            >
              Entrar
            </Button>

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
