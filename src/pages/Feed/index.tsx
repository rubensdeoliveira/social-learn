import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import api from '../../services/api'

import Post from '../../components/Post'
import Header from '../../components/Header'

import { Container, List } from './styles'

interface CommentsData {
  username: string
  comment: string
}

interface PostData {
  id: number
  username: string
  email: string
  image: string
  comments: CommentsData[]
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    console.log('carregou')
    const loadPosts = async (): Promise<void> => {
      try {
        const response = await api.get('posts.json')

        const postsObj = response.data
        const postsKeys = Object.keys(postsObj)
        const postsToAdd: PostData[] = []

        postsKeys.forEach((postKey) => {
          postsToAdd.push({ id: postKey, ...postsObj[postKey] })
        })

        postsToAdd.reverse()

        setPosts([...postsToAdd])
      } catch {
        Alert.alert(
          'Erro ao carregar posts',
          'Não foi possível carregar os posts',
        )
      }
    }

    loadPosts()
  }, [])

  return (
    <Container>
      <Header />
      <List
        data={posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: { item: PostData }) => (
          <Post
            comments={item.comments}
            email={item.email}
            username={item.username}
            image={item.image}
          />
        )}
      />
    </Container>
  )
}

export default Feed
