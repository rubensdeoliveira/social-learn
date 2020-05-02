import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useAuth } from '../hooks/auth'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import Feed from '../pages/Feed'
import AddPhoto from '../pages/AddPhoto'

const Tab = createBottomTabNavigator()

const TabRouter: React.FC = () => {
  const { user, loading } = useAuth()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName

          if (route.name === 'Feed') {
            iconName = 'home'
          } else if (route.name === 'AddPhoto') {
            iconName = 'camera'
          } else if (route.name === 'Profile') {
            iconName = 'user'
          } else {
            iconName = 'home'
          }

          return <Icon name={iconName} size={30} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff6b6b',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="AddPhoto" component={AddPhoto} />
      <Tab.Screen name="Profile" component={user ? AppRoutes : AuthRoutes} />
    </Tab.Navigator>
  )
}

export default TabRouter
