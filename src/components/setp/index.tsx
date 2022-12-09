import { Box, Image, Flex, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckIcon, ChevronLeftIcon, EditIcon } from '@chakra-ui/icons'

// type cprops = any

export default function Step({ total = 3, current }: any) {
  const navigate = useNavigate()

  return (
    <Box className={styles.container}>
      <Flex className={styles.content}>
        {new Array(total).fill('').map((item: any, index: number) => {
          return (
            <>
              <Box key={index} className={styles.stepItem}>
                <Box className={styles.state1} style={{ display: current < index + 1 ? ' ' : 'none' }}>
                  <Box></Box>
                </Box>

                <Box className={styles.state2} style={{ display: current === index + 1 ? ' ' : 'none' }}>
                  <Box></Box>
                </Box>

                <Box className={styles.state3} style={{ display: current > index + 1 ? ' ' : 'none' }}>
                  <CheckIcon className={styles.iconComp}></CheckIcon>
                </Box>
              </Box>
              {index + 1 < total ? <Box className={current > index + 1 ? styles.lineActive : styles.line}></Box> : ''}
            </>
          )
        })}
      </Flex>
    </Box>
  )
}
