import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from '@chakra-ui/react'
import QRCode from 'qrcode'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import AccountHeader from '@/components/accountHeader'
import { getAccount } from '@/resources/account'
import { delegationByAddress, getAccountByAddr, getBalanceByAddr, getKyc, getRegionVaultById } from '@/resources/api'
import { debounce, round } from 'lodash-es'
import { openTab } from '@/utils/tools'
// import { exchange, storage } from '@/utils'
import { msgCreateDetegate, msgDetegate, msgAgToAc } from '@/resources'

export default function Home({ style, setTab }: any) {
  const navigate = useNavigate()
  const toast = useToast()
  const [data, setData] = useState<any>({})
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  const [account, setAccount] = useState<any>({})
  const [maxRate, setMaxRate] = useState<any>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // exchange({})
  //   .then((res: any) => {
  //     console.log('res:::::', res)
  //     if (res.tx_response.code !== 0) {
  //       toast({
  //         title: 'Transaction failed',
  //         position: 'top',
  //         status: 'error',
  //         duration: 6000,
  //         isClosable: true,
  //       })

  //       return
  //     }

  //     onClose()
  //     navigate(-1)
  //     toast({
  //       title: 'Transaction succeeded',
  //       position: 'top',
  //       status: 'success',
  //       duration: 8000,
  //       isClosable: true,
  //     })
  //   })
  //   .catch((error) => {
  //     toast({
  //       title: 'Transaction failed',
  //       // description: 'Amount transferred: 1, gas consumed:0.000334 APT',
  //       position: 'top',
  //       status: 'error',
  //       duration: 6000,
  //       isClosable: true,
  //     })
  //   })
  // console.log(1111111111111)

  const createQrCode = (data: any) => {
    const opts = {
      width: 270,
      errorCorrectionLevel: 'H',
      margin: 3,
      color: {
        dark: '#08A676',
        light: '#fff',
      },
    }

    QRCode.toCanvas(account.address, opts, function (error: any, canvas: any) {
      if (error) console.error(error)
      const container = document.getElementById('home-qrcode')
      if (container) container.appendChild(canvas)
      console.log('success!')
    })
  }

  const initData = async (data: any) => {
    // await msgCreateDetegate({})
    // await msgDetegate({})
    await msgAgToAc({})
    // setLoading(true)
    // getAccountByAddr(data.address),

    // try {
    //   // 如果部署kyc用户，调用getKyc http是404
    //   const [res2, res3]: any = await Promise.allSettled([getBalanceByAddr(data.address), getKyc(data.address)])
    //   console.log('res2:::', res2)
    //   let staked = 0
    //   let ac = 0
    //   let ag = 0
    //   res2?.value.balances?.forEach((item: any) => {
    //     if (item.denom === 'src') {
    //       ac = item.amount
    //     }
    //     if (item.denom === 'srg') {
    //       ag = item.amount
    //     }
    //   })

    //   console.log('res3:::::', res3)

    //   if (res3.status !== 'rejected' && res3?.value?.kyc) {
    //     try {
    //       const res4 = await delegationByAddress(data.address)
    //       staked = res4.delegation?.bondAmount ? 1 + res4.delegation?.bondAmount / 100000000 : 0

    //       const res5 = await getRegionVaultById(res3.kyc.regionId)
    //       const max = res5.regionVault.annualRate.reduce((prev: any, item: any) => {
    //         return item > prev ? item : prev
    //       }, 0)

    //       setMaxRate(`${round(max * 100, 0)}%`)
    //     } catch (error) {
    //       console.error('MaxRate error: ', error)
    //     }
    //   }
    //   console.log('ac:::', ac)
    //   console.log('ag:::', ag)
    //   setData({
    //     // ...res,
    //     ...data,
    //     ac,
    //     ag,
    //     staked,
    //     power: staked * 400,
    //     total: ac + staked,
    //   })
    // } catch (error) {
    //   console.error('InitData Error: ', error)
    // }
  }

  const showQrCode = () => {
    onOpen()
    setTimeout(() => {
      createQrCode(account)
    }, 50)
  }

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
      initData(res)
      // createQrCode(res)
    })
  }, [])

  const openStake = () => {
    openTab({ url: 'http://192.168.0.206/explorer/#/wallet' })
  }

  return (
    <Box className={styles.container} style={style}>
      <AccountHeader title="Home"></AccountHeader>

      <Box fontSize="16px" mt="18px">
        Total Balance: <span style={{ fontSize: '22px' }}>{data.total} </span>
        <span className={styles.highlight}>AC</span>
      </Box>

      {/* <Box fontSize="34px" fontWeight="600" mt="13px">
        $0
      </Box> */}

      <Box className={styles.amountWrap} mt="15px">
        <Flex>
          <Box className={styles.name}>Available</Box>
          <Box className={styles.num}>
            {data.ac} <span>AC</span>
          </Box>
          <Box className={styles.num}>
            {data.ag} <span>AG</span>
          </Box>
        </Flex>
        <Flex>
          <Box className={styles.name}>Staked</Box>
          <Box className={styles.num}>
            {data.staked} <span>AC</span>
          </Box>
          <Box className={styles.num}>{/* 0 <span>AG</span> */}</Box>
        </Flex>
        <Flex>
          <Box className={styles.name}>Power</Box>
          <Box className={styles.num}>
            {data.power} <span>AS</span>
          </Box>
          <Box className={styles.num}>{/* 0 <span>AG</span> */}</Box>
        </Flex>
      </Box>

      <Flex justifyContent="space-around" mt="70px">
        <Button variant="outline" minW="154px" h="45px" onClick={() => showQrCode()}>
          Deposit
        </Button>
        <Button variant="outline" minW="154px" h="45px" onClick={() => navigate('/send')}>
          Send
        </Button>
      </Flex>

      {maxRate ? (
        <Flex bg="blackAlpha.100" padding="10px" mt="15px">
          <Box flexGrow="1">
            <Box fontSize="16px">Stake</Box>
            <Box fontSize="13px">Earn up to {maxRate} per year</Box>
          </Box>
          <Box>
            <Button variant="solid" minW="75px" h="40px" onClick={() => openStake()}>
              Stake
            </Button>
          </Box>
        </Flex>
      ) : (
        ''
      )}

      <Modal onClose={onClose} size={'xs'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div id="home-qrcode" style={{ width: '270px', height: '270px', borderRadius: '8px', overflow: 'hidden', marginBottom: '15px' }}></div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
