import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, effect } from '@chakra-ui/react'
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getAccount, storage } from '@/utils'

export default function Welcome({ style }: any) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  storage.get(['currentAccount'], (res) => console.log('currentAccount:', res))
  // const getCurrentAccount = storage.get(['currentAccount'])

  useEffect(() => {
    getAccount().then((res: any) => {
      console.log('Account:', res)
      if (!res?.address) {
        setShow(true)
      } else {
        navigate({ pathname: '/main/home' }, { replace: true })
      }
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
        <Link to={{ pathname: '/create1' }}>
          <Button colorScheme="green" w="100%" h="49px" mt="150px" fontWeight="500">
            Create New Wallet
          </Button>
        </Link>

        <Box textDecoration="underline" cursor="pointer" mt="14px" fontSize="16px">
          Import Wallet
        </Box>
      </Box>
    )
  } else {
    return <></>
  }
}
