import React from 'react'

import { StatusBar } from 'react-native'

import Post from './components/Post'

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />

    <Post />
  </>
)

export default App
