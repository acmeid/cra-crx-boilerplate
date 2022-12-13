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

window.srs = { a: 123 }
console.log('window', window)
console.log('window.srs::::', window.srs)
console.log('content............', window.cosmostation)

const container = document.head || document.documentElement
const scriptElement = document.createElement('script')

// scriptElement.src = chrome.runtime.getURL('injectedScript.js')
// scriptElement.type = 'text/javascript'
// container.insertBefore(scriptElement, container.children[0])
// scriptElement.remove()

export {}
