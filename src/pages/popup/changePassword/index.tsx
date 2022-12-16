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
  Center,
} from '@chakra-ui/react'
import { ChevronLeftIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'
import { getAccount, setAccount, storage } from '@/utils'
import { getSystemErrorName } from 'util'

type IFormInput = {
  cpassword: string
  password: string
  password2: string
  // agree: boolean
}

export default function ChangeName({ style }: any) {
  const navigate = useNavigate()
  const toast = useToast()
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!checked) {
      toast({
        title: 'Need to agree to the terms of service',
        position: 'top',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    // setAccount({ pw: data.password })

    storage.set({ pw: data.password })
    storage.get(['pw'], (res) => console.log('chrome.storage.local.get:', res))

    navigate({ pathname: '/create3' })
  }

  const save = () => {
    // setAccount({
    //   accountName: walletName,
    // }).then(() => {
    //   navigate(-1)
    // })
  }

  useEffect(() => {
    getAccount().then((res) => {
      // setWalletName(res.accountName)
    })
  }, [])
  const rule = {
    required: true,
    minLength: 6,
    validate: (v: any) => {
      return v === password
    },
  }
  return (
    <Box className={styles.container} style={style}>
      <Header showBack title="Change password" mb="20px"></Header>
      <Center mt="20px" fontSize="16px" fontWeight="600">
        <Center borderRadius="100%" bg="gray.100" w="60px" h="60px">
          <LockIcon color="gray.500" fontSize="34px"></LockIcon>
        </Center>
      </Center>

      <Center textAlign="center" mt="25px" fontSize="16px" padding="0 20px">
        {"You'll use this to unlock your wallet"}
      </Center>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt="22px">
          <InputGroup>
            <Controller
              name="cpassword"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => {
                setPassword(field.value)
                return <Input {...field} h="49px" type={show1 ? 'text' : 'password'} placeholder="Enter Password" />
              }}
            />

            <InputRightElement h="49px">
              <ViewIcon cursor="pointer" color="blackAlpha.600" style={{ display: show2 ? '' : 'none' }} onClick={() => setShow2(!show2)}></ViewIcon>
              <ViewOffIcon
                cursor="pointer"
                color="blackAlpha.400"
                style={{ display: !show1 ? '' : 'none' }}
                onClick={() => setShow2(!show2)}
              ></ViewOffIcon>
            </InputRightElement>
          </InputGroup>

          <InputGroup mt="22px">
            <Controller
              name="password"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => {
                setPassword(field.value)
                return <Input {...field} h="49px" type={show1 ? 'text' : 'password'} placeholder="Enter Password" />
              }}
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
          {errors.password?.type === 'required' && <ErrorMessage>password is required</ErrorMessage>}
          {errors.password?.type === 'minLength' && <ErrorMessage>Please enter at least 6 digits</ErrorMessage>}
        </Box>
        <Box mt="22px">
          <InputGroup>
            <Controller
              name="password2"
              control={control}
              rules={rule}
              render={({ field }) => <Input {...field} type="password" h="49px" placeholder="Confirm Password" />}
            />
          </InputGroup>
          {errors.password2?.type === 'validate' && <ErrorMessage>Password should match</ErrorMessage>}
        </Box>

        <Button position="absolute" bottom="18px" left="18px" right="18px" type="submit" size="lg" variant="solid" h="46px" onClick={() => save()}>
          Submit
        </Button>
      </form>

      {/* <Flex position="absolute" bottom="18px" left="18px" right="18px" justifyContent="space-around">

      </Flex> */}
    </Box>
  )
}