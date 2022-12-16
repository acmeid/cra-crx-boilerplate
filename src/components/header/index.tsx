import { Box, Image, Flex, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, EditIcon } from '@chakra-ui/icons'

// type cprops = any

export default function Header({ title, showBack, back }: any) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (back && typeof back === 'function') {
      back()
    } else {
      navigate(-1)
    }
  }
  return (
    <>
      <Flex className={styles.container}>
        <Center cursor="pointer" onClick={handleBack}>
          {showBack ? <ChevronLeftIcon mt="-1px"></ChevronLeftIcon> : ''}
        </Center>
        {title}
      </Flex>
    </>
  )
}
