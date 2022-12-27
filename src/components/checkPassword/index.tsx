import { Box, Image, Flex, Center, Input, Button, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, EditIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getAccount } from '@/resources/account'
import { cutText } from '@/utils/tools'

// type cprops = any

export default function CheckPassword({ next }: any) {
  const navigate = useNavigate()
  const [show1, setShow1] = useState(false)
  const [pw, setPw] = useState('')
  const toast = useToast()

  const check = async () => {
    const account: any = await getAccount()
    console.log('account::::', account)
    console.log('pw::::', pw)

    if (account.pw === pw) {
      next()
    } else {
      toast({
        title: 'Incorrect password',
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Box mt="20px" fontSize="16px" fontWeight="600">
        Enter password
      </Box>
      <Box mt="10px">
        <InputGroup>
          <Input size="lg" h="49px" type={show1 ? 'text' : 'password'} placeholder="Password" onChange={(e) => setPw(e.target.value)}></Input>
          <InputRightElement h="49px">
            <ViewIcon
              boxSize="16px"
              cursor="pointer"
              color="blackAlpha.600"
              style={{ display: show1 ? '' : 'none' }}
              onClick={() => setShow1(!show1)}
            ></ViewIcon>
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
        <Button size="lg" variant="solid" minW="100%" h="49px" placeholder="Password" onClick={() => check()}>
          Submit
        </Button>
      </Box>
    </>
  )
}
