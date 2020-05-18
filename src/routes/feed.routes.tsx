import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Main from '../pages/Main'
import Feed from '../pages/Feed'
import CommentsPage from '../pages/CommentsPage'
import UserInfo from '../pages/UserInfo'

const FeedStack = createStackNavigator()

const FeedRoutes: React.FC = () => (
  <FeedStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fafafa' },
    }}
  >
    <FeedStack.Screen name="Main" component={Main} />
    <FeedStack.Screen name="Feed" component={Feed} />
    <FeedStack.Screen name="CommentsPage" component={CommentsPage} />
    <FeedStack.Screen name="UserInfo" component={UserInfo} />
  </FeedStack.Navigator>
)

export default FeedRoutes
