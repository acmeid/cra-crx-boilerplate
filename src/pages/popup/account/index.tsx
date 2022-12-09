import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, SmallAddIcon, ViewOffIcon, WarningIcon, CheckIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import styles from './styles.module.scss'

import { Cosmos } from '../../../utils/cosmos'
import Menu from '@/components/menu'
import { getAccountList, setAccount } from '@/utils'
import { cutText } from '@/utils/tools'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Welcome({ style, setTab }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(12).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(2)
  const [list, setList] = useState<any[]>([])

  // const onToggle = () => {
  //   console.log('onToggle')
  //   setIsOpen(!isOpen)
  // }

  // const createMnemonic = () => {
  //   setShowTip(false)
  // }

  useEffect(() => {
    getAccountList().then((list) => {
      setList(list)
    })
  }, [])

  const switchAccount = (item: any) => {
    setAccount({ ...item, isActive: true }).then(() => {
      navigate({ pathname: '/main/home' })
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
        Accounts
      </Box>

      <Box className={styles.list} padding="0px 0" mt="20px">
        {list.map((item: any, index: any) => {
          return (
            <Flex className={styles.listItem} key={index} onClick={() => switchAccount(item)}>
              <Box className={styles.tag}>
                <Image src="/images/down.svg"></Image>
              </Box>
              <Box flexGrow="1">
                <Box className={styles.type}>{item.accountName || 'Account'}</Box>
                <Box>
                  <span className={styles.highlight}>{cutText(item.address)}</span>
                </Box>
              </Box>
              <Center>
                {item.isActive ? (
                  <Center borderRadius="20px" w="20px" h="20px" bg="green.500">
                    <CheckIcon color="#fff" fontSize="12px"></CheckIcon>
                  </Center>
                ) : (
                  ''
                )}
              </Center>
            </Flex>
          )
        })}
      </Box>

      <Box position="absolute" bottom="18px" left="18px" right="18px">
        <Link to={{ pathname: '/addAccount' }}>
          <Button variant="solid" minW="100%" h="50px" onClick={() => {}}>
            <SmallAddIcon boxSize="18px" mr="4px" mt="-2px" />
            Add Account
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
