import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'
import EditInfo from '../pages/EditInfo'

const App = createStackNavigator()

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fafafa' },
    }}
  >
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="EditInfo" component={EditInfo} />
  </App.Navigator>
)

export default AppRoutes
