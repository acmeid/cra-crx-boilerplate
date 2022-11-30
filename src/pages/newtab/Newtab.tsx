import React, { useState } from 'react'
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import NotFound from './notFound'
import Welcome from './welcome'
import Create1 from './create1'
import Create2 from './create2'
import Create3 from './create3'
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
          </Routes>
        </Box>
      </Flex>
    </Router>
  )
}

export default Newtab
