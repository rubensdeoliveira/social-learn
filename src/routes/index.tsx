import React from 'react'

// import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from '../pages/Feed'

const Tab = createBottomTabNavigator()

const Routes: React.FC = () => (
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
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}
  >
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="AddPhoto" component={Feed} />
    <Tab.Screen name="Profile" component={Feed} />
  </Tab.Navigator>
)

export default Routes
