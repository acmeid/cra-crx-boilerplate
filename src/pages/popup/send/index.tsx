import React, { useEffect, useState } from 'react'
import {
  Text,
  Box,
  Flex,
  Button,
  Input,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { debounce, round } from 'lodash-es'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
// import { useForm, SubmitHandler, Controller } from 'react-hook-form'
// import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'
// import { createSend, storage } from '@/resources/account'
import { cutText, getFee, getMaximum } from '@/utils/tools'
import { msgSend } from '@/resources/bank'
import { baseFee, amountThreshold, rate, gas, minFee } from '@/resources/constants'
import { qs } from 'url-parse'
import { getBalanceByAddr } from '@/resources/api'
import { getAccount } from '@/resources/account'

// type IFormInput = {
//   password: string
//   password2: string
// }

export default function Send({ style }: any) {
  const navigate = useNavigate()
  const [toAddress, setToAddress] = useState<string>('')
  const [amount, setAmount] = useState<any>('')
  const [fee, setFee] = useState<any>()
  const [account, setAccount] = useState<any>({})
  const [data, setData] = useState<any>({
    ac: 0,
    ag: 0,
    showAc: '0',
    showAg: '0',
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [sendLoading, setSendLoading] = useState<boolean>(false)
  const { search } = useLocation()
  const searchs = qs.parse(search)

  const next = () => {
    let msg = ''
    if (!toAddress && !amount) {
      msg = 'Please enter the address and amount'
    } else if (!toAddress) {
      msg = 'Please enter the address'
    } else if (!amount) {
      msg = 'Please enter the amount'
    } else if (Number.isNaN(Number(amount))) {
      msg = 'Incorrect format of amount'
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

  const send = async () => {
    setSendLoading(true)
    let res
    try {
      res = await msgSend({ amount, toAddress, feeAmount: fee, gas, memo: '' })

      console.log('send res::', res)
      if (res?.code === 0) {
        getData(account)
        toast({
          title: 'Transaction success',
          // description: 'Amount transferred: 1, gas consumed:0.000334 SRC',
          position: 'top',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Transaction failed',
          // description: 'Amount transferred: 1, gas consumed:0.000334 SRC',
          position: 'top',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      }
      setSendLoading(false)
      close()
    } catch (error) {
      setSendLoading(false)
      toast({
        title: 'Transaction failed',
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const getData = async (data?: any) => {
    console.log('account:::::', account)
    const res = await getBalanceByAddr(data.address)
    let ac = 0
    let ag = 0
    res?.balances?.forEach((item: any) => {
      if (item.denom === 'src') {
        ac = Number(item.amount)
      }
      if (item.denom === 'srg') {
        ag = Number(item.amount)
      }
    })

    console.log('res:::::', res)
    console.log('ac:::::', ac)
    setData((val: any) => {
      return {
        ...val,
        ac,
        ag,
        showAc: Number(ac).toLocaleString('en-US'),
        showAg: Number(ag).toLocaleString('en-US'),
      }
    })
  }

  useEffect(() => {
    setFee(() => {
      // if (Number.isNaN(Number(amount))) return
      // const amountFee = round(amount * rate, 6)
      // return amount ? baseFee + (amountFee > minFee ? amountFee : minFee) : 0

      return getFee(amount)
    })
  }, [amount])

  useEffect(() => {
    getAccount().then(async (res) => {
      setAccount(res)
      console.log('data2222222222:::::', res)
      getData(res)
    })
  }, [])

  const close = () => {
    setAmount('')
    setToAddress('')
    onClose()
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack></Header>
      <Box>
        <Text fontSize="16px" fontWeight="600">
          Available
        </Text>
        <Text fontSize="16px">{data.showAc} SRC</Text>
      </Box>
      <Box fontSize="16px" fontWeight="600" mt="14px">
        Add an address and amount
      </Box>
      <Flex className={styles.info}>
        {/* <Box pr="12px">
          <Image src="" width="40px" height="40px" borderRadius="100%"></Image>
        </Box> */}
        <Box flexGrow="1">
          <Box fontSize="16px" fontWeight="600" wordBreak="break-all">
            {/* 0x22ec40b30x22ec40b30x22ec40b3 b340b30 */}
            <Input className={styles.inp} value={toAddress} onChange={(e: any) => setToAddress(e.target.value.trim())} autoComplete="off"></Input>
          </Box>
          <Box fontSize="12px" color="#08CE9E" mt="6px">
            Account not found, will be created
          </Box>
        </Box>
      </Flex>

      <Flex className={styles.am} alignItems="center" mt="18px">
        <InputGroup w="262px">
          <Input className={styles.inp} value={amount} onChange={(e) => setAmount(e.target.value.trim())} autoComplete="off"></Input>
          <InputRightElement pr="28px">
            <Button
              h="33px"
              mt="16px"
              size="lg"
              minW="50px"
              colorScheme="gray"
              fontWeight="normal"
              onClick={() => setAmount(getMaximum(Number(searchs.ac)))}
            >
              Max
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box className={styles.tex}>SRC</Box>
      </Flex>
      <Box color="#B1B6BB" mt="13px">
        fees: {fee} SRC
      </Box>

      <Flex mt="180px" justifyContent="space-around">
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
            <Box fontSize="18px" fontWeight="600" mt="8px">
              Summary
            </Box>
            <Box mt="10px">
              <Flex justifyContent="space-between" padding="12px 0">
                <Box>Recipient</Box>
                <Box>{cutText(toAddress)}</Box>
              </Flex>
              <Flex justifyContent="space-between" padding="12px 0">
                <Box>Amount</Box>
                <Box>{amount} SRC</Box>
              </Flex>
              <Flex justifyContent="space-between" padding="12px 0">
                <Box>Fee</Box>
                <Box>{fee} SRC</Box>
              </Flex>
              <Box borderTop="1px solid #ededed" mt="10px" mb="9px"></Box>
              <Flex justifyContent="space-between" fontSize="16px" padding="12px 0">
                <Box>
                  <span className={styles.highlight}>Total</span>
                </Box>
                <Box>
                  <span className={styles.highlight}>{Number(amount) + Number(fee)} SRC</span>
                </Box>
              </Flex>
            </Box>

            <Flex mt="80px" mb="12px" justifyContent="space-around">
              <Button size="lg" variant="outline" minW="155px" height="46px" onClick={onClose}>
                Back
              </Button>
              <Button
                size="lg"
                variant="solid"
                minW="155px"
                height="46px"
                ml="20px"
                isLoading={sendLoading}
                isDisabled={!amount || !toAddress}
                onClick={send}
              >
                Send
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
