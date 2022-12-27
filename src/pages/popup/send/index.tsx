import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Input, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useDisclosure } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { debounce, round } from 'lodash-es'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'
import { createSend, storage } from '@/resources/account'
import { cutText } from '@/utils/tools'

type IFormInput = {
  password: string
  password2: string
}

export default function Welcome({ style }: any) {
  const navigate = useNavigate()
  const [toAddress, setToAddress] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [fee, setFee] = useState<any>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const gas_limit = 200000
  const gas_price = 500
  const baseFee = gas_limit * gas_price

  const changeAmount = debounce((e) => {
    setAmount(e.target.value)
  }, 200)

  const next = () => {
    let msg = ''
    if (!toAddress && !amount) {
      msg = 'Please enter the address and amount'
    } else if (!toAddress) {
      msg = 'Please enter the address'
    } else if (!amount) {
      msg = 'Please enter the amount'
    } else if (Number.isNaN(Number(amount))) {
      toast({
        title: 'Incorrect format',
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
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
      .then((res: any) => {
        console.log('res:::::', res)
        if (res.tx_response.code !== 0) {
          toast({
            title: 'Transaction failed',
            // description: 'Amount transferred: 1, gas consumed:0.000334 APT',
            position: 'top',
            status: 'error',
            duration: 6000,
            isClosable: true,
          })

          return
        }

        onClose()
        navigate(-1)
        toast({
          title: 'Transaction succeeded',
          description: `Amount transferred: ${amount}`,
          position: 'top',
          status: 'success',
          duration: 8000,
          isClosable: true,
        })
      })
      .catch((error) => {
        toast({
          title: 'Transaction failed',
          // description: 'Amount transferred: 1, gas consumed:0.000334 APT',
          position: 'top',
          status: 'error',
          duration: 6000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    setFee(() => {
      if (Number.isNaN(Number(amount))) return
      const amountFee = round(amount * 0.0001, 6)
      return amount ? baseFee + (amountFee > 20000 ? amountFee : 20000) : 0
    })
  }, [amount])

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
        <Input className={styles.inp} onChange={(e) => changeAmount(e)}></Input>
        <Box className={styles.tex}>SRC</Box>
      </Flex>
      <Box color="#B1B6BB" mt="13px">
        fees: {fee} SRC
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
                <Box>{cutText(toAddress)}</Box>
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
              <Button size="lg" variant="outline" minW="155px" height="46px" onClick={onClose}>
                Back
              </Button>
              <Button size="lg" variant="solid" minW="155px" height="46px" ml="20px" onClick={send}>
                Send
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
