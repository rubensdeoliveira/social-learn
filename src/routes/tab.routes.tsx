import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useAuth } from '../hooks/auth'

import FeedRoutes from './feed.routes'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import AddPhoto from '../pages/AddPhoto'

const Tab = createBottomTabNavigator()

const TabRouter: React.FC = () => {
  const { user } = useAuth()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName

          if (route.name === 'Feed') {
            iconName = 'home'
          } else if (route.name === 'AddPhoto') {
            iconName = 'question-circle'
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
      <Tab.Screen name="Feed" component={FeedRoutes} />
      {!user || !user.isModerator ? null : (
        <Tab.Screen name="AddPhoto" component={AddPhoto} />
      )}
      <Tab.Screen name="Profile" component={user ? AppRoutes : AuthRoutes} />
    </Tab.Navigator>
  )
}

export default TabRouter
