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
import CheckPassword from '@/components/checkPassword'
import { removeAccount, storage } from '@/utils'

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
    storage.set({ pw: data.password })
    storage.get(['pw'], (res) => console.log('chrome.storage.local.get:', res))
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
      description: 'Amount transferred: 1, gas consumed:0.000334 APT',
      position: 'bottom',
      status: 'success',
      duration: 8000,
      isClosable: true,
    })
  }

  const next = async () => {
    const accountList = await removeAccount()
    if (accountList?.length) {
      navigate('/account')
    } else {
      navigate('/welcome')
    }
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack title="Remove Account"></Header>
      <CheckPassword next={next}></CheckPassword>
    </Box>
  )
}
