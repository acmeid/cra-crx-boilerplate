import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image, InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function Welcome({ style }: any) {
  const [show1, setShow1] = useState(false)

  return (
    <Box textAlign="center" style={style} padding={'18px'}>
      <Box mt="102px">
        <Image src="logo.svg" margin="0 auto"></Image>
      </Box>
      <Box fontSize="28px" fontWeight="bold" mt="35px">
        Welcome to SRS
      </Box>
      {/* <Box fontSize="13px" ml="18px" mr="18px">
        The most reliable way to engage on SRS. Buy, store, and offer tokens & NFTs.
      </Box> */}

      <Flex justifyContent="space-between" mt="130px">
        <Box>Password</Box>
        <Box className={styles.reset}>Reset password</Box>
      </Flex>
      <InputGroup mt="5px">
        <Input h="49px" type={show1 ? 'text' : 'password'} placeholder="Enter Password" />

        <InputRightElement h="49px">
          <ViewIcon cursor="pointer" color="blackAlpha.600" style={{ display: show1 ? '' : 'none' }} onClick={() => setShow1(!show1)}></ViewIcon>
          <ViewOffIcon
            cursor="pointer"
            color="blackAlpha.400"
            style={{ display: !show1 ? '' : 'none' }}
            onClick={() => setShow1(!show1)}
          ></ViewOffIcon>
        </InputRightElement>
      </InputGroup>

      <Button colorScheme="green" w="100%" h="49px" mt="20px" fontWeight="500" onClick={() => {}}>
        Unlock
      </Button>
    </Box>
  )
}
