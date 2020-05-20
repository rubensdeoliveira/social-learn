import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Back, BackText, Container, Image, Username } from './styles'
import api from '../../services/api'

const UserInfo: React.FC = () => {
  const [usernameState, setUsernameState] = useState('')
  const [image, setImage] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const { userId } = route.params

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      const response = await api.get('users.json')
      const users = response.data
      const usersKeys = Object.keys(users)

      const findUserKey = usersKeys.find(
        (userKey: string) => userKey === userId,
      )

      if (!findUserKey) return

      const user = users[findUserKey]

      if (user) {
        setUsernameState(user.username)
        setImage(user.image)
      }
    }

    loadUser()
  }, [])

  return (
    <Container>
      {usernameState ? (
        <View style={{ alignItems: 'center' }}>
          {image ? <Image source={{ uri: image }} /> : null}
          <Username>{usernameState}</Username>
        </View>
      ) : (
        <Text>Usuário não existe ou foi alterado</Text>
      )}

      <Back
        onPress={() => {
          navigation.goBack()
        }}
      >
        <BackText>voltar</BackText>
      </Back>
    </Container>
  )
}

export default UserInfo
