import { SRS } from './cosmos'

export const getUser = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['currentUser'], ({ currentUser }) => {
      if (!currentUser) {
        resolve('')
      }
      const data = {
        ...currentUser,
        privKey: new Uint8Array(currentUser.privKey),
        pubKeyAny: {
          ...currentUser.pubKeyAny,
          value: new Uint8Array(currentUser.pubKeyAny.value),
        },
      }
      resolve(data)
    })
  })
}

export const getUserList = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['userList'], ({ userList }) => {
      const list = userList.map((item: any) => {
        return {
          ...item,
          privKey: new Uint8Array(item.privKey),
          pubKeyAny: {
            ...item.pubKeyAny,
            value: new Uint8Array(item.pubKeyAny.value),
          },
        }
      })
      resolve(list)
    })
  })
}

export const addUser = (mnemonic: string) => {
  const address = SRS.getAddress(mnemonic)
  const privKey = SRS.getECPairPriv(mnemonic)
  const pubKeyAny = SRS.getPubKeyAny(privKey)

  const user = {
    address,
    mnemonic: mnemonic,
    privKey: Array.from(privKey),
    pubKeyAny: {
      ...pubKeyAny,
      value: Array.from(pubKeyAny.value),
    },
  }

  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['userList'], ({ userList }) => {
      userList = userList || []
      userList.push(user)

      chrome.storage.local.set({
        userList: userList,
      })

      if (userList.length === 1) {
        chrome.storage.local.set({
          currentUser: user,
        })
      }

      resolve('success')
    })
  })
}
