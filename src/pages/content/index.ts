import { storage } from '@/resources/account'
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
const securityDomain = ['http://192.168.0.206', 'http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002']
// const securityDomain = ['http://192.168.0.206/']

window.addEventListener(
  'message',
  async (event: MessageEvent) => {
    if (securityDomain.includes(event.origin) && event.data.from === 'injectedScript' && event.data.value === 'requestConnect') {
      console.log('请求授权消息1:::::::::::::::::', event)
      try {
        chrome.runtime.sendMessage(
          {
            value: event.data.value,
            origin: event.origin,
          },
          (res) => {
            console.log('请求授权消息2:::::::::::::::::', res)
          }
        )
      } catch (error) {
        console.log('error::', error)
      }
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

// 监听请求断开消息
window.addEventListener(
  'message',
  async (event: MessageEvent) => {
    if (securityDomain.includes(event.origin) && event.data.from === 'injectedScript' && event.data.value === 'requestDisconnect') {
      chrome.runtime.sendMessage(
        {
          value: event.data.value,
          origin: event.origin,
        },
        (res) => {
          console.log('请求断开连接', res)
        }
      )
    }
  },
  false
)

// 监听已断开消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.from === 'popup' && request.value === 'disconnectConfirm') {
    window.postMessage(
      {
        value: request.value,
        form: 'content',
      },
      window.location.origin
    )

    return sendResponse({ msg: '收到确认授权' })
  }
})

// 监听普通交易请求
window.addEventListener(
  'message',
  async (event: MessageEvent) => {
    if (securityDomain.includes(event.origin) && event.data.from === 'injectedScript' && event.data.value === 'createSend') {
      chrome.runtime.sendMessage(
        {
          value: event.data.value,
          origin: event.origin,
          tx: event.data.tx,
        },
        (res) => {
          console.log('请求交易', res)
        }
      )
    }
  },
  false
)

// 监听其他交易请求
window.addEventListener(
  'message',
  async (event: MessageEvent) => {
    // console.log('event::', event)
    if (securityDomain.includes(event.origin) && event.data.from === 'injectedScript' && event.data.value === 'sendTx') {
      console.log('content收到发起其他交易的消息', event)
      chrome.runtime.sendMessage(
        {
          value: event.data.value,
          origin: event.origin,
          tx: event.data.tx,
        },
        (res) => {
          console.log('其他交易请求', res)
        }
      )
    }
  },
  false
)

// 监听其他交易结果
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.from === 'popup' && request.value === 'sendTx') {
    console.log('content收到其他交易结果的消息', request)
    window.postMessage(
      {
        value: request.value,
        form: 'content',
        response: request.response,
      },
      window.location.origin
    )

    return sendResponse({ msg: '收到其他交易结果' })
  }
})

// 监听普通交易结果
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.from === 'popup' && request.value === 'createSend') {
    window.postMessage(
      {
        value: request.value,
        form: 'content',
        response: request.response,
      },
      window.location.origin
    )

    return sendResponse({ msg: '收到普通交易结果' })
  }
})

export {}
