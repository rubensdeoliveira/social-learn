import React from 'react'

import moment from 'moment'
import 'moment/min/locales'

import { Container } from './styles'

interface PublicationDateParams {
  created_at: string
}

const PublicationDate: React.FC<PublicationDateParams> = ({ created_at }) => {
  moment.locale('pt-Br')
  return <Container>{moment(created_at).calendar()}</Container>
}

export default PublicationDate
