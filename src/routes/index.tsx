import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

import Feed from '../pages/Feed'
import AddPhoto from '../pages/AddPhoto'
import Profile from '../pages/Profile'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Tab = createBottomTabNavigator()
const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fafafa' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
)

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
      activeTintColor: '#ff6b6b',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}
  >
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="AddPhoto" component={AddPhoto} />
    <Tab.Screen name="Profile" component={AuthRoutes} />
  </Tab.Navigator>
)

export default Routes
