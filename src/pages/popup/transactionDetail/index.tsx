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

import { Cosmos } from '../../../utils/cosmos'
import Menu from '@/components/menu'
import AccountHeader from '@/components/accountHeader'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function TransactionDetail({ style }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(12).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)
  const [list, setList] = useState<any[]>(new Array(3).fill(1))

  const onToggle = () => {
    console.log('onToggle')
    setIsOpen(!isOpen)
  }

  const createMnemonic = () => {
    setShowTip(false)
  }

  useEffect(() => {}, [])

  const next = () => {
    // navigate({ pathname: '/create2' })
  }

  return (
    <Box className={styles.container} style={style}>
      <Box onClick={() => navigate(-1)} cursor="pointer">
        <ChevronLeftIcon></ChevronLeftIcon>Transaction
      </Box>
      <Box mt="25px">View on explorer</Box>

        <Box className={styles.list}>
          <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/network' })}>
            <Box flexGrow="1">Height</Box>
            <Box>
              <span className={styles.highlight}>12519939</span>
            </Box>
          </Flex>
          <Flex className={styles.listItem}>
            <Box flexGrow="1">Timestamp</Box>
            <Box>
            Oct 8, 2022, 6:42 PM
            </Box>
          </Flex>
          <Flex className={styles.listItem}>
            <Box flexGrow="1">Status</Box>
            <Box>
              success
            </Box>
          </Flex>
          <Flex className={styles.listItem}>
            <Box flexGrow="1">Gas used</Box>
            <Box>
            0.000323 <span className={styles.highlight}>AC</span>
            </Box>
          </Flex>
          <Box mt="11px" borderBottom="1px solid #EDEDED"></Box>
          <Flex className={styles.listItem}>
            <Box flexGrow="1">Type</Box>
            <Box>
            Coin transfer 
            </Box>
          </Flex>
          <Flex className={styles.listItem}>
            <Box flexGrow="1">From</Box>
            <Box>
            You
            </Box>
          </Flex>
          <Flex className={styles.listItem}>
            <Box flexGrow="1">To</Box>
            <Box><span className={styles.highlight}>0x495f...7b5e</span></Box>
          </Flex>
          <Flex className={styles.listItem}>
            <Box flexGrow="1">Amount</Box>
            <Box>0.000323 <span className={styles.highlight}>AC</span></Box>
          </Flex>
        </Box>
    </Box>
  )
}
