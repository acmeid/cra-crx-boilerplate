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
import { setAccount, storage } from '@/utils'
import { getSystemErrorName } from 'util'

type IFormInput = {
  password: string
  password2: string
  // agree: boolean
}

export default function ChangeName({ style }: any) {
  const navigate = useNavigate()
  const toast = useToast()
  const [walletName, setWalletName] = useState('')
  // const [isOpen, setIsOpen] = useState<boolean>(false)

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, touchedFields },
  // } = useForm<IFormInput>()

  const save = () => {
    setAccount({
      accountName: walletName,
    }).then(() => {
      navigate(-1)
    })
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack></Header>
      <Box mt="20px" fontSize="16px" fontWeight="600">
        View on explorer
      </Box>

      <Input
        size="lg"
        type="text"
        placeholder="Enter Wallet Name"
        h="49px"
        mt="10px"
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
      ></Input>

      <Flex position="absolute" bottom="18px" left="18px" right="18px" justifyContent="space-around">
        <Button size="lg" variant="outline" minW="154px" height="46px" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button size="lg" variant="solid" minW="154px" h="46px" onClick={() => save()}>
          Save
        </Button>
      </Flex>
    </Box>
  )
}
