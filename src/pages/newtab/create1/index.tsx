import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, Input, Checkbox, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Welcome({ style }: any) {
  const [show1, setShow1] = useState(false)
  // const [show2, setShow2] = useState(false)
  const navigate = useNavigate()
  const a = "You'll use this to unlock your wallet"

  const initData = async () => {}

  useEffect(() => {
    initData()
  }, [])

  const next = () => {
    navigate({ pathname: '/create3' })
  }

  return (
    <Box className={styles.create1} style={style}>
      <Box onClick={() => navigate(-1)} cursor="pointer">
        <ChevronLeftIcon></ChevronLeftIcon>back
      </Box>
      <Image></Image>
      <Box className={styles.tit}>Create a password</Box>
      <Box mt="6px">{a}</Box>
      <Box mt="22px">
        <InputGroup>
          <Input h="49px" type={show1 ? 'text' : 'password'} placeholder="Enter Password"></Input>
          <InputRightElement>
            <ViewIcon cursor="pointer" color="blackAlpha.600" style={{ display: show1 ? '' : 'none' }} onClick={() => setShow1(!show1)}></ViewIcon>
            <ViewOffIcon
              cursor="pointer"
              color="blackAlpha.400"
              style={{ display: !show1 ? '' : 'none' }}
              onClick={() => setShow1(!show1)}
            ></ViewOffIcon>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box mt="22px">
        <InputGroup>
          <Input h="49px" type={show1 ? 'text' : 'password'} placeholder="Confirm Password" autoComplete="off"></Input>
          <InputRightElement>
            {/* <ViewIcon cursor="pointer" color="blackAlpha.600" style={{ display: show2 ? '' : 'none' }} onClick={() => setShow2(!show2)}></ViewIcon> */}
            {/* <ViewOffIcon
              cursor="pointer"
              color="blackAlpha.400"
              style={{ display: !show2 ? '' : 'none' }}
              onClick={() => setShow2(!show2)}
            ></ViewOffIcon> */}
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box mt="22px">
        <Checkbox>Iagree to the Terms of Service</Checkbox>
      </Box>

      <Box className={styles.btnNext}>
        <Button onClick={() => next()}>Continue</Button>
      </Box>
    </Box>
  )
}
