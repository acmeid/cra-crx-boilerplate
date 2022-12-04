import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Image,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'

type IFormInput = {
  password: string
  password2: string
  // agree: boolean
}

export default function ChangeName({ style }: any) {
  const [show1, setShow1] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toast = useToast()
  const onToggle = () => {
    console.log('onToggle')
    setIsOpen(!isOpen)
  }

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<IFormInput>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('form data: ', data)
    chrome.storage.local.set({ pw: data.password })
    chrome.storage.local.get(['pw'], (res) => console.log('chrome.storage.local.get:', res))
    navigate({ pathname: '/create3' })
  }

  const send = () => {
    setIsOpen(false)
    navigate(-1)
    sendResult()
  }

  const sendResult = () => {
    toast({
      title: 'Transaction succeeded',
      description: "Amount transferred: 1, gas consumed:0.000334 APT",
      position: 'bottom',
      status: 'success',
      duration: 8000,
      isClosable: true,
      // render: () => (
      //   <Box color='white' p={3}>
      //     Hello World
      //   </Box>
      // ),
    })
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack></Header>
      <Box mt="20px" fontSize="16px" fontWeight="600">View on explorer</Box>

      <Input size="lg" type="text" placeholder="Enter Wallet Name" h="49px" mt="8px"></Input>

      <Flex position="absolute" bottom="18px" left="18px" right="18px" justifyContent="space-around">
        <Button size="lg" variant="outline" minW="154px" height="46px" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button size="lg" variant="solid" minW="154px" h="46px" onClick={() => {}}>
          Save
        </Button>
      </Flex>
    </Box>
  )
}
