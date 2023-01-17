import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, InputGroup, InputRightElement, Input, useToast } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import { qs } from 'url-parse'

import { addAccount, connect } from '@/resources/account'

export default function Welcome({ style, setTab }: any) {
  const toast = useToast()
  const toastIdRef: any = React.useRef()
  const navigate = useNavigate()
  const [privKey, setPrivKey] = useState<string>('')
  const [show1, setShow1] = useState(false)
  const { search } = useLocation()
  const searchs = qs.parse(search)

  useEffect(() => {}, [])

  const submit = () => {
    let _priv = privKey
    if (!/^0x/.test(_priv)) {
      _priv = `0x${privKey}`
    }
    addAccount({ priv: _priv })
      .then(() => {
        if (toastIdRef.current) {
          toast.close(toastIdRef.current)
        }
        toastIdRef.current = toast({
          title: 'Import succeeded',
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        if (searchs.isOpen === '1') {
          connect()
        } else {
          navigate({ pathname: '/main/home' })
        }
      })
      .catch((error) => {
        if (toastIdRef.current) {
          toast.close(toastIdRef.current)
        }
        toastIdRef.current = toast({
          title: 'Import failed',
          description: error?.msg || 'The private key is incorrect',
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
    // navigate({ pathname: '/create2' })
  }

  return (
    <Box className={styles.container} style={style}>
      <Box className={styles.tit}>
        <ChevronLeftIcon
          cursor="pointer"
          boxSize="26px"
          mt="-2px"
          onClick={() => {
            navigate(-1)
          }}
        ></ChevronLeftIcon>
        Import private key
      </Box>

      <Box mt="45px">Access an existing wallet with your private key.</Box>
      <Box mt="11px">
        <InputGroup>
          <Input
            h="49px"
            type={show1 ? 'text' : 'password'}
            placeholder="Enter private key here"
            onChange={(e) => setPrivKey(e.target.value.trim())}
          />
          <InputRightElement h="49px">
            <ViewIcon cursor="pointer" color="blackAlpha.600" style={{ display: show1 ? '' : 'none' }} onClick={() => setShow1(!show1)}></ViewIcon>
            <ViewOffIcon
              cursor="pointer"
              color="blackAlpha.400"
              style={{ display: !show1 ? '' : 'none' }}
              onClick={() => setShow1(!show1)}
            ></ViewOffIcon>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box position="absolute" bottom="18px" left="18px" right="18px">
        <Button variant="solid" minW="100%" h="50px" onClick={() => submit()}>
          Submit
        </Button>
      </Box>
    </Box>
  )
}
