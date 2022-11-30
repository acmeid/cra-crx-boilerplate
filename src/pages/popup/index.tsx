import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './Popup'
import './index.scss'

import { defaultTheme } from '../../config'
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider theme={defaultTheme}>
      <Popup />
    </ChakraProvider>
  </React.StrictMode>
)
