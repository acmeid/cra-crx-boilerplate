import { Box, Image, Flex, Center, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, EditIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getUser } from '@/utils'
import { cutText } from '@/utils/tools'

// type cprops = any

export default function CheckPassword({ next }: any) {
  const navigate = useNavigate()
  const [show1, setShow1] = useState(false)

  const check = () => {
    next()
  }

  return (
    <>
      <Box mt="20px" fontSize="16px" fontWeight="600">Enter password</Box>
      <Box mt="6px">
        <InputGroup>
          <Input size="lg" h="49px" type={show1 ? 'text' : 'password'} placeholder="Password"></Input>
          <InputRightElement h="49px">
            <ViewIcon boxSize="16px" cursor="pointer" color="blackAlpha.600" style={{ display: show1 ? '' : 'none' }} onClick={() => setShow1(!show1)}></ViewIcon>
            <ViewOffIcon
              boxSize="16px"
              cursor="pointer"
              color="blackAlpha.400"
              style={{ display: !show1 ? '' : 'none' }}
              onClick={() => setShow1(!show1)}
            ></ViewOffIcon>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box position="absolute" bottom="20px" left="18px" right="18px">
        <Button size="lg" variant="solid" minW="100%" h="49px" placeholder='Password' onClick={() => check}>
          Next
        </Button>
      </Box>
    </>
  )
}
