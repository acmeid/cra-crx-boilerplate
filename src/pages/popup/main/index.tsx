import React, { Children, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import styles from './styles.module.scss'
import Menu from '@/components/menu'

export default function Main({ style, children }: any) {
  return (
    <Box className={styles.container} style={style}>
      <Outlet></Outlet>
      <Menu></Menu>
    </Box>
  )
}
