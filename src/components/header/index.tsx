import { Box, Image, Flex, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, EditIcon } from '@chakra-ui/icons'
import { getUser } from '@/utils'
import { cutText } from '@/utils/tools'

// type cprops = any

export default function AccountHeader({ title, showBack }: any) {
  const navigate = useNavigate()
  // const [user, setUser] = useState<any>({})

  // useEffect(() => {
  //   getUser().then((res) => {
  //     setUser(res)
  //   })
  // }, [])

  return (
    <>
      <Flex className={styles.tit}>
        <Center cursor="pointer" onClick={() => showBack && navigate(-1)}>{showBack ? <ChevronLeftIcon mt="-1px"></ChevronLeftIcon> : ''}</Center>{title}
      </Flex>
    </>
  )
}
