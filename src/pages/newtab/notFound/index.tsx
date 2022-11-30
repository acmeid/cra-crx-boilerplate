import React, { useEffect } from 'react'
import { Box, Flex, Button, Image } from '@chakra-ui/react'
import styles from './styles.module.scss'

export default function Welcome({ style }: any) {
  return (
    <Box textAlign="center" style={style} padding={'18px'} mt="250px">
      404 Not Found
    </Box>
  )
}
