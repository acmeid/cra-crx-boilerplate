import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image } from '@chakra-ui/react'
import { CalendarIcon, ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from '../styles.module.scss'
import { cutText } from '@/utils/tools'

export default function MsgDefault({ data }: any) {
  const navigate = useNavigate()
  const goDetail = (data: any) => {
    navigate({ pathname: '/transactionDetail', search: `?hash=${data.hash}` })
  }

  return (
    <Flex className={styles.listItem} key={data.hash} onClick={() => goDetail(data)}>
      <Box className={styles.tag}>
        {/* <Image src="/images/d2.svg" width="50px"></Image> */}
        {/* <Image src="/images/down.svg"></Image> */}
        <CalendarIcon boxSize="36px" color="gray.600"></CalendarIcon>
      </Box>
      <Box flexGrow="1">
        <Flex justifyContent="space-between">
          <Box className={styles.type}>{data._type}</Box>
          <Box className={styles.amount}>- {data._gas} AC</Box>
        </Flex>
        <Flex justifyContent="space-between" mt="4px">
          <Box className={styles.form}>{/* From <span className={styles.highlight}>0x22ec40b3...720fd</span> */}</Box>
          <Box className={styles.time}>{data._time}</Box>
        </Flex>
      </Box>
    </Flex>
  )
}
