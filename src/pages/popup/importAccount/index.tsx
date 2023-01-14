import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import { qs } from 'url-parse'

export default function ImportAccount({ style, setTab }: any) {
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchs = qs.parse(search)

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
        {/* Add Account */}
      </Box>

      <Box className={styles.list}>
        {/* <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/create3' })}>
          <Box flexGrow="1">Create new account</Box>
          <Box>
            <ChevronRightIcon boxSize="18px" color="blackAlpha.500"></ChevronRightIcon>
          </Box>
        </Flex> */}
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/importPrivateKey', search: search })}>
          <Box flexGrow="1">Import private key</Box>
          <Box>
            <ChevronRightIcon boxSize="18px" color="blackAlpha.500"></ChevronRightIcon>
          </Box>
        </Flex>
        <Flex className={styles.listItem} onClick={() => navigate({ pathname: '/ImportMnemonic', search: search })}>
          <Box flexGrow="1">Import mnemonic</Box>
          <Box>
            <ChevronRightIcon boxSize="18px" color="blackAlpha.500"></ChevronRightIcon>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
