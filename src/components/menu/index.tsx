import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

type cprops = any

export default function Menu(props: cprops) {
  return (
    <Flex className={styles.menu}>
      <NavLink to={{ pathname: '/main/home' }}>
        {({ isActive }: any) => {
          return (
            <Box className={styles.menuItem}>
              <Image src={isActive ? './images/a2.svg' : './images/a1.svg'}></Image>
            </Box>
          )
        }}
      </NavLink>
      <NavLink to={{ pathname: '/main/collectible' }}>
        {({ isActive }: any) => {
          return (
            <Box className={styles.menuItem}>
              <Image src={isActive ? './images/e2.svg' : './images/e1.svg'}></Image>
            </Box>
          )
        }}
      </NavLink>
      <NavLink to={{ pathname: '/main/stake' }}>
        {({ isActive }: any) => {
          return (
            <Box className={styles.menuItem}>
              <Image src={isActive ? './images/b2.svg' : './images/b1.svg'}></Image>
            </Box>
          )
        }}
      </NavLink>
      <NavLink to={{ pathname: '/main/activity' }}>
        {({ isActive }: any) => {
          return (
            <Box className={styles.menuItem}>
              <Image src={isActive ? './images/c2.svg' : './images/c1.svg'}></Image>
            </Box>
          )
        }}
      </NavLink>
      <NavLink to={{ pathname: '/main/setting' }}>
        {({ isActive }: any) => {
          return (
            <Box className={styles.menuItem}>
              <Image src={isActive ? './images/d2.svg' : './images/d1.svg'}></Image>
            </Box>
          )
        }}
      </NavLink>
    </Flex>
  )
}
