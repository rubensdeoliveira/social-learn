import React, { useState, useCallback } from 'react'

import { Container, Input, Button, ButtonText } from './styles'

const Login: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useCallback(() => {
    navigation.navigate('Profile')
  }, [])

  return (
    <Container>
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

export default Login
