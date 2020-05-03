import React from 'react'

import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import { Container } from './styles'

interface PublicationDateParams {
  created_at: string
}

const PublicationDate: React.FC<PublicationDateParams> = ({ created_at }) => {
  return (
    <Container>
      {format(new Date(created_at), "d 'de' MMMM 'de' yyyy', às' HH:mm", {
        locale: pt,
      })}
    </Container>
  )
}

export default PublicationDate
