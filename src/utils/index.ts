import { SRS } from './cosmos'
import message from './cosmos/messages/proto'
// import * as bech32 from 'bech32'
// import * as bip32 from 'bip32'
// import * as bip39 from 'bip39'
// import Buffer from 'buffer'

function uint8ArrayTo16(uint8Array: any): any[] {
  return Array.prototype.map.call(uint8Array, (x) => ('00' + x.toString(16)).slice(-2))
}

const customStorage = {
  get: function (keys: string[], callback: (v: any) => void) {
    const values: any = {}
    try {
      keys.forEach((item: string) => {
        const _temp = localStorage.getItem(item)
        values[item] = _temp ? JSON.parse(_temp) : undefined
      })

      if (typeof callback === 'function') {
        callback(values)
      }

      return Promise.resolve(values)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  set: function (data: any, callback: (v: any) => void) {
    try {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const item = data[key]
          localStorage.setItem(key, JSON.stringify(item))
        }
      }

      if (typeof callback === 'function') {
        callback(data)
      }

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

export const storage = chrome?.storage?.local || customStorage

export const getUser = () => {
  return new Promise((resolve, reject) => {
    storage.get(['currentUser'], ({ currentUser }: any) => {
      if (!currentUser) {
        resolve({})
      }

      const privKey = SRS.getECPairPriv(currentUser.mnemonic)
      const pubKeyAny = SRS.getPubKeyAny(privKey)

      const data = {
        ...currentUser,
        privKey,
        pubKeyAny,
      }
      resolve(data)
    })
  })
}

export const getUserList = () => {
  return new Promise((resolve, reject) => {
    storage.get(['userList'], ({ userList }) => {
      const list = userList.map((item: any) => {
        return {
          ...item,
          privKey: new Uint8Array(item.privKey).buffer,
          pubKeyAny: {
            ...item.pubKeyAny,
            value: new Uint8Array(item.pubKeyAny.value).buffer,
          },
        }
      })
      resolve(list)
    })
  })
}
// mnemonic: string
export const addUser = (mnemonic: string) => {
  mnemonic =
    'reduce submit lawsuit always upgrade sad main dance balance whip vanish act fame coyote artwork robust subject avocado napkin abstract bulb garment gorilla move'

  const address = SRS.getAddress(mnemonic)
  const privKey = SRS.getECPairPriv(mnemonic)
  const pubKeyAny = SRS.getPubKeyAny(privKey)

  console.log('addUser privKey', privKey)
  console.log('addUser pubKeyAny', pubKeyAny)

  const user = {
    address,
    mnemonic: mnemonic,
  }

  return new Promise((resolve, reject) => {
    storage.get(['userList'], ({ userList }) => {
      userList = userList || []
      userList.push(user)

      storage.set({
        userList: userList,
      })

      if (userList.length === 1) {
        storage.set({
          currentUser: user,
        })
      }

      resolve('success')
    })
  })
}

interface params {
  toAddress: string
  amount: number | string
}
export const createSend = async ({ toAddress, amount }: params) => {
  const { address, pubKeyAny, privKey }: any = await getUser()

  SRS.getAccounts(address).then((data: any) => {
    // signDoc = (1)txBody + (2)authInfo
    data = data.data
    // ---------------------------------- (1)txBody ----------------------------------
    const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
      from_address: address,
      // to_address: 'sil1r5twfuu28pqxqy6gpl0ukqzxnnhhv50cv6aukd',
      to_address: toAddress || 'sil1r5twfuu28pqxqy6gpl0ukqzxnnhhv50cv6aukd',
      amount: [{ denom: 'src', amount: String(amount) }], // 6 decimal places (1000000 uatom = 1 ATOM)
    })

    const msgSendAny = new message.google.protobuf.Any({
      type_url: '/cosmos.bank.v1beta1.MsgSend',
      // value: uint8ArrayTo16(message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()),
      value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish(),
    })

    // const txBody = uint8ArrayTo16(new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: '留言测试' }))
    const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: '留言测试' })

    // --------------------------------- (2)authInfo ---------------------------------
    const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
      public_key: pubKeyAny,
      mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
      sequence: data?.account?.sequence,
    })

    const feeValue = new message.cosmos.tx.v1beta1.Fee({
      amount: [{ denom: 'src', amount: String(5) }],
      gas_limit: 200000,
    })

    const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue })

    // -------------------------------- sign --------------------------------
    // console.log('data:::', data)

    // console.log('txBody:::', txBody)
    // console.log('authInfo:::', authInfo)
    // console.log('account_number:::', data.account?.account_number)
    // console.log('privKey:::', privKey)

    const signedTxBytes = SRS.sign(txBody, authInfo, data.account?.account_number, privKey)

    // console.log('signedTxBytes:::::', signedTxBytes)

    SRS.broadcast(signedTxBytes).then((response: any) => console.log('response::::', response))
  })
}
