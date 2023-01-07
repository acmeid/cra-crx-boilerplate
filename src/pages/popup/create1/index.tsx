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
import { storage } from '@/resources/account'
import Header from '@/components/header'
import Step from '@/components/setp'
import { openTab } from '@/utils/tools'

type IFormInput = {
  password: string
  password2: string
  // agree: boolean
}

export default function Welcome({ style }: any) {
  const [show1, setShow1] = useState(false)
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const toast = useToast()
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

  const rule = {
    required: true,
    minLength: 6,
    validate: (v: any) => {
      return v === password
    },
  }

  const viewOnExplorer = (e: any) => {
    openTab({ url: `http://srs9595.com/termsofService` })
    e.stopPropagation()
    e.preventDefault()
  }
  return (
    <Box className={styles.create1} style={style}>
      <Header showBack></Header>
      {/* <Image></Image> */}
      <Step total={3} current={1}></Step>
      <Box className={styles.tit}>Create a password</Box>
      <Box mt="6px">{"You'll use this to unlock your wallet"}</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt="22px">
          <InputGroup>
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
        <Box mt="22px">
          <Checkbox onChange={(e) => setChecked(e.target.checked)}>
            Iagree to the{' '}
            <span className="highlight" onClick={viewOnExplorer}>
              Terms of Service
            </span>
          </Checkbox>
        </Box>

        <Box className={styles.btnNext}>
          {/* onClick={() => next() }*/}
          <Button type="submit">Continue</Button>
        </Box>
      </form>
    </Box>
  )
}
