import { Box } from '@chakra-ui/react'
import React from 'react'
// import styles from './styles.module.scss'

type cprops = any

export default function PageTitle(props: cprops) {
  return (
    <Box color="red" mt="2px" ml="1px">
      {props.children}
    </Box>
  )
}
