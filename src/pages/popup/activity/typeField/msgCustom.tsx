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

  // , 'NewKyc'
  const addList = ['ExitDelegate', 'DoFixedWithdraw', 'AgToAc']
  const reduceList = ['Delegate', 'CreateDelegate', 'DoFixedDeposit']

  return (
    <Flex className={styles.listItem} key={data.hash} onClick={() => goDetail(data)}>
      <Box className={styles.tag}>
        <Image src={addList.includes(data._type) ? '/images/down.svg' : '/images/up.svg'}></Image>
      </Box>
      <Box flexGrow="1">
        <Flex justifyContent="space-between">
          <Box className={styles.type}>{data._type}</Box>
          <Box className={styles.time}>{data._time}</Box>
        </Flex>
        <Flex justifyContent="space-between" mt="4px">
          {addList.includes(data._type) ? (
            <Box className={styles.amountFrom}>+ {data.value?.amount?.amount || data.value?.amount?.[0]?.amount || data.value?.amount || 0} SRC</Box>
          ) : (
            <Box className={styles.amountTo}>- {data.value?.amount?.amount || data.value?.amount?.[0]?.amount || data.value?.amount || 0} SRC</Box>
          )}

          {addList.includes(data._type) ? (
            <Box className={styles.form}>
              {data?.value?.delegatorAddress && 'From'} <span className={styles.highlight}>{cutText(data?.value?.delegatorAddress, 10, 6)}</span>
            </Box>
          ) : (
            <Box className={styles.form}>
              {data?.value?.delegatorAddress && 'To'} <span className={styles.highlight}>{cutText(data?.value?.delegatorAddress, 10, 6)}</span>
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}
