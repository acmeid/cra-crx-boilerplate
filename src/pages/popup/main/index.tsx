import React, { Children, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Image,
  Slide,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SlideFade,
  Grid,
  GridItem,
  Center,
  StyledStepper,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import styles from './styles.module.scss'
import Menu from '@/components/menu'

// import { Cosmos } from '../../../utils/cosmos'
// const chainId = 'srspoa'
// const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)

export default function Main({ style, children }: any) {
  return (
    <Box className={styles.container} style={style}>
      <Outlet></Outlet>
      <Menu></Menu>
    </Box>
  )
}
