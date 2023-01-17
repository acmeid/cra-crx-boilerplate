import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Input, InputGroup, useToast, Center, InputRightAddon } from '@chakra-ui/react'
import { ChevronLeftIcon, TimeIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'
import { getAccount, setAccount, storage } from '@/resources/account'

type IFormInput = {
  password: string
  password2: string
  // agree: boolean
}

export default function AutoLock({ style }: any) {
  const navigate = useNavigate()
  const toast = useToast()
  const [walletName, setWalletName] = useState('')
  const [minute, setMinute] = useState('')

  const save = () => {
    setAccount({
      accountName: walletName,
    }).then(() => {
      navigate(-1)
    })
  }

  useEffect(() => {
    getAccount().then((res) => {
      setWalletName(res.accountName)
    })
    storage.get(['autoLockTime'], ({ autoLockTime }) => {
      console.log('autoLockTime:', autoLockTime)
      setMinute(autoLockTime)
    })
  }, [])

  const onSubmit = () => {
    if (Number.isNaN(Number(minute))) {
      toast({
        title: 'Please enter a number',
        position: 'top',
        status: 'info',
        duration: 4000,
        isClosable: true,
      })

      return
    }
    storage.set({ autoLockTime: minute })
    storage.get(['autoLockTime'], (res) => console.log('chrome.storage.local.get:', res))

    toast({
      title: 'Setting succeeded',
      position: 'top',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    navigate(-1)
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack title="Auto-Lock Timer" mb="20px"></Header>
      <Center mt="20px" fontSize="16px" fontWeight="600">
        <Center borderRadius="100%" bg="gray.100" w="60px" h="60px">
          <TimeIcon color="gray.500" fontSize="34px"></TimeIcon>
        </Center>
      </Center>

      <Center textAlign="center" mt="30px" fontSize="16px" padding="0 20px">
        How long should we wait to lock your wallet after no activity?
      </Center>

      <InputGroup size="lg" mt="20px">
        {/* <InputLeftAddon children="https://" /> */}
        <Input placeholder="" value={minute} onChange={(e) => setMinute(e.target.value.trim())} autoComplete="off" />
        <InputRightAddon bg="blackAlpha.100">minutes</InputRightAddon>
      </InputGroup>

      <Flex position="absolute" bottom="18px" left="18px" right="18px" justifyContent="space-around">
        {/* <Button size="lg" variant="outline" minW="154px" height="46px" onClick={() => navigate(-1)}>
          Cancel
        </Button> */}
        <Button size="lg" variant="solid" w="100%" h="46px" onClick={onSubmit}>
          Save
        </Button>
      </Flex>
    </Box>
  )
}
