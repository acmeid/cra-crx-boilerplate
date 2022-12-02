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
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ErrorMessage from '@/components/errorMessage'

type IFormInput = {
  password: string
  password2: string
  // agree: boolean
}

export default function Welcome({ style }: any) {
  const [show1, setShow1] = useState(false)
  // const [password, setPassword] = useState('')
  // const [password2, setPassword2] = useState('')
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

  return (
    <Box className={styles.create1} style={style}>
      <Box onClick={() => navigate(-1)} cursor="pointer">
        <ChevronLeftIcon></ChevronLeftIcon>back
      </Box>
      <Image></Image>
      <Box className={styles.tit}>Create a password</Box>
      <Box mt="6px">{"You'll use this to unlock your wallet"}</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt="22px">
          <InputGroup>
            <Controller
              name="password"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => <Input {...field} h="49px" type={show1 ? 'text' : 'password'} placeholder="Enter Password" />}
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
          {errors.password?.type === 'required' && <ErrorMessage>password is required.</ErrorMessage>}
          {errors.password?.type === 'minLength' && <ErrorMessage>Please enter at least 6 digits.</ErrorMessage>}
        </Box>
        <Box mt="22px">
          <InputGroup>
            <Controller
              name="password2"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => <Input {...field} type="password" h="49px" placeholder="Confirm Password" />}
            />
          </InputGroup>
          {/* {JSON.stringify(touchedFields)} */}
          {/* {errors.password?.type === 'required' && <ErrorMessage>Please confirm the password.</ErrorMessage>} */}
        </Box>
        <Box mt="22px">
          <Checkbox>Iagree to the Terms of Service</Checkbox>
        </Box>

        <Box className={styles.btnNext}>
          {/* onClick={() => next() }*/}
          <Button type="submit">Continue</Button>
        </Box>
      </form>
    </Box>
  )
}
