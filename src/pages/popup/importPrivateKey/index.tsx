import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, InputGroup, InputRightElement, Input } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { Cosmos } from '../../../utils/cosmos'
import Menu from '@/components/menu'
import { Controller } from 'react-hook-form'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Welcome({ style, setTab }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(12).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)
  const [list, setList] = useState<any[]>(new Array(3).fill(1))
  const [show1, setShow1] = useState(false)

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
      <Box className={styles.tit}>
        <ChevronLeftIcon
          cursor="pointer"
          boxSize="26px"
          mt="-2px"
          onClick={() => {
            navigate(-1)
          }}
        ></ChevronLeftIcon>
        Import private key
      </Box>

      <Box mt="45px">Access an existing wallet with your private key.</Box>
      <Box mt="11px">
        <InputGroup>
          <Input h="49px" type={show1 ? 'text' : 'password'} placeholder="Enter private key here" />
          <InputRightElement h="49px">
            <ViewIcon cursor="pointer" color="blackAlpha.600" style={{ display: show1 ? '' : 'none' }} onClick={() => setShow1(!show1)}></ViewIcon>
            <ViewOffIcon
              cursor="pointer"
              color="blackAlpha.400"
              style={{ display: !show1 ? '' : 'none' }}
              onClick={() => setShow1(!show1)}
            ></ViewOffIcon>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box position="absolute" bottom="18px" left="18px" right="18px">
        <Button variant="solid" minW="100%" h="50px" onClick={() => {}}>
          Submit
        </Button>
      </Box>
    </Box>
  )
}
