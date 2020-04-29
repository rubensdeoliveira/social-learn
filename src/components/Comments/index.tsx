import React from 'react'

import { Container, CommentContainer, Nickname, Comment } from './styles'

interface CommentObject {
  nickname: string
  comment: string
}

interface CommentProps {
  comments: CommentObject[]
}

const Comments: React.FC<CommentProps> = ({ comments }) => {
  return (
    <Container>
      {comments &&
        comments.map((comment) => (
          <CommentContainer>
            <Nickname>{comment.nickname}: </Nickname>
            <Comment>{comment.comment}</Comment>
          </CommentContainer>
        ))}
    </Container>
  )
}

export default Comments
