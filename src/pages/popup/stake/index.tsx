import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Image,
  Slide,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SlideFade,
  Grid,
  GridItem,
  Center,
  StyledStepper,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import AccountHeader from '@/components/accountHeader'
import { getAccount } from '@/utils'
import { delegationByAddress, getBalanceByAddr, getKyc } from '@/resources/api'

export default function Stake({ style, setTab }: any) {
  const navigate = useNavigate()
  const [account, setAccount] = useState<any>({})
  const [data, setData] = useState<any>({})

  const initData = async (data: any) => {
    const [res2, res3]: any = await Promise.allSettled([getBalanceByAddr(data.address), getKyc(data.address)])
    let bondAmount = 0
    let staked = 0
    let ac = 0
    let ag = 0
    res2?.balances?.forEach((item: any) => {
      if (item.denom === 'src') {
        ac = item.amount
      }
      if (item.denom === 'srg') {
        ag = item.amount
      }
    })

    if (res3?.kyc) {
      const res4 = await delegationByAddress(data.address)
      bondAmount = res4.delegation?.bondAmount ? res4.delegation?.bondAmount / 100000000 : 0
      staked = bondAmount + 1
    }

    setData({
      ...data,
      ac,
      ag,
      staked,
      bondAmount,
      power: staked * 400,
    })
  }

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
      initData(res)
    })
  }, [])

  return (
    <Box className={styles.container} style={style}>
      <AccountHeader title="Stake"></AccountHeader>

      <Flex justifyContent="space-between" mt="18px">
        <Box fontSize="15px">Staking</Box>
        <Box>
          {data.staked} <span className="highlight">AC</span>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" mt="15px">
        <Box fontSize="15px">Available</Box>
        <Box>
          {data.ag} <span className="highlight">AG</span>
        </Box>
      </Flex>

      <Box fontWeight="600" fontSize="16px" mt="25px">
        Total Staking of Type：
      </Box>

      <Box border="1px solid #ededed" borderRadius="10px" mt="15px" pb="15px 0">
        <Box borderBottom="1px solid #ededed" padding="12px 15px">
          Staked Amount
        </Box>
        {new Array(6).fill(10).map((item, index) => {
          return (
            <Flex key={index} justifyContent="space-between" padding="10px 15px">
              <Box>1M</Box>
              <Box pl="5px">
                0 <span className="highlight">AC</span>
              </Box>
            </Flex>
          )
        })}
      </Box>

      <Box border="1px solid #ededed" borderRadius="10px" mt="20px">
        <Box borderBottom="1px solid #ededed" padding="12px 15px">
          Delegation Amount
        </Box>
        <Flex justifyContent="space-between" padding="12px 15px">
          <Box>Total</Box>
          <Box>
            {data.bondAmount} <span className="highlight">AC</span>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
