import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import TabRouter from './tab.routes'

import { useAuth } from '../hooks/auth'

const Routes: React.FC = () => {
  const { loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff6b6b" />
      </View>
    )
  }

  return <TabRouter />
}

export default Routes
