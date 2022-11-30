import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { Cosmos } from '../../../utils/cosmos'
const chainId = 'srspoa'
const cosmos = new Cosmos('http://192.168.0.206:1317', chainId)
// import message from '../../../utils/message'

export default function Welcome({ style }: any) {
  const [mnemonic, setMnemonic] = useState<any[]>(new Array(12).fill('Wallet'))
  const [showTip, setShowTip] = useState<boolean>(true)
  const navigate = useNavigate()
  const initData = async () => {}
  const a = "You'll use this to unlock your wallet"

  const createMnemonic = () => {
    const _mnemonic = cosmos.getRandomMnemonic(128)
    setMnemonic(_mnemonic.split(' '))
    setShowTip(false)
  }

  const next = () => {
    navigate({ pathname: '/create3' })
  }

  return (
    <Box className={styles.create2} style={style}>
      <Box onClick={() => navigate(-1)} cursor="pointer">
        <ChevronLeftIcon></ChevronLeftIcon>back
      </Box>
      <Box className={styles.tit}>Secret recovery phrase</Box>
      <Box mt="6px">{a}</Box>
      <Box className={styles.mnemonicWrap}>
        <Flex className={styles.mnemonic}>
          {mnemonic.map((item, index) => {
            return (
              <div key={index}>
                <span>{index + 1}</span>
                {item}
              </div>
            )
          })}
        </Flex>
        <Flex className={styles.tip} style={{ display: showTip ? '' : 'none' }} onClick={() => createMnemonic()}>
          <Box>
            <ViewOffIcon color="blackAlpha.900" fontSize="36px"></ViewOffIcon>
          </Box>
          <Box fontSize="20px" fontWeight="600" mt="15px">
            Click to reveal phrase
          </Box>
          <Box fontSize="16px" mt="5px">
            Make sure that nobody can see your screen
          </Box>
        </Flex>
      </Box>

      <Box className={styles.btnNext}>
        <Button onClick={() => next()}>Continue</Button>
      </Box>
    </Box>
  )
}
