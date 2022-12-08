import { Box, Image, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, EditIcon } from '@chakra-ui/icons'
import { getAccount } from '@/utils'
import { cutText } from '@/utils/tools'

// type cprops = any

export default function AccountHeader({ title, showBack }: any) {
  const navigate = useNavigate()
  const [account, setAccount] = useState<any>({})

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
    })
  }, [])

  return (
    <>
      <Box className={styles.tit} onClick={() => showBack && navigate(-1)}>
        {showBack ? <ChevronLeftIcon mt="-3px"></ChevronLeftIcon> : ''}
        {title}
      </Box>
      <Flex mt="15px">
        <Box className={styles.logo} onClick={() => navigate({ pathname: '/account' })} cursor="pointer">
          <Image src="logo.svg"></Image>
        </Box>
        <Box flexGrow="1">
          <Box className={styles.id}>
            {account.accountName} <EditIcon className={styles.edit} onClick={() => navigate('/changeName')} />
          </Box>
          <Box className={styles.addr}>{cutText(account.address)}</Box>
        </Box>
      </Flex>
    </>
  )
}
