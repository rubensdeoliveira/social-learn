import React from 'react'

import { StatusBar } from 'react-native'

import Feed from './pages/Feed'

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />

      <Feed />
    </>
  )
}

export default App
