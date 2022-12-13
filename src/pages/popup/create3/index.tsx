import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Image,
  Grid,
  GridItem,
  Center,
  StyledStepper,
  useToast,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { SRS } from '../../../utils/cosmos'
import { addAccount, getAccount, getAccountList } from '@/utils'
import Header from '@/components/header'
import Step from '@/components/setp'

export default function Create3({ style, setTab }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(24).fill('Wallet'))
  const [mnemonicAgin, setMnemonicAgin] = useState<any[]>(new Array(24).fill(''))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // const onToggle = () => {
  //   console.log('onToggle')
  //   setIsOpen(!isOpen)
  // }

  const createMnemonic = () => {
    setShowTip(false)
  }

  useEffect(() => {
    const _mnemonic = SRS.getRandomMnemonic(256).split(' ')
    // console.log('_mnemonic:', _mnemonic)
    setMnemonic(_mnemonic)
  }, [])

  const next = async () => {
    onClose()
    const isMatch = true

    // 暂时不校验
    // let isMatch = true
    // mnemonic.forEach((item, index) => {
    //   if (item !== mnemonicAgin[index]) {
    //     isMatch = false
    //   }
    // })

    if (!isMatch) {
      toast({
        title: 'The mnemonic words are incorrect',
        position: 'top',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const _mnemonic = mnemonic.join(' ')
    // console.log('mnemonic::', _mnemonic)

    try {
      await addAccount({ mnemonic: _mnemonic })
      navigate({ pathname: '/main/home' })
    } catch (error) {
      console.error('add error', error)
    }
  }

  const checkMn = (index: number, value: string) => {
    setMnemonicAgin((val) => {
      val[index] = value
      // console.log('val:::::', val)
      return val
    })
  }

  return (
    <Box className={styles.create2} style={style}>
      <Header showBack></Header>
      <Step total={3} current={step}></Step>
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
          {mnemonic.map((item, index) => {
            return (
              <div key={index}>
                <span>{index + 1}</span>
                <input type="text" onChange={(e) => checkMn(index, e.target.value)} />
              </div>
            )
          })}
        </Flex>
      </Box>

      <Box className={styles.btnNext}>
        <Button onClick={() => (step === 2 ? setStep(3) : onOpen())} disabled={showTip}>
          Continue
        </Button>
      </Box>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
          <DrawerBody>
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
              <Button variant="outline" minW="187px" onClick={onClose}>
                Show phrase again
              </Button>
              <Button variant="solid" minW="120px" ml="20px" onClick={next}>
                Done
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* <Box className={styles.popup} rounded="md" style={{ display: isOpen ? '' : 'none', zIndex: 12 }}>
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
      </Box> */}
    </Box>
  )
}
