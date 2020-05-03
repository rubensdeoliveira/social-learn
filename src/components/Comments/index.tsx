import React from 'react'

import { Container, CommentContainer, Username, Comment } from './styles'

interface CommentObject {
  username: string
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
          <CommentContainer key={comment.comment}>
            <Username>{comment.username}: </Username>
            <Comment>{comment.comment}</Comment>
          </CommentContainer>
        ))}
    </Container>
  )
}

export default Comments
