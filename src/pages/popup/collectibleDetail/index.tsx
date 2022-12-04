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
      <AccountHeader showBack title="Collectibles Detail"></AccountHeader>

      <Flex>
        <Box width="110px" height="110px" bg="green.500" borderRadius="4px">
          <Image src="" alt="" />
        </Box>
        <Box flexGrow="1" padding="0 16px">
          <Box fontSize="18px">Sinwish Collections</Box>
          <Box mt="20px">Different Life</Box>
          <Box>0080-cigarette butt</Box>
        </Box>
      </Flex>

      <Box mt="20px">
        <Box fontSize="18px">Description</Box>
        <Box mt="10px">By 
E4C_Deployer
E4C Rangers consists of avatars derived from 7 champions in the E4Cverse. Holders have special utilities, including the partial in-game IP ownership of the corresponding character and game assets airdrops, such as champions and skins. For more info, please refer to our website https://www.ambrus.studio/</Box>
      </Box>

      <Box className={styles.list}>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/network' })}>
          <Box flexGrow="1">Contract Address</Box>
          <Box>
            <span className={styles.highlight}>0x495f...7b5e</span>
          </Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Token ID</Box>
          <Box>5267431919067115...</Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Token Standard</Box>
          <Box>ERS-1155</Box>
        </Flex>
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Blockchain</Box>
          <Box>SRS</Box>
        </Flex>
        {/* <Box mt="11px" borderBottom="1px solid #EDEDED"></Box> */}
        <Flex className={styles.listItem}>
          <Box flexGrow="1">Metadata </Box>
          <Box>Centralized</Box>
        </Flex>
      </Box>
    </Box>
  )
}
