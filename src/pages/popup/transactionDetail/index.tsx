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
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import { qs } from 'url-parse'

import Header from '@/components/header'
import { getAccount } from '@/utils'
import { getTransByHash } from '@/resources/api'
import dayjs from 'dayjs'
import { dealType } from '@/utils/tools'

export default function TransactionDetail({ style }: any) {
  const navigate = useNavigate()
  const [data, setData] = useState<any>({})
  const { search } = useLocation()
  const searchs = qs.parse(search)

  const initData = async () => {
    const res = await getAccount()
    const res2 = await getTransByHash({ transaction_hash: searchs.hash })

    setData({
      ...res2.data,
      _type: dealType(res2.data.messages[0]?.['@type']),
      _status: res2.data.success ? 'success' : 'fail',
      _date: dayjs(res2.timestamp).format('MMM D, YYYY, h:mm A'),
      _gas: res2.data.fee.amount.find((v2: any) => v2.denom === 'src').amount,
    })
  }

  useEffect(() => {
    initData()
  }, [])

  const viewOnExplorer = () => {
    chrome.tabs.create({ url: `http://192.168.0.206/explorer/#/transactionDetail?hash=${searchs.hash}` })
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack title="Transaction"></Header>
      <Box mt="25px" onClick={viewOnExplorer} cursor="pointer">
        View on explorer
      </Box>

      <Box className={styles.list}>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/network' })}>
          <Box flexGrow="1">Height</Box>
          <Box>
            <span className={styles.highlight}>12519939</span>
          </Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Timestamp</Box>
          <Box>{data._date}</Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Status</Box>
          <Box>{data._status}</Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Gas used</Box>
          <Box>
            {data._gas} <span className={styles.highlight}>AC</span>
          </Box>
        </Flex>
        <Box mt="11px" borderBottom="1px solid #EDEDED"></Box>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Type</Box>
          <Box>{data._type}</Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">From</Box>
          <Box>You</Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">To</Box>
          <Box>
            <span className={styles.highlight}>0x495f...7b5e</span>
          </Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Amount</Box>
          <Box>
            0.000323 <span className={styles.highlight}>AC</span>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
