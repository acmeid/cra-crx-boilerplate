import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

export default function Welcome({ style, setTab }: any) {
  const navigate = useNavigate()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen, onToggle } = useDisclosure()

  const next = () => {
    // navigate({ pathname: '/create2' })
  }

  return (
    <Box className={styles.create2} style={style}>
      <Box onClick={() => navigate(-1)} cursor="pointer">
        <ChevronLeftIcon></ChevronLeftIcon>back
      </Box>
      <Box className={styles.tit}>Enter Your Secret Recovery Phrase</Box>
      <Box mt="5px">Type your phrase exactly as you saw it on the previous screen</Box>
      <Box className={styles.mnemonicWrap}>
        <Flex className={styles.mnemonic}>
          {new Array(12).fill(1).map((item, index) => {
            return (
              <div key={index}>
                <span>{index + 1}</span>
                <input type="text" autoComplete="off" />
              </div>
            )
          })}
        </Flex>
      </Box>

      <Box className={styles.btnNext}>
        <Button onClick={() => onToggle()}>Continue</Button>
      </Box>

      <Slide in={isOpen}>
        <Box h="50px" p="40px" mt="4" bg="red" rounded="md" shadow="md" style={{ zIndex: 10 }}>
          66666666
        </Box>
      </Slide>
    </Box>
  )
}
