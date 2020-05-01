import React, { useState, useCallback } from 'react'
import { Image } from 'react-native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Title, ButtonText } from './styles'

import logoImg from '../../assets/logo.png'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useCallback(() => {
    console.log('test')
  }, [])

  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu login</Title>

      <Input
        name="email"
        icon="mail"
        placeholder="E-mail"
        autoFocus
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
    </Container>
  )
}

export default SignIn
