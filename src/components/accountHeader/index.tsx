import { Box, Image, Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, CopyIcon, EditIcon } from '@chakra-ui/icons'
import { getAccount } from '@/resources/account'
import { cutText, copyText } from '@/utils/tools'

// type cprops = any

export default function AccountHeader({ title, showBack }: any) {
  const navigate = useNavigate()
  const [account, setAccount] = useState<any>({})
  const toast = useToast()

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
    })
  }, [])

  const onCopyAddr = (e: any) => {
    e.stopPropagation()
    copyText(account.address, () => {
      toast({
        title: 'copied！',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }

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
          <Box className={styles.addr}>
            {cutText(account.address)}
            <CopyIcon cursor="pointer" mt="-2px" ml="8px" boxSize="12px" onClick={onCopyAddr} />
          </Box>
        </Box>
      </Flex>
    </>
  )
}
