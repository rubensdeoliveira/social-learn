import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import TabRouter from './tab.routes'

import { useAuth } from '../hooks/auth'

const Routes: React.FC = () => {
  const { loading } = useAuth()

  console.log(loading)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#327fbc" />
      </View>
    )
  }

  return <TabRouter />
}

export default Routes
