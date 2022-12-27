import React, { useEffect, useState } from 'react'
import { Box, Flex, useToast, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, useDisclosure } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import styles from './styles.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '@/components/header'
import CheckPassword from '@/components/checkPassword'
import { getAccount } from '@/resources/account'
import { copyText } from '@/utils/tools'

export default function ManageAccount({ style }: any) {
  const navigate = useNavigate()
  const [account, setAccount] = useState<any>({})
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [privateShow, setPrivateShow] = useState<boolean>(false)

  const toast = useToast()

  useEffect(() => {
    getAccount().then((res: any) => {
      setAccount({
        ...res,
        mnemonicArr: res.mnemonic?.split(' '),
      })
    })
  }, [])

  const next = () => {
    setIsCheck(true)
  }

  const onCopyPriv = (e: any) => {
    e.stopPropagation()
    copyText(account.privKeyString, () => {
      toast({
        title: 'copied！',
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  const onCopyPub = (e: any) => {
    e.stopPropagation()
    copyText(account.pubKeyAnyString, () => {
      toast({
        title: 'copied！',
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  return (
    <Box className={styles.container} style={style}>
      <Header showBack title="Manage Account"></Header>
      {isCheck ? (
        <Box>
          <Flex className={styles.item}>
            <Box className={styles.label}>Show secret recovery phrase</Box>
            <Box className={styles.value} onClick={() => onOpen()}>
              Show
            </Box>
          </Flex>
          <Flex className={styles.item}>
            <Box className={styles.label}>Private Key</Box>
            <Box className={styles.value} onClick={() => setPrivateShow(!privateShow)}>
              {privateShow ? 'hide' : 'show'}
            </Box>
          </Flex>

          <Box bg="blackAlpha.100" padding="10px 12px" borderRadius="6px" mt="4px" mb="8px">
            {privateShow ? (
              account.privKeyString
            ) : (
              <input className={styles.priv} value="**********************************************" readOnly type="password"></input>
            )}
            <CopyIcon className={styles.iconCopy} mt="-2px" ml="10px" boxSize="12px" onClick={onCopyPriv} />
          </Box>
          <Flex className={styles.item}>
            <Box className={styles.label}>Public Key</Box>
            <Box></Box>
          </Flex>
          <Box bg="blackAlpha.100" padding="10px 12px" borderRadius="6px" mt="4px" mb="8px">
            {account.pubKeyAnyString}
            <CopyIcon className={styles.iconCopy} mt="-2px" ml="10px" boxSize="12px" onClick={onCopyPub} />
          </Box>
        </Box>
      ) : (
        <CheckPassword next={next} v-show=""></CheckPassword>
      )}

      <Modal onClose={onClose} size={'xs'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Secret recovery phrase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className={styles.mnemonicWrap}>
              <Flex className={styles.mnemonic}>
                {account?.mnemonicArr?.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      <span>{index + 1}</span>
                      {item}
                    </div>
                  )
                })}
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
