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
  list,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { Cosmos } from '../../../utils/cosmos'
import Menu from '@/components/menu'
import AccountHeader from '@/components/accountHeader'
import { getAccount } from '@/utils'
import { messageByAccount } from '@/resources/api'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Welcome({ style, setTab }: any) {
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

  useEffect(() => {
    getAccount().then((res) => {
      messageByAccount({ account: 'sil157ykw7kanea77pkwkrhw6v6a7gpzlwwcwjztup' }).then((res2) => {
        console.log('res2::', res2)
      })
    })
  }, [])

  const next = () => {
    // navigate({ pathname: '/create2' })
  }

  return (
    <Box className={styles.container} style={style}>
      <AccountHeader title="Activitys"></AccountHeader>

      <Box mt="18px" fontSize="16px">
        RECENT TRANSACTIONS
      </Box>

      <Box fontSize="14px" mt="5px">
        8 October 2022
      </Box>

      <Box className={styles.list}>
        {list.map((item: any, index: any) => {
          return (
            <Flex className={styles.listItem} key={index}>
              <Box className={styles.tag}>
                {/* <Image src="/images/up.svg"></Image> */}
                <Image src="/images/down.svg"></Image>
              </Box>
              <Box flexGrow="1">
                <Flex justifyContent="space-between">
                  <Box className={styles.type}>Received</Box>
                  <Box className={styles.amount}>+ 2 AC</Box>
                </Flex>
                <Flex justifyContent="space-between" mt="4px">
                  <Box className={styles.form}>
                    From <span className={styles.highlight}>0x22ec40b3...720fd</span>
                  </Box>
                  <Box className={styles.time}>6:44 pm</Box>
                </Flex>
              </Box>
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}
