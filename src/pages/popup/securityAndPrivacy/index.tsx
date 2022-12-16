import React, { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { Cosmos } from '../../../utils/cosmos'
import Header from '@/components/header'

export default function Welcome({ style, setTab }: any) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)
  const [list, setList] = useState<any[]>(new Array(3).fill(1))

  useEffect(() => {}, [])

  const next = () => {
    // navigate({ pathname: '/create2' })
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack title="Security and Privacy"></Header>

      <Box className={styles.list}>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/changePassword' })}>
          <Box flexGrow="1">Change password</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/autoLock' })}>
          <Box flexGrow="1">Auto-lock Timer</Box>
          <Box>
            <ChevronRightIcon color="blackAlpha.600"></ChevronRightIcon>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
