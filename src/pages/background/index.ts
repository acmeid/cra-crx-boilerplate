import { getAccount, storage } from '@/utils'
import { openTab } from '@/utils/tools'

const getCurrentTab = async () => {
  const queryOptions = { active: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

if (process.env.NODE_ENV === 'development') {
  const eventSource = new EventSource(`http://${process.env.REACT_APP__HOST__}:${process.env.REACT_APP__PORT__}/reload/`)
  console.log('--- 开始监听更新消息 ---')
  eventSource.addEventListener('content_changed_reload', async ({ data }) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    })
    const tabId = tab.id || 0
    console.log(`tabId is ${tabId}`)
    await chrome.tabs.sendMessage(tabId, {
      type: 'window.location.reload',
    })
    console.log('chrome extension will reload', data)
    chrome.runtime.reload()
  })
}
console.log('This is the background page.')

// 用于锁定
chrome.runtime.onConnect.addListener(function (externalPort) {
  externalPort.onDisconnect.addListener(function () {
    // var ignoreError = chrome.runtime.lastError;
    console.log('onDisconnect')
    chrome?.storage?.local.set({ closeTime: new Date().getTime() })
  })
})

// chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
//   console.log('background.js收到popup.js信息', request)
//   sendResponse({ res: { a: 1, b: 2 } })
// })

// 请求连接-打开验证窗口
chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  // console.log('background.js收到信息', request)
  if (request.value === 'requestConnect') {
    const { connectList } = await storage.get(['connectList'])

    console.log('connectList::::', connectList)
    const targetOrigin = (connectList || []).find((item: any) => item.origin === request.origin)

    if (targetOrigin && targetOrigin.status === 'connected') {
      const tab: any = await getCurrentTab()
      const account: any = await getAccount()
      console.log('tab::', tab)
      // const { requestTab } = await storage.get(['requestTab'])
      chrome.tabs.sendMessage(
        tab.id,
        {
          from: 'popup',
          value: 'requestConnectConfirm',
          account: account,
        },
        async () => {}
      )
      return sendResponse({ msg: '已授权' })
    }

    await storage.set({ currentConnectOrigin: request.origin })

    // chrome.runtime.getURL('popup.html/#/welcome')
    chrome.windows.create({ url: `${chrome.runtime.getURL('popup.html')}#/authorize`, type: 'popup', width: 375, height: 639 })
    return sendResponse({ msg: '成功打开窗口' })
  }
})

// 断开连接
chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  // console.log('background.js收到信息', request)
  if (request.value === 'requestDisconnect') {
    let { connectList } = await storage.get(['connectList'])

    console.log('connectList::::', connectList)
    const targetOrigin = (connectList || []).find((item: any) => item.origin === request.origin)

    connectList = connectList.map((item: any) => {
      return {
        ...item,
        status: 'disconnected',
      }
    })

    await storage.set({ connectList: connectList })
    const tab: any = await getCurrentTab()
    chrome.tabs.sendMessage(
      tab.id,
      {
        from: 'popup',
        value: 'disconnectConfirm',
      },
      async () => {}
    )
    return sendResponse({ msg: '已断开连接' })
  }
})

// chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
//   console.log('收到消息：', request)
// })
// ;(window as any).srs = {}
export {}
