import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'

const App = createStackNavigator()

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fafafa' },
    }}
  >
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
)

export default AppRoutes
