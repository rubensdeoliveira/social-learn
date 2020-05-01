import 'react-native-gesture-handler'

import React from 'react'

import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#ff6b6b" />

    <Routes />
  </NavigationContainer>
)

export default App
