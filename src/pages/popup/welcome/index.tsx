import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, effect } from '@chakra-ui/react'
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getAccount, storage } from '@/resources/account'

export default function Welcome({ style }: any) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  storage.get(['currentAccount'], (res) => console.log('currentAccount:', res))

  // const timer = 20000
  const timer = 30 * 60 * 1000
  if (chrome?.runtime) {
    chrome.runtime.connect()
  }
  useEffect(() => {
    getAccount().then((res: any) => {
      // console.log('Account:', res)

      storage.get(['closeTime', 'autoLockTime'], ({ closeTime, autoLockTime }) => {
        // console.log('closeTime:::', closeTime)
        const now = new Date().getTime()
        // console.log('now - closeTime:::', now - closeTime)
        if (!res?.address) {
          setShow(true)
        } else if (now - closeTime > autoLockTime * 60 * 1000) {
          navigate({ pathname: '/unlock' }, { replace: true })
        } else {
          navigate({ pathname: '/main/home' }, { replace: true })
        }
      })
    })
  }, [])

  if (show) {
    return (
      <Box textAlign="center" style={style} padding={'18px'}>
        <Box mt="102px">
          <Image src="logo.svg" margin="0 auto"></Image>
        </Box>
        <Box fontSize="28px" fontWeight="bold" mt="35px">
          Welcome to SRS
        </Box>
        <Box fontSize="13px" ml="18px" mr="18px">
          The most reliable way to engage on SRS. Buy, store, and offer tokens & NFTs.
        </Box>
        <Link to={{ pathname: '/create1', search: `?type=create` }}>
          <Button colorScheme="green" w="100%" h="49px" mt="150px" fontWeight="500">
            Create New Wallet
          </Button>
        </Link>
        {/* importAccount */}
        <Box
          textDecoration="underline"
          cursor="pointer"
          mt="14px"
          fontSize="16px"
          onClick={() => navigate({ pathname: '/create1', search: `?type=import` })}
        >
          Import Wallet
        </Box>
      </Box>
    )
  } else {
    return <></>
  }
}
