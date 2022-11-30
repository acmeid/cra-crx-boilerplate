import React from 'react'
import ReactDOM from 'react-dom/client'

import Newtab from './Newtab'
import './index.scss'
import { defaultTheme } from '../../config'
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider theme={defaultTheme}>
      <Newtab />
    </ChakraProvider>
  </React.StrictMode>
)
