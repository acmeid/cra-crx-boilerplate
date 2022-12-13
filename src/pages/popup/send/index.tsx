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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'
import { createSend, storage } from '@/utils'

type IFormInput = {
  password: string
  password2: string
}

export default function Welcome({ style }: any) {
  const navigate = useNavigate()
  const [toAddress, setToAddress] = useState<string>('')
  const [amount, setAmount] = useState<number | string>(0)
  const [fee, setFee] = useState<number | string>(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const next = () => {
    let msg = ''
    if (!toAddress && !amount) {
      msg = 'Please enter the address and amount'
    } else if (!toAddress) {
      msg = 'Please enter the address'
    } else if (!amount) {
      msg = 'Please enter the amount'
    }

    if (msg) {
      toast({
        title: 'Please enter the address and amount',
        position: 'top',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    onOpen()
  }

  const send = () => {
    createSend({ toAddress, amount })
    onOpen()
    navigate(-1)
    sendResult()
  }

  const sendResult = () => {
    toast({
      title: 'Transaction succeeded',
      description: 'Amount transferred: 1, gas consumed:0.000334 APT',
      position: 'top',
      status: 'success',
      duration: 8000,
      isClosable: true,
    })
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack></Header>
      <Box fontSize="16px" fontWeight="600" mt="4px">
        Add an address and amount
      </Box>
      <Flex className={styles.info}>
        {/* <Box pr="12px">
          <Image src="" width="40px" height="40px" borderRadius="100%"></Image>
        </Box> */}
        <Box flexGrow="1">
          <Box fontSize="16px" fontWeight="600" wordBreak="break-all">
            {/* 0x22ec40b30x22ec40b30x22ec40b3 b340b30 */}
            <Input className={styles.inp} onChange={(e: any) => setToAddress(e.target.value)}></Input>
          </Box>
          <Box fontSize="12px" color="#08CE9E" mt="6px">
            Account not found, will be created
          </Box>
        </Box>
      </Flex>

      <Flex className={styles.am} alignItems="center" mt="18px">
        <Input className={styles.inp} onChange={(e) => setAmount(e.target.value)}></Input>
        <Box className={styles.tex}>APT</Box>
      </Flex>
      <Box color="#B1B6BB" mt="13px">
        Balance：31 APT,fees: 0.000315 APT
      </Box>

      <Flex mt="210px" justifyContent="space-around">
        <Button size="lg" variant="outline" minW="154px" h="46px" onClick={() => navigate(-1)}>
          cancel
        </Button>
        <Button size="lg" variant="solid" minW="154px" h="46px" ml="20px" onClick={next}>
          Next
        </Button>
      </Flex>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
          <DrawerBody>
            <Box fontSize="18px" fontWeight="600">
              Summary
            </Box>
            <Box mt="10px">
              <Flex justifyContent="space-between" padding="12px 0">
                <Box>Recipient</Box>
                <Box>{toAddress}</Box>
              </Flex>
              <Flex justifyContent="space-between" padding="12px 0">
                <Box>Amount</Box>
                <Box>{amount} APT</Box>
              </Flex>
              <Flex justifyContent="space-between" padding="12px 0">
                <Box>Fee</Box>
                <Box>{fee} APT</Box>
              </Flex>
              <Box borderTop="1px solid #ededed" mt="10px" mb="9px"></Box>
              <Flex justifyContent="space-between" fontSize="16px" padding="12px 0">
                <Box>
                  <span className={styles.highlight}>Total</span>
                </Box>
                <Box>
                  <span className={styles.highlight}>{Number(amount) + Number(fee)} APT</span>
                </Box>
              </Flex>
            </Box>

            <Flex mt="90px" justifyContent="space-around">
              <Button size="lg" variant="outline" minW="154px" height="46px" onClick={onClose}>
                Back
              </Button>
              <Button size="lg" variant="solid" minW="154px" height="46px" ml="20px" onClick={send}>
                Send
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
