import React, { useEffect, useState } from 'react'
import { Box, Flex, Button, useToast, Drawer, DrawerOverlay, DrawerBody, DrawerContent, Center, useDisclosure } from '@chakra-ui/react'
import { ChevronLeftIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ErrorMessage from '@/components/errorMessage'
import Header from '@/components/header'
import CheckPassword from '@/components/checkPassword'
import { disconnect, getAccount, removeAccount, storage } from '@/resources/account'
import { cutText } from '@/utils/tools'

type IFormInput = {
  password: string
  password2: string
  // agree: boolean
}

export default function ChangeName({ style }: any) {
  const toast = useToast()
  const navigate = useNavigate()
  const [show1, setShow1] = useState(false)
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  const [account, setAccount] = useState<any>({})
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    getAccount().then((res) => {
      setAccount(res)
      // onOpen()
    })
  }, [])

  const remove = async () => {
    const accountList = await removeAccount()
    disconnect()
    if (accountList?.length) {
      navigate({ pathname: '/account', search: '?replace=1' }, { replace: true })
    } else {
      navigate({ pathname: '/welcome' }, { replace: true })
    }
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack title="Remove Account"></Header>
      <CheckPassword next={onOpen}></CheckPassword>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
          <DrawerBody>
            <Center mt="20px" fontSize="16px" fontWeight="600">
              <Center borderRadius="100%" bg="gray.100" w="60px" h="60px">
                <WarningIcon color="gray.600" fontSize="40px"></WarningIcon>
              </Center>
            </Center>
            <Center fontSize="20px" textAlign="center" mt="15px" mb="15px">
              Remove {cutText(account.address)} ?
            </Center>
            <Center textAlign="center">
              {"Although you are removing this from your Aptos wallet, you'll be able to retrieve if using your mnemonic phrase."}
            </Center>

            <Flex mt="90px" justifyContent="space-around" pb="10px">
              <Button size="lg" variant="outline" minW="155px" height="46px" colorScheme="green" onClick={onClose}>
                Cancel
              </Button>
              <Button size="lg" variant="solid" minW="155px" height="46px" colorScheme="green" ml="20px" onClick={remove}>
                Connfirm
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
