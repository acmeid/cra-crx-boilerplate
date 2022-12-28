import { createSend, getAccount, storage } from '@/resources/account'
import { msgCreateDetegate, msgExitDelegate, msgDetegate, msgUndelegate, msgAgToAc, msgDoFixedDeposit, msgDoFixedWithdraw } from '@/resources'
// // import { SRS } from '@/utils/cosmos'
// import { openTab } from '@/utils/tools'

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

// // 用于锁定
// chrome.runtime.onConnect.addListener(function (externalPort) {
//   externalPort.onDisconnect.addListener(function () {
//     // var ignoreError = chrome.runtime.lastError;
//     console.log('onDisconnect')
//     chrome?.storage?.local.set({ closeTime: new Date().getTime() })
//   })
// })

// // chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
// //   console.log('background.js收到popup.js信息', request)
// //   sendResponse({ res: { a: 1, b: 2 } })
// // })

// 请求连接-打开验证窗口
chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  console.log('background.js收到信息', request)
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
      sendResponse({ msg: '已授权' })
      return true
    }

    await storage.set({ currentConnectOrigin: request.origin })

    // chrome.runtime.getURL('popup.html/#/welcome')
    chrome.windows.create({ url: `${chrome.runtime.getURL('popup.html')}#/authorize`, type: 'popup', width: 375, height: 639 })
    sendResponse({ msg: '成功打开窗口' })
    return true
  }
})

// 断开连接
chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  // console.log('background.js收到信息', request)
  if (request.value === 'requestDisconnect') {
    let { connectList } = await storage.get(['connectList'])

    console.log('connectList::::', connectList)
    // const targetOrigin = (connectList || []).find((item: any) => item.origin === request.origin)

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
    sendResponse({ msg: '已断开连接' })
    return true
  }
})
console.log('fetch::', fetch)
// console.log('window::', window)

// 普通交易
chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  const tab: any = await getCurrentTab()
  if (request.value === 'createSend') {
    const res: any = await createSend({
      toAddress: request.tx.toAddress,
      amount: request.tx.amount,
      memo: request.tx.memo,
    })

    chrome.tabs.sendMessage(
      tab.id,
      {
        from: 'popup',
        value: 'createSend',
        response: res,
      },
      async () => {}
    )

    sendResponse({ msg: '已发起交易' })
    return true
  }
})

// 其他交易
chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  console.log('background 收到其他交易请求')
  const tab: any = await getCurrentTab()
  if (request.value === 'sendTx') {
    let send: Promise<any> = Promise.resolve('缺少msgType')
    try {
      switch (request.tx.msgType) {
        case 'msgCreateDetegate':
          send = msgCreateDetegate({
            amount: String(request.tx.amount),
            feeAmount: String(request.tx.feeAmount),
            gas: String(request.tx.gas),
            memo: request.tx.memo,
          })
          break

        case 'msgExitDelegate':
          send = msgExitDelegate({
            amount: String(request.tx.amount),
            feeAmount: String(request.tx.feeAmount),
            gas: String(request.tx.gas),
            memo: request.tx.memo,
          })
          break

        case 'msgDetegate':
          send = msgDetegate({
            amount: String(request.tx.amount),
            feeAmount: String(request.tx.feeAmount),
            gas: String(request.tx.gas),
            memo: request.tx.memo,
          })
          break

        case 'msgUndelegate':
          send = msgUndelegate({
            amount: String(request.tx.amount),
            feeAmount: String(request.tx.feeAmount),
            gas: String(request.tx.gas),
            memo: request.tx.memo,
          })
          break

        case 'msgAgToAc':
          send = msgAgToAc({
            amount: String(request.tx.amount),
            feeAmount: String(request.tx.feeAmount),
            gas: String(request.tx.gas),
            memo: request.tx.memo,
          })
          break

        case 'msgDoFixedDeposit':
          send = msgDoFixedDeposit({
            amount: String(request.tx.amount),
            period: request.tx.period,
            feeAmount: String(request.tx.feeAmount),
            gas: String(request.tx.gas),
            memo: request.tx.memo,
          })
          break

        case 'msgDoFixedWithdraw':
          send = msgDoFixedWithdraw({
            id: request.tx.id,
            feeAmount: String(request.tx.feeAmount),
            gas: String(request.tx.gas),
            memo: request.tx.memo,
          })
          break

        default:
          send = Promise.reject('缺少msgType')
          break
      }
    } catch (error) {
      console.log('交易失败error:::::', error)
    }

    const notice = (res: any) => {
      console.log('res::::::', res)
      chrome.tabs.sendMessage(
        tab.id,
        {
          from: 'popup',
          value: 'sendTx',
          response: res,
        },
        async () => {}
      )
    }

    if (send) {
      send.then(notice).catch(notice)
    }

    // try {
    //   const res: any = await msgCreateDetegate({
    //     amount: String(request.tx.amount),
    //     feeAmount: String(request.tx.feeAmount),
    //     gas: String(request.tx.gas),
    //     memo: request.tx.memo,
    //   })

    //   chrome.tabs.sendMessage(
    //     tab.id,
    //     {
    //       from: 'popup',
    //       value: 'createSend',
    //       response: res,
    //     },
    //     async () => {}
    //   )
    // } catch (error) {
    //   console.log('交失败error:::::', error)
    // }

    sendResponse({ msg: '已发起交易' })
    return true
  }
})

export {}
