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
        placeholder="Email"
        autoFocus
        keyboardType="email-address"
        value={email}
        onChangeText={(emailText) => setEmail(emailText)}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={email}
        onChangeText={(emailText) => setEmail(emailText)}
      />
      <Button>
        <ButtonText onPress={login}>Login</ButtonText>
      </Button>
      <Button>
        <ButtonText
          onPress={() => {
            console.log('test')
          }}
        >
          Criar uma conta
        </ButtonText>
      </Button>
    </Container>
  )
}

export default SignIn
