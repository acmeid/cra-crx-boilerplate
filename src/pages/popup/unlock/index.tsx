import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/react'
import styles from './styles.module.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getAccount, resetAccount, storage, connect } from '@/resources/account'
import { qs } from 'url-parse'

export default function Welcome({ style }: any) {
  const navigate = useNavigate()
  const [show1, setShow1] = useState(false)
  const [pw, setPw] = useState('')
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { search } = useLocation()
  const searchs = qs.parse(search)

  const check = async () => {
    const data: any = await storage.get(['pw'])
    // const account: any = await getAccount()
    // console.log('account::::', account)
    // console.log('pw::::', pw)

    if (data.pw === pw) {
      storage.set({ isLock: false })
      const account: any = await getAccount()

      if (searchs.isOpen === '1') {
        connect()
        return
      }

      navigate('/main/home')
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

  const handleReset = () => {
    resetAccount().then(() => {
      navigate('/welcome')
    })
  }

  return (
    <Box textAlign="center" style={style} padding={'18px'}>
      <Box mt="102px">
        <Image src="logo.svg" margin="0 auto"></Image>
      </Box>
      <Box fontSize="28px" fontWeight="bold" mt="35px">
        Welcome to SRS
      </Box>
      {/* <Box fontSize="13px" ml="18px" mr="18px">
        The most reliable way to engage on SRS. Buy, store, and offer tokens & NFTs.
      </Box> */}

      <Flex justifyContent="space-between" mt="130px">
        <Box>Password</Box>
        <Box className={styles.reset} onClick={onOpen}>
          Reset password
        </Box>
      </Flex>
      <InputGroup mt="5px">
        <Input h="49px" type={show1 ? 'text' : 'password'} placeholder="Enter Password" onChange={(e) => setPw(e.target.value)} />

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

      <Button colorScheme="green" w="100%" h="49px" mt="20px" fontWeight="500" onClick={() => check()}>
        Unlock
      </Button>

      <Modal onClose={onClose} size={'xs'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pl="15px">Are you sure you want to reset the password?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="20px">
              PLEASE NOTE: You will not be able to recover your wallet account unless you have stored the private key or mnemonic associated with your
              wallet address.
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleReset}>Yes, I understand</Button>
            <Button variant="outline" ml="15px" onClick={onClose}>
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
