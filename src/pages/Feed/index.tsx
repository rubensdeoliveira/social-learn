import React, { useState } from 'react'

import { Container, List } from './styles'

import Post from '../../components/Post'

interface CommentsData {
  nickname: string
  comment: string
}

interface PostData {
  id: number
  nickname: string
  email: string
  image: string
  comments: CommentsData[]
}

const Feed: React.FC = () => {
  const [posts] = useState([
    {
      id: Math.random(),
      nickname: 'Rafael',
      email: 'rafael@gmail.com',
      image: '',
      comments: [{ nickname: 'luisa', comment: 'legal' }],
    },
    {
      id: Math.random(),
      nickname: 'Julia',
      email: 'julia@gmail.com',
      image: '',
      comments: [{ nickname: 'junior', comment: 'gostosa' }],
    },
    {
      id: Math.random(),
      nickname: 'Julia',
      email: 'julia@gmail.com',
      image: '',
      comments: [{ nickname: 'junior', comment: 'gostosa' }],
    },
    {
      id: Math.random(),
      nickname: 'Julia',
      email: 'julia@gmail.com',
      image: '',
      comments: [{ nickname: 'junior', comment: 'gostosa' }],
    },
    {
      id: Math.random(),
      nickname: 'Julia',
      email: 'julia@gmail.com',
      image: '',
      comments: [{ nickname: 'junior', comment: 'gostosa' }],
    },
  ])

  return (
    <Container>
      <List
        data={posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: { item: PostData }) => (
          <Post
            comments={item.comments}
            email={item.email}
            nickname={item.nickname}
          />
        )}
      />
    </Container>
  )
}

export default Feed
