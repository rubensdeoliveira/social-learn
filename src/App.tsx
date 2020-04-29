import React from 'react'

import { StatusBar } from 'react-native'

import Post from './components/Post'

const App: React.FC = () => {
  const comments = [{ nickname: 'Joana', comment: 'Excelente' }]

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />

      <Post comments={comments} />
    </>
  )
}

export default App
