import { storage } from '@/utils'

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

chrome.runtime.onConnect.addListener(function (externalPort) {
  externalPort.onDisconnect.addListener(function () {
    // var ignoreError = chrome.runtime.lastError;
    console.log('onDisconnect')
    chrome?.storage?.local.set({ closeTime: new Date().getTime() })
  })
})

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('background.js收到popup.js信息', request)
  sendResponse({ res: { a: 1, b: 2 } })
})

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  console.log('收到消息：', request)
})
// ;(window as any).srs = {}
export {}
