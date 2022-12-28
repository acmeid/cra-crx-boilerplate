import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from '../styles.module.scss'
import { cutText } from '@/utils/tools'

export default function MsgCustom({ data }: any) {
  const navigate = useNavigate()
  const goDetail = (data: any) => {
    navigate({ pathname: '/transactionDetail', search: `?hash=${data.hash}` })
  }

  return (
    <Flex className={styles.listItem} key={data.hash} onClick={() => goDetail(data)}>
      <Box className={styles.tag}>
        <Image src={!data.delegatorAddress ? '/images/down.svg' : '/images/up.svg'}></Image>
      </Box>
      <Box flexGrow="1">
        <Flex justifyContent="space-between">
          <Box className={styles.type}>{data._type}</Box>
          {!data.delegatorAddress ? (
            <Box className={styles.amountFrom}>+ {data.value?.amount?.[0]?.amount} SRC</Box>
          ) : (
            <Box className={styles.amountTo}>- {data.value?.amount?.[0]?.amount} SRC</Box>
          )}
        </Flex>
        <Flex justifyContent="space-between" mt="4px">
          {!data.delegatorAddress ? (
            <Box className={styles.form}>
              From <span className={styles.highlight}>{cutText(data?.value?.delegatorAddress, 10, 6)}</span>
            </Box>
          ) : (
            <Box className={styles.form}>
              To <span className={styles.highlight}>{cutText(data?.value?.delegatorAddress, 10, 6)}</span>
            </Box>
          )}

          <Box className={styles.time}>{data._time}</Box>
        </Flex>
      </Box>
    </Flex>
  )
}
