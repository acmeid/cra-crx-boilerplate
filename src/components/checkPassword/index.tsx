import {
  Box,
  Image,
  Flex,
  Center,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, EditIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getAccount, resetAccount, storage } from '@/resources/account'
import { cutText } from '@/utils/tools'

// type cprops = any

export default function CheckPassword({ next }: any) {
  const navigate = useNavigate()
  const [show1, setShow1] = useState(false)
  const [pw, setPw] = useState('')
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const check = async () => {
    const data: any = await storage.get(['pw'])

    // const account: any = await getAccount()
    // console.log('account::::', account)
    // console.log('data::::', data)

    if (data.pw === pw) {
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

  const handleReset = () => {
    resetAccount().then(() => {
      navigate('/welcome')
    })
  }

  return (
    <>
      {/* <Box mt="20px" fontSize="16px" fontWeight="600">
        Enter password
      </Box> */}
      <Flex justifyContent="space-between" mt="20px" alignItems="center">
        <Box fontSize="16px" fontWeight="600">
          Enter password
        </Box>
        {/* <Box className={styles.reset} onClick={onOpen}>
          Reset password
        </Box> */}
      </Flex>
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
      <Flex justifyContent="flex-end" mt="10px">
        {/* <Box>Password</Box> */}
        <Box className={styles.reset} onClick={onOpen}>
          Reset password
        </Box>
      </Flex>
      <Box position="absolute" bottom="20px" left="18px" right="18px">
        <Button size="lg" variant="solid" minW="100%" h="49px" placeholder="Password" onClick={() => check()}>
          Submit
        </Button>
      </Box>

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
    </>
  )
}
