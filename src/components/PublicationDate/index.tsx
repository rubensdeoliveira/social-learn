import React from 'react'

import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import { Container } from './styles'

interface PublicationDateParams {
  created_at: string
}

const PublicationDate: React.FC<PublicationDateParams> = ({ created_at }) => {
  const dateFormatted = format(
    parseISO(created_at),
    "d 'de' MMMM 'de' yyyy', às' HH:mm",
    {
      locale: pt,
    },
  )
  return <Container>{dateFormatted}</Container>
}

export default PublicationDate
