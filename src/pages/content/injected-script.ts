declare const window: any

const securityDomain = ['http://192.168.0.206/', 'http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002']
// const securityDomain = ['http://192.168.0.206/']

// function eventListen() {
//   // 监听请求授权消息
//   const securityDomain = ['http://192.168.0.206/', 'http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002']
//   // const securityDomain = ['http://192.168.0.206/']
//   window.addEventListener(
//     'message',
//     async (event: MessageEvent) => {
//       if (securityDomain.includes(event.origin) && event.data.form === 'content' && event.data.value === 'requestConnectConfirm') {
//         console.log('inejectedScript收到确认的信息')
//       }
//     },
//     false
//   )
//   window.addEventListener(
//     'message',
//     async (event: MessageEvent) => {
//       if (securityDomain.includes(event.origin) && event.data.form === 'content' && event.data.value === 'requestConnectConfirm') {
//         console.log('inejectedScript收到取消的信息')
//       }
//     },
//     false
//   )
// }

console.log('chrome:::', chrome.runtime)

function init() {
  const srs = {
    getKey: function () {
      // window.postMessgae('connect..............................', window.location.origin)
      console.log('getKey.................')
      // 发送连接的消息
      window.postMessage(
        {
          value: 'requestConnect',
          from: 'injectedScript',
        },
        window.location.origin
      )

      return new Promise((resolve, reject) => {
        // 监听请求授权消息
        window.addEventListener(
          'message',
          async (event: MessageEvent) => {
            if (securityDomain.includes(event.origin) && event.data.form === 'content' && event.data.value === 'requestConnectConfirm') {
              console.log('inejectedScript收到确认的信息')
              resolve({
                name: event.data.account.accountName,
                // address: '我是地址',
                algo: 'secp256k1',
                pubkey: event.data.account.pubkey,
                bech32Address: event.data.account.address,
              })
            }
          },
          false
        )
        window.addEventListener(
          'message',
          async (event: MessageEvent) => {
            if (securityDomain.includes(event.origin) && event.data.form === 'content' && event.data.value === 'requestConnectCancel') {
              console.log('inejectedScript收到取消的信息')
              reject('cancel connect')
            }
          },
          false
        )
      })
    },
    getOfflineSigner: async () => {
      return 1
    },
    disconnect: function () {
      console.log('inejectedScript收到断开连接的请求')
      return new Promise((resolve, reject) => {
        // 发送断开连接的消息
        window.postMessage(
          {
            value: 'requestDisconnect',
            from: 'injectedScript',
          },
          window.location.origin
        )

        window.addEventListener(
          'message',
          async (event: MessageEvent) => {
            if (securityDomain.includes(event.origin) && event.data.form === 'content' && event.data.value === 'disconnectConfirm') {
              console.log('inejectedScript收到成功断开连接的信息')
              resolve('断开连接')
            }
          },
          false
        )

        resolve('断开连接')
      })
    },
    sendTx: function (tx: any) {
      console.log('收到发起交易的消息')
      window.postMessage(
        {
          value: 'sendTx',
          from: 'injectedScript',
          tx,
        },
        window.location.origin
      )

      return new Promise((resolve, reject) => {
        window.addEventListener(
          'message',
          async (event: MessageEvent) => {
            if (securityDomain.includes(event.origin) && event.data.form === 'content' && event.data.value === 'sendTx') {
              console.log('inejectedScript收到交易结果', event.data)
              if (event.data.response?.tx_response) {
                resolve(event.data.response)
              } else {
                reject(event.data.response)
              }
            }
          },
          false
        )
      })
    },
    createSend: function (toAddress: string, amount: string, memo: string) {
      console.log('收到发起交易的消息')
      window.postMessage(
        {
          value: 'createSend',
          from: 'injectedScript',
          tx: {
            toAddress,
            amount,
            memo,
          },
        },
        window.location.origin
      )
      return new Promise((resolve, reject) => {
        window.addEventListener(
          'message',
          async (event: MessageEvent) => {
            if (securityDomain.includes(event.origin) && event.data.form === 'content' && event.data.value === 'createSend') {
              console.log('inejectedScript收到交易结果')
              resolve(event.data.response)
            }
          },
          false
        )
      })
    },
  }

  return srs
  // Object.defineProperty(srs, 'getKey', {
  //   value: async function () {},
  // })
}

// eventListen()
window.srs = init()
export {}
