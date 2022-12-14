import { storage } from '@/utils'
import { getCurrentTab } from '@/utils/tools'

declare const window: any

// chrome.runtime.onMessage.addListener((msg: MessageEventType, sender: chrome.runtime.MessageSender, sendResponse: (response: string) => void) => {
//   console.log('[content.js]. Message received', msg)
//   sendResponse('received')
//   if (process.env.NODE_ENV === 'development') {
//     if (msg.type === 'window.location.reload') {
//       console.log('current page will reload.')
//       window.location.reload()
//     }
//   }
// })

// chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
//   console.log('收到消息：', request)
// })

// window.srs = { a: 123 }
// console.log('window', window)
// console.log('window.srs::::', window.srs)
// console.log('content............', window.cosmostation)

// 注入脚本
const container = document.head || document.documentElement
const scriptElement = document.createElement('script')

scriptElement.src = chrome.runtime.getURL('injectedScript.js')
scriptElement.type = 'text/javascript'
container.insertBefore(scriptElement, container.children[0])
scriptElement.remove()

// 监听请求授权消息
const securityDomain = ['http://192.168.0.206/', 'http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002']
// const securityDomain = ['http://192.168.0.206/']
window.addEventListener(
  'message',
  async (event: MessageEvent) => {
    if (securityDomain.includes(event.origin) && event.data.from === 'injectedScript') {
      chrome.runtime.sendMessage(
        {
          value: event.data.value,
          origin: event.origin,
        },
        (res) => {
          console.log('请求授权消息:::::::::::::::::', res)
        }
      )
    }
  },
  false
)

// 监听确认授权消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('监听确认授权消息')
  if (request.from === 'popup' && request.value === 'requestConnectConfirm') {
    console.log('content.js收到popup.js确认的信息')

    window.postMessage(
      {
        value: request.value,
        form: 'content',
        account: request.account,
      },
      window.location.origin
    )

    return sendResponse({ msg: '收到确认授权' })
  }
})

// 监听取消授权消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('监听取消授权消息')
  if (request.from === 'popup' && request.value === 'requestConnectCancel') {
    console.log('content.js收到popup.js取消的信息')

    window.postMessage(
      {
        value: request.value,
        form: 'content',
      },
      window.location.origin
    )

    return sendResponse()
  }
})

export {}
