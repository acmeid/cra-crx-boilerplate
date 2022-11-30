import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

type cprops = any

export default function Menu(props: cprops) {
  return (
    <Flex className={styles.menu}>
      <NavLink to={{ pathname: '/main/home' }}>
        <Box className={styles.menuItem}>
          <Image src="./images/view2.svg"></Image>
        </Box>
      </NavLink>
      <NavLink to={{ pathname: '/main/collectible' }}>
        <Box className={styles.menuItem}>
          <Image src="./images/view2.svg"></Image>
        </Box>
      </NavLink>
      <NavLink to={{ pathname: '/main/stake' }}>
        <Box className={styles.menuItem}>
          <Image src="./images/view2.svg"></Image>
        </Box>
      </NavLink>
      <NavLink to={{ pathname: '/main/activity' }}>
        <Box className={styles.menuItem}>
          <Image src="./images/view2.svg"></Image>
        </Box>
      </NavLink>
      <NavLink to={{ pathname: '/main/setting' }}>
        <Box className={styles.menuItem}>
          <Image src="./images/view2.svg"></Image>
        </Box>
      </NavLink>
    </Flex>
  )
}
