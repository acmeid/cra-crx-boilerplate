import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, useToast } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { addAccount } from '@/resources/account'

export default function Welcome({ style, setTab }: any) {
  const navigate = useNavigate()
  const toast = useToast()
  // const [mnemonic, setMnemonic] = useState<any[]>(new Array(24).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)
  const [list, setList] = useState<any[]>(new Array(3).fill(1))
  const [mnemonicAgin, setMnemonicAgin] = useState<any[]>(new Array(24).fill(''))

  useEffect(() => {}, [])

  const next = () => {
    // navigate({ pathname: '/create2' })
  }

  const checkMn = (index: number, value: string) => {
    setMnemonicAgin((val) => {
      val[index] = value
      console.log('val:::::', val)
      return val
    })
  }

  const submit = () => {
    addAccount({ mnemonic: mnemonicAgin.join(' ') })
      .then(() => {
        toast({
          title: 'Import succeeded',
          position: 'top',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate({ pathname: '/main/home' })
      })
      .catch((error) => {
        toast({
          title: 'Import failed',
          description: 'The mnemonic is incorrect',
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
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
        Import mnemonic
      </Box>

      <Box className={styles.mnemonicWrap}>
        <Flex className={styles.mnemonic2}>
          {mnemonicAgin.map((item, index) => {
            return (
              <div key={index}>
                <span>{index + 1}</span>
                <input type="text" onChange={(e) => checkMn(index, e.target.value)} />
              </div>
            )
          })}
        </Flex>
      </Box>

      <Box position="absolute" bottom="18px" left="18px" right="18px">
        <Button variant="solid" minW="100%" h="50px" onClick={() => submit()}>
          Submit
        </Button>
      </Box>
    </Box>
  )
}
