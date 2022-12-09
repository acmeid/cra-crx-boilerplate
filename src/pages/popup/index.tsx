import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './Popup'
import './index.scss'

import dayjs from 'dayjs'

import 'dayjs/locale/en' // 按需加载

dayjs.locale('en') // 全局使用西班牙语

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
