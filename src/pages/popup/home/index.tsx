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
import Menu from '../../../components/menu'

import { Cosmos } from '../../../utils/cosmos'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Welcome({ style, setTab }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(12).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)

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
      <Box className={styles.tit}>Home</Box>
      <Flex mt="15px">
        <Box className={styles.logo}>
          <Image src="logo.svg"></Image>
        </Box>
        <Box flexGrow="1">
          <Box className={styles.id}>Account ID</Box>
          <Box className={styles.addr}>1AA2CB…B2C8EB</Box>
        </Box>
      </Flex>

      <Box mt="18px">
        Total Balance <span>0</span>
        <span> AC</span>
      </Box>

      <Box fontSize="34px" fontWeight="600" mt="13px">
        $0
      </Box>

      <Box className={styles.amountWrap} mt="15px">
        <Flex>
          <Box className={styles.name}>Available</Box>
          <Box className={styles.num}>
            0 <span>AC</span>
          </Box>
          <Box className={styles.num}>
            0 <span>AG</span>
          </Box>
        </Flex>
        <Flex>
          <Box className={styles.name}>Staked</Box>
          <Box className={styles.num}>
            0 <span>AC</span>
          </Box>
          <Box className={styles.num}>
            0 <span>AG</span>
          </Box>
        </Flex>
        <Flex>
          <Box className={styles.name}>Power</Box>
          <Box className={styles.num}>
            0 <span>AC</span>
          </Box>
          <Box className={styles.num}>
            0 <span>AG</span>
          </Box>
        </Flex>
      </Box>

      <Flex justifyContent="space-around" mt="40px">
        <Button variant="outline" minW="154px" h="45px" onClick={() => {}}>
          Deposit
        </Button>
        <Button variant="outline" minW="154px" h="45px" onClick={() => {}}>
          Send
        </Button>
      </Flex>

      <Flex bg="blackAlpha.100" padding="10px" mt="15px">
        <Box flexGrow="1">
          <Box fontSize="16px">Stake</Box>
          <Box fontSize="13px">Earn up to 18.9% per year</Box>
        </Box>
        <Box>
          <Button variant="solid" minW="75px" h="40px" onClick={() => {}}>
            Stake
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}
