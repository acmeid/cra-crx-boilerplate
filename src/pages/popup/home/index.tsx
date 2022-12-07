import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, Image } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
// import Menu from '../../../components/menu'
import AccountHeader from '@/components/accountHeader'
import { getAccount } from '@/utils'

export default function Home({ style, setTab }: any) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [account, setAccount] = useState<any>({})

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
    })
  }, [])

  return (
    <Box className={styles.container} style={style}>
      <AccountHeader title="Home"></AccountHeader>

      <Box mt="18px">
        Total Balance <span>0</span>
        <span> AC</span>
      </Box>

      <Box fontSize="34px" fontWeight="600" mt="13px">
        $0
      </Box>

      <Box className={styles.amountWrap} mt="15px">
        <Flex>
          <Box className={styles.name}>Available</Box>
          <Box className={styles.num}>
            0 <span>AC</span>
          </Box>
          <Box className={styles.num}>
            0 <span>AG</span>
          </Box>
        </Flex>
        <Flex>
          <Box className={styles.name}>Staked</Box>
          <Box className={styles.num}>
            0 <span>AC</span>
          </Box>
          <Box className={styles.num}>
            0 <span>AG</span>
          </Box>
        </Flex>
        <Flex>
          <Box className={styles.name}>Power</Box>
          <Box className={styles.num}>
            0 <span>AC</span>
          </Box>
          <Box className={styles.num}>
            0 <span>AG</span>
          </Box>
        </Flex>
      </Box>

      <Flex justifyContent="space-around" mt="40px">
        <Button variant="outline" minW="154px" h="45px" onClick={() => {}}>
          Deposit
        </Button>
        <Button variant="outline" minW="154px" h="45px" onClick={() => navigate('/send')}>
          Send
        </Button>
      </Flex>

      <Flex bg="blackAlpha.100" padding="10px" mt="15px">
        <Box flexGrow="1">
          <Box fontSize="16px">Stake</Box>
          <Box fontSize="13px">Earn up to 18.9% per year</Box>
        </Box>
        <Box>
          <Button variant="solid" minW="75px" h="40px" onClick={() => {}}>
            Stake
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}
