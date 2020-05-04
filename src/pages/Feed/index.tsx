import React, { useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

import api from '../../services/api'

import Post from '../../components/Post'
import Header from '../../components/Header'

import { Container, List } from './styles'

interface CommentData {
  username: string
  comment: string
}

interface PostData {
  comments: CommentData[]
  user: UserData
  question: QuestionData
  created_at: string
  id: string
}

interface UserData {
  username: string
  email: string
}

interface QuestionData {
  image: string
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { categorie } = route.params

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      try {
        const response = await api.get('posts.json')

        const postsObj = response.data
        const postsKeys = Object.keys(postsObj)
        const postsToAdd: PostData[] = []

        postsKeys.forEach((postKey) => {
          if (postsObj[postKey].question.categorie === categorie) {
            postsToAdd.push({ id: postKey, ...postsObj[postKey] })
          }
        })

        postsToAdd.reverse()

        setPosts([...postsToAdd])
      } catch {
        setPosts([])

        Alert.alert(
          'Erro ao carregar posts',
          'Não foi possível carregar os posts',
        )
      }
    }

    navigation.addListener('focus', () => {
      loadPosts()
    })
  }, [navigation, categorie])

  return (
    <Container>
      <Header title={categorie} />
      <List
        data={posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: { item: PostData }) => <Post {...item} />}
      />
    </Container>
  )
}

export default Feed
