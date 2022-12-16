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
import { getAccount } from '@/utils'
import { openTab } from '@/utils/tools'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Welcome({ style, setTab }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(12).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  const [account, setAccount] = useState<any>({})
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)
  const [list, setList] = useState<any[]>(new Array(3).fill(1))

  // const onToggle = () => {
  //   console.log('onToggle')
  //   setIsOpen(!isOpen)
  // }

  // const createMnemonic = () => {
  //   setShowTip(false)
  // }

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
    })
  }, [])

  const viewOnExplorer = () => {
    openTab({ url: `http://192.168.0.206/explorer/#/account?address=${account.address}` })
  }

  const lock = () => {
    navigate('/unlock')
  }

  return (
    <Box className={styles.container} style={style}>
      <AccountHeader title="Settings"></AccountHeader>

      <Box className={styles.list}>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/network' })}>
          <Box flexGrow="1">Network Devnet</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/securityAndPrivacy' })}>
          <Box flexGrow="1">Security and Privacy</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
        {/* <Flex className={styles.listItem}>
          <Box flexGrow="1">Help & Support</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex> */}
        <Flex className={styles.listItem} onClick={lock}>
          <Box flexGrow="1">Lock wallet</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/manageAccount' })}>
          <Box flexGrow="1">Manage account</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
        <Flex className={styles.listItem} onClick={viewOnExplorer}>
          <Box flexGrow="1">View on explorer</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/account' })}>
          <Box flexGrow="1">Switch account</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/removeAccount' })}>
          <Box flexGrow="1">Remove account</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600" boxSize="17px"></ChevronRightIcon>
          </Box>
        </Flex>
      </Box>

      {/* <Box className={styles.list}>
        {list.map((item: any, index: any) => {
          return (
            <Flex className={styles.listItem} key={index}>
              <Box flexGrow="1">Network Devnet</Box>
              <Box>
                <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
              </Box>
            </Flex>
          )
        })}
      </Box> */}
    </Box>
  )
}
