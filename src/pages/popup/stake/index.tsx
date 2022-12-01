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

import { Cosmos } from '../../../utils/cosmos'
import Menu from '@/components/menu'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Stake({ style, setTab }: any) {
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
      <Box className={styles.tit}>Stake</Box>
      <Flex mt="15px">
        <Box className={styles.logo}>
          <Image src="logo.svg"></Image>
        </Box>
        <Box flexGrow="1">
          <Box className={styles.id}>Account ID</Box>
          <Box className={styles.addr}>1AA2CB…B2C8EB</Box>
        </Box>
      </Flex>

      <Flex justifyContent="space-between" mt="18px">
        <Box fontSize="15px">Staking</Box>
        <Box>
          0 <span className="highlight">AC</span>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" mt="15px">
        <Box fontSize="15px">Available</Box>
        <Box>
          0 <span className="highlight">AG</span>
        </Box>
      </Flex>

      <Box fontWeight="600" fontSize="16px" mt="25px">
        Purchased Bond Type：
      </Box>
      <Box>
        {new Array(6).fill(10).map((item, index) => {
          return (
            <Flex key={index} bg="blackAlpha.100" mt="20px" padding="6px 0">
              <Box w="47%" pl="30px">
                1M
              </Box>
              <Box w="53%" pl="5px">
                0 <span className="highlight">AC</span>
              </Box>
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}
