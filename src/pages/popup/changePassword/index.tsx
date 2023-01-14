import React, { useEffect, useState } from 'react'
import { Box, Button, Input, InputGroup, InputRightElement, useToast, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'
import { getAccount, setAccount, storage } from '@/resources/account'

type IFormInput = {
  cpassword: string
  password: string
  password2: string
}

export default function ChangePassword({ style }: any) {
  const navigate = useNavigate()
  const toast = useToast()
  const [password, setPassword] = useState('')
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [currentPw, setCurrentPw] = useState('')
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // const res: any = await storage.get(['pw'])

    // if (data.cpassword !== res.pw) {
    //   toast({
    //     title: 'The current password is incorrect',
    //     position: 'top',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   })

    //   return
    // }

    // if (data.password !== data.password2) {
    //   toast({
    //     title: 'The current password is incorrect',
    //     position: 'top',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   })

    //   return
    // }

    storage.set({ pw: data.password })
    storage.get(['pw'], (res) => console.log('chrome.storage.local.get:', res))

    toast({
      title: 'Modification succeeded',
      position: 'top',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    navigate(-1)
  }

  useEffect(() => {
    storage.get(['pw'], ({ pw }) => {
      setCurrentPw(pw)
    })
  }, [])
  const rule = {
    required: true,
    minLength: 6,
    validate: (v: any) => {
      return v === password
    },
  }
  const oldPwRule = {
    required: true,
    validate: (v: any) => {
      return v === currentPw
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
              rules={oldPwRule}
              render={({ field }) => {
                setPassword(field.value)
                return <Input {...field} h="49px" type={show1 ? 'text' : 'password'} placeholder="Current Password" />
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
          {errors.cpassword?.type === 'required' && <ErrorMessage>Password is required</ErrorMessage>}
          {errors.cpassword?.type === 'validate' && <ErrorMessage>The current password is incorrect</ErrorMessage>}

          <InputGroup mt="22px">
            <Controller
              name="password"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => {
                setPassword(field.value)
                return <Input {...field} h="49px" type={show2 ? 'text' : 'password'} placeholder="New Password" />
              }}
            />

            <InputRightElement h="49px">
              <ViewIcon cursor="pointer" color="blackAlpha.600" style={{ display: show2 ? '' : 'none' }} onClick={() => setShow2(!show2)}></ViewIcon>
              <ViewOffIcon
                cursor="pointer"
                color="blackAlpha.400"
                style={{ display: !show2 ? '' : 'none' }}
                onClick={() => setShow2(!show2)}
              ></ViewOffIcon>
            </InputRightElement>
          </InputGroup>
          {errors.password?.type === 'required' && <ErrorMessage>Password is required</ErrorMessage>}
          {errors.password?.type === 'minLength' && <ErrorMessage>Please enter at least 6 digits</ErrorMessage>}
        </Box>
        <Box mt="22px">
          <InputGroup>
            <Controller
              name="password2"
              control={control}
              rules={rule}
              render={({ field }) => <Input {...field} type="password" h="49px" placeholder="Confirm New Password" />}
            />
          </InputGroup>
          {errors.password2?.type === 'validate' && <ErrorMessage>Password should match</ErrorMessage>}
        </Box>

        <Button position="absolute" bottom="18px" left="18px" right="18px" type="submit" size="lg" variant="solid" h="46px">
          Submit
        </Button>
      </form>

      {/* <Flex position="absolute" bottom="18px" left="18px" right="18px" justifyContent="space-around">

      </Flex> */}
    </Box>
  )
}
