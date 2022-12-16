import React, { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import AccountHeader from '@/components/accountHeader'

export default function Welcome({ style, setTab }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(12).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)

  const onToggle = () => {
    // console.log('onToggle')
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
      <AccountHeader title="Collectibles"></AccountHeader>

      <Flex wrap="wrap" ml="-18px" mr="-18px">
        {new Array(7).fill(1).map((item, index) => {
          return <Box key={index} w="154px" h="154px" mt="20px" ml="18px" bg="green.100"></Box>
        })}
      </Flex>
    </Box>
  )
}
