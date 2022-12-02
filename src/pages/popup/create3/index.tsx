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

import { SRS } from '../../../utils/cosmos'
import { addUser, getUser, getUserList } from '@/utils'

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

  useEffect(() => {
    const _mnemonic = SRS.getRandomMnemonic(128).split(' ')
    setMnemonic(_mnemonic)
  }, [])

  const next = async () => {
    const _mnemonic = mnemonic.join(' ')
    console.log('mnemonic::', _mnemonic)

    try {
      addUser(_mnemonic)

      const curryUser = await getUser()
      console.log('curryUser', curryUser)

      const userList = await getUserList()
      console.log('userList', userList)
    } catch (error) {
      console.error('add error', error)
    }

    navigate({ pathname: '/main/home' })
  }

  return (
    <Box className={styles.create2} style={style}>
      <Box onClick={() => navigate(-1)} cursor="pointer">
        <ChevronLeftIcon></ChevronLeftIcon>back
      </Box>
      <Box className={styles.tit}>Enter Your Secret Recovery Phrase</Box>
      <Box mt="5px">Type your phrase exactly as you saw it on the previous screen</Box>
      <Box className={styles.mnemonicWrap} style={{ display: step === 2 ? '' : 'none' }}>
        <Flex className={styles.mnemonic}>
          {mnemonic.map((item, index) => {
            return (
              <div key={index}>
                <span>{index + 1}</span>
                {item}
              </div>
            )
          })}
        </Flex>
        <Flex className={styles.tip} style={{ display: showTip ? '' : 'none' }} onClick={() => createMnemonic()}>
          <Box>
            <ViewOffIcon color="blackAlpha.900" fontSize="36px"></ViewOffIcon>
          </Box>
          <Box fontSize="20px" fontWeight="600" mt="15px">
            Click to reveal phrase
          </Box>
          <Box fontSize="16px" mt="5px">
            Make sure that nobody can see your screen
          </Box>
        </Flex>
      </Box>

      <Box className={styles.mnemonicWrap} style={{ display: step === 3 ? '' : 'none' }}>
        <Flex className={styles.mnemonic2}>
          {new Array(12).fill(1).map((item, index) => {
            return (
              <div key={index}>
                <span>{index + 1}</span>
                <input type="text" />
              </div>
            )
          })}
        </Flex>
      </Box>

      <Box className={styles.btnNext}>
        <Button onClick={() => (step === 2 ? setStep(3) : onToggle())} disabled={showTip}>
          Continue-{step}
        </Button>
      </Box>

      <Box className={styles.popup} rounded="md" style={{ display: isOpen ? '' : 'none', zIndex: 12 }}>
        <div className={[styles.mask, isOpen ? styles.maskIn : styles.maskOut].join(' ')} onClick={onToggle}></div>
        <div className={[styles.content, isOpen ? styles.contentIn : styles.contentOut].join(' ')}>
          <Grid h="70px" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={2} mt="20px">
            <GridItem rowSpan={2} colSpan={1}>
              <WarningIcon color="green.500" fontSize="78px" mt="3px"></WarningIcon>
            </GridItem>
            <GridItem rowSpan={1} colSpan={3} fontSize="18px" fontWeight="600" lineHeight="1.4">
              Keep your phrase safe!
            </GridItem>
            <GridItem rowSpan={1} colSpan={3} lineHeight="1.4">
              {"If you lose it you'll have no way of accessing your assets."}
            </GridItem>
          </Grid>
          <Box mt="90px">
            <Button variant="outline" minW="187px" onClick={onToggle}>
              Show phrase again
            </Button>
            <Button variant="solid" minW="120px" ml="20px" onClick={next}>
              Done
            </Button>
          </Box>
        </div>
      </Box>
    </Box>
  )
}
