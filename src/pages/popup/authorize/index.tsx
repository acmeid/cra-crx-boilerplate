import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon, ChevronRightIcon, EditIcon, CheckIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { getAccount, storage } from '@/resources/account'
import { getCurrentTab, openTab } from '@/utils/tools'

export default function Welcome({ style, setTab }: any) {
  const navigate = useNavigate()
  const [account, setAccount] = useState<any>({})
  const [origin, setOrigin] = useState<any>('')
  // const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
      storage.get(['currentConnectOrigin']).then(({ currentConnectOrigin }) => {
        setOrigin(currentConnectOrigin)
      })
    })
  }, [])

  const onCancel = () => {
    window.close()
  }
  const onConfirm = async () => {
    // const tab: any = await getCurrentTab()

    const queryOptions = { active: true }
    // const [tab]: any = await chrome.tabs.query(queryOptions)

    // console.log('tab::', tab)
    // const { requestTab } = await storage.get(['requestTab'])
    const tabs: any[] = await chrome.tabs.query({ active: true })
    console.log('tabs::', tabs)
    tabs.forEach((tab: any) => {
      chrome.tabs.sendMessage(
        tab.id,
        {
          from: 'popup',
          value: 'requestConnectConfirm',
          account: account,
        },
        async (result) => {
          if (!chrome.runtime.lastError) {
            // message processing code goes here
            console.log('result:::::', result)
          } else {
            console.log('result:::::', result)
            // error handling code goes here
          }

          console.log('onConfirm 确认授权')

          let { connectList } = await storage.get(['connectList'])
          connectList = connectList || []

          // console.log('onConfirm 确认授权22222222')
          let current = connectList.find((item: any) => {
            // console.log('item.origin::', item.origin)
            return item.origin && item.origin === origin
          })

          if (!current) {
            current = { status: 'connected', origin: origin }
            // console.log('current::::::::', current)
            connectList.push(current)
          } else {
            current.status = 'connected'
          }

          await storage.set({ connectList: connectList })
          await storage.get(['connectList']).then(({ connectList }) => {
            console.log('onConfirm connectList:::', connectList)
          })

          setTimeout(() => {
            window.close()
          }, 500)
        }
      )
    })

    // chrome.runtime.sendMessage(
    //   {
    //     from: 'popup',
    //     value: 'connectConfirm',
    //     account: account,
    //   },
    //   (response) => {
    //     console.log('popup.js收到background.js信息', response)
    //     window.close()
    //   }
    // )
  }

  return (
    <Box className={styles.container} style={style}>
      <Center w="100px" h="100px" margin="10px auto" border="1px solid #ededed" borderRadius="20px">
        <Image w="80px" src="logo.svg"></Image>
      </Center>

      <Center>
        <Box w="66%" textAlign="center" fontSize="26px">
          Access request{' '}
        </Box>
      </Center>
      <Center mt="5px">
        <Box w="66%" textAlign="center" fontSize="14px">
          <span className="highlight">{origin} </span> is requesting to connect to your <span className="highlight">{account.accountName}</span>{' '}
          account
        </Box>
      </Center>

      <Box borderBottom="1px solid #ededed" margin="25px 0 14px 0"></Box>

      <Box padding="0 15px">
        <Box color="blackAlpha.800" padding="12px 0">
          By approving this request, the website will:
        </Box>
        <Box padding="11px 0">
          <CheckIcon mr="10px" color="green.500" />
          <span>Know your wallet address</span>
        </Box>
        <Box padding="11px 0">
          <CheckIcon mr="10px" color="green.500" />
          <span>Request signatures for transactions</span>
        </Box>
        <Box padding="11px 0">
          <CheckIcon mr="10px" color="green.500" />
          <span>Encrypt/Decrypt messages</span>
        </Box>
      </Box>

      <Flex mt="65px" justifyContent="space-around">
        <Button size="lg" variant="outline" minW="155px" height="46px" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="lg" variant="solid" minW="155px" height="46px" ml="20px" onClick={onConfirm}>
          Confrim
        </Button>
      </Flex>
    </Box>
  )
}
