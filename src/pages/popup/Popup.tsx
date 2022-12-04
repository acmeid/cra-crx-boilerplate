import React, { useState } from 'react'
import { HashRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import Unlock from './unlock'
import NotFound from './notFound'
import Welcome from './welcome'
import Create1 from './create1'
import Create2 from './create2'
import Create3 from './create3'
import Account from './account'
import AddAccount from './addAccount'
import ImportPrivateKey from './importPrivateKey'
import ImportMnemonic from './importMnemonic'
import Network from './network'
import TransactionDetail from './transactionDetail'
import CollectibleDetail from './collectibleDetail'
import Send from './send'
import ChangeName from './changeName'
import SecurityAndPrivacy from './securityAndPrivacy'
import ManageAccount from './manageAccount'
import RemoveAccount from './removeAccount'

import Home from './home'
import Collectible from './collectible'
import Stake from './stake'
import Activity from './activity'
import Setting from './setting'
import Main from './main'

import { Box, Flex } from '@chakra-ui/react'

function Newtab() {
  // const navigate = useNavigate()
  // const [tab, setTab] = useState<string>('welcome')

  return (
    // bg="#fafafa"
    <Router>
      <Flex justifyContent="center" alignItems="center" bg="#fafafa" h="100%">
        <Box w="375px" h="600px" bg="#fff" borderRadius="12px">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path={'/'} element={<Navigate to="/welcome" />} />
            <Route path={'/unlock'} element={<Unlock />} />
            <Route path={'/welcome'} element={<Welcome />} />
            <Route path={'/create1'} element={<Create1 />} />
            <Route path={'/create2'} element={<Create2 />} />
            <Route path={'/create3'} element={<Create3 />} />
            <Route path={'/account'} element={<Account />} />
            <Route path={'/addAccount'} element={<AddAccount />} />
            <Route path={'/importPrivateKey'} element={<ImportPrivateKey />} />
            <Route path={'/importMnemonic'} element={<ImportMnemonic />} />
            <Route path={'/network'} element={<Network />} />
            <Route path={'/transactionDetail'} element={<TransactionDetail />} />
            <Route path={'/collectibleDetail'} element={<CollectibleDetail />} />
            <Route path={'/send'} element={<Send />} />
            <Route path={'/ChangeName'} element={<ChangeName />} />
            <Route path={'/SecurityAndPrivacy'} element={<SecurityAndPrivacy />} />
            <Route path={'/manageAccount'} element={<ManageAccount />} />
            <Route path={'/removeAccount'} element={<RemoveAccount />} />

            <Route path={'/main'} element={<Main />}>
              <Route path={'/main/home'} element={<Home />} />
              <Route path={'/main/collectible'} element={<Collectible />} />
              <Route path={'stake'} element={<Stake />} />
              <Route path={'activity'} element={<Activity />} />
              <Route path={'setting'} element={<Setting />} />
            </Route>
          </Routes>
        </Box>
      </Flex>
    </Router>
  )
}

export default Newtab
