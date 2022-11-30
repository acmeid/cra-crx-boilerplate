import React, { useState } from 'react'
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import NotFound from './notFound'
import Welcome from './welcome'
import Create1 from './create1'
import Create2 from './create2'
import Create3 from './create3'

import Home from './home'
import Collectible from './collectible'
import Stake from './stake'
import Activity from './activity'
import Setting from './setting'
import Main from './main'

import { Box, Flex } from '@chakra-ui/react'

function Newtab() {
  // const [tab, setTab] = useState<string>('welcome')

  return (
    // bg="#fafafa"
    <Router>
      <Flex justifyContent="center" alignItems="center" bg="#fafafa" h="100%">
        <Box w="375px" h="600px" bg="#fff" borderRadius="12px">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path={'/'} element={<Navigate to="/welcome" />} />
            <Route path={'/welcome'} element={<Welcome />} />
            <Route path={'/create1'} element={<Create1 />} />
            <Route path={'/create2'} element={<Create2 />} />
            <Route path={'/create3'} element={<Create3 />} />
            <Route path={'/main'} element={<Main />}>
              {/* <Routes> */}
              {/* <> */}
              <Route path={'/main/home'} element={<Home />} />
              <Route path={'/main/collectible'} element={<Collectible />} />
              <Route path={'stake'} element={<Stake />} />
              <Route path={'activity'} element={<Activity />} />
              <Route path={'setting'} element={<Setting />} />
              {/* </> */}
              {/* </Routes> */}
            </Route>
          </Routes>
        </Box>
      </Flex>
    </Router>
  )
}

export default Newtab
