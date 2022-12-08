import { reject } from 'lodash-es'
import { resolve } from 'path'
import { SRS } from './cosmos'
import message from './cosmos/messages/proto'
// import * as bech32 from 'bech32'
// import * as bip32 from 'bip32'
// import * as bip39 from 'bip39'
// import Buffer from 'buffer'

// function uint8ArrayTo16(uint8Array: any): any[] {
//   return Array.prototype.map.call(uint8Array, (x) => ('00' + x.toString(16)).slice(-2))
// }

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
  remove: function (key: string) {
    localStorage.removeItem(key)
  },
  clear: function () {
    localStorage.clear()
  },
}

console.log('chrome?.storage?.local', chrome?.storage?.local)

export const storage = chrome?.storage?.local || customStorage

export const getAccount = () => {
  return new Promise((resolve, reject) => {
    storage.get(['currentAccount'], ({ currentAccount }: any) => {
      if (!currentAccount) {
        resolve({})
      }
      console.log('currentAccount:::::::', currentAccount)
      try {
        const privKey = SRS.getECPairPriv(currentAccount.mnemonic)
        const pubKeyAny = SRS.getPubKeyAny(privKey)

        console.log('privKey::', privKey)
        console.log('pubKeyAny::', pubKeyAny)

        const data = {
          ...currentAccount,
          privKey,
          pubKeyAny,
        }
        resolve(data)
      } catch (error) {
        resolve({})
      }
    })
  })
}

export const setAccount = (data: any) => {
  return new Promise((resolve, reject) => {
    getAccount().then((res: any) => {
      const account = {
        ...res,
        ...data,
      }

      storage.set({ currentAccount: account }, () => {
        resolve('success')
      })
    })
  })
}

export const getAccountList = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    storage.get(['accountList'], ({ accountList }) => {
      const list = accountList.map((item: any) => {
        const privKey = SRS.getECPairPriv(item.mnemonic)
        const pubKeyAny = SRS.getPubKeyAny(privKey)

        return {
          ...item,
          privKey,
          pubKeyAny,
        }
      })
      resolve(list)
    })
  })
}
// mnemonic: string
export const addAccount = async (mnemonic: string) => {
  mnemonic =
    'reduce submit lawsuit always upgrade sad main dance balance whip vanish act fame coyote artwork robust subject avocado napkin abstract bulb garment gorilla move'

  const address = SRS.getAddress(mnemonic)
  const privKey = SRS.getECPairPriv(mnemonic)
  const pubKeyAny = SRS.getPubKeyAny(privKey)

  console.log('addAccount privKey', privKey)
  console.log('addAccount pubKeyAny', pubKeyAny)

  const { pw } = await storage.get(['pw'])

  const account = {
    address,
    mnemonic,
    mnemonicArr: mnemonic.split(' '),
    pw,
    accountName: 'Account',
  }

  console.log('account::', account)

  return new Promise((resolve, reject) => {
    storage.get(['accountList'], async ({ accountList }) => {
      accountList = accountList || []
      accountList.push(account)

      await storage.set({ accountList: accountList })
      console.log('accountList.length::', accountList.length)

      await storage.set({
        currentAccount: {
          ...account,
          isActive: true,
        },
      })
      console.log(123)
      getAccount().then((res) => console.log('res:::', res))
      resolve('success')
    })
  })
}

export const removeAccount = async (address?: string) => {
  storage.remove('currentAccount')

  const accountList: any = await getAccountList()
  const index = accountList.findIndex((item: any) => item.isActive)

  accountList.splice(index, 1)
  storage.set({ accountList: accountList })

  return accountList
}

interface params {
  toAddress: string
  amount: number | string
}
export const createSend = async ({ toAddress, amount }: params) => {
  const { address, pubKeyAny, privKey }: any = await getAccount()

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
