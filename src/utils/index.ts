import { reject } from 'lodash-es'
import { resolve } from 'path'
import { SRS } from './cosmos'
import message from './cosmos/messages/proto'
import { toString } from 'uint8arrays/to-string'
import { fromString } from 'uint8arrays/from-string'
import { delegationByAddress, getAccountByAddr, getBalanceByAddr, getKyc, getRegionVaultById } from '@/resources/api'

interface acount {
  address: string
  mnemonic: string
  mnemonicArr: number[]
  pw: string
  accountName: string
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
  remove: function (key: string) {
    localStorage.removeItem(key)
  },
  clear: function () {
    localStorage.clear()
  },
}

console.log('chrome?.storage?.local', chrome?.storage?.local)

export const storage = chrome?.storage?.local || customStorage

export const getAccount = (): Promise<acount> => {
  return new Promise((resolve, reject) => {
    storage.get(['currentAccount'], ({ currentAccount }: any) => {
      const account = {
        address: '',
        mnemonic: '',
        mnemonicArr: [],
        pw: '',
        accountName: '',
      }
      if (!currentAccount) {
        resolve(account)
        return
      }
      console.log('currentAccount:::::::', currentAccount)
      try {
        let privKey
        if (currentAccount.priv) {
          privKey = Buffer.from(fromString(currentAccount.priv.slice(2), 'base16'))
        } else {
          privKey = SRS.getECPairPriv(currentAccount?.mnemonic) || new Uint8Array()
        }
        const pubKeyAny = SRS.getPubKeyAny(privKey)

        console.log('privKey::', privKey)
        console.log('pubKeyAny::', pubKeyAny)

        const data = {
          ...currentAccount,
          privKey,
          pubKeyAny,
          privKeyString: '0x' + toString(privKey, 'base16'),
          pubKeyAnyString: '0x' + toString(pubKeyAny.value, 'base16'),
        }
        resolve(data)
      } catch (error) {
        console.error('getAccount:', error)
        resolve(account)
      }
    })
  })
}

export const getPw = async (): Promise<any> => {
  const { pw } = await storage.get(['pw'])
  return pw
}

export const setPw = async (pw: string): Promise<any> => {
  await storage.set({ pw: pw })
  return 'success'
}

export const resetAccount = async (): Promise<any> => {
  await storage.remove('currentAccount')
  await storage.remove('accountList')
  await storage.remove('pw')
  return 'success'
}

export const setAccount = async (data: any) => {
  const currentAccount = await getAccount()
  const account = {
    ...currentAccount,
    ...data,
  }

  await storage.set({ currentAccount: account })
  let accountList = await getAccountList()
  accountList = accountList.map((item: any) => {
    if (item.address === account.address) {
      return account
    } else if (account.isActive) {
      return {
        ...item,
        isActive: false,
      }
    } else {
      return item
    }
  })
  await storage.set({ currentAccount: account })
  await storage.set({ accountList: accountList })

  return 'success'
}

// export const switchAccount = async () => {

// }

export const getAccountList = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    storage.get(['accountList'], ({ accountList }) => {
      const list = accountList.map((item: any) => {
        let privKey
        if (item.priv) {
          privKey = Buffer.from(fromString(item.priv.slice(2), 'base16'))
        } else {
          privKey = SRS.getECPairPriv(item?.mnemonic) || new Uint8Array()
        }
        // const privKey = SRS.getECPairPriv(item.mnemonic)
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
export const addAccount = async ({ mnemonic, priv }: any) => {
  // mnemonic =
  //   'reduce submit lawsuit always upgrade sad main dance balance whip vanish act fame coyote artwork robust subject avocado napkin abstract bulb garment gorilla move'
  try {
    let address = ''
    let privKey
    if (priv) {
      privKey = Buffer.from(fromString(priv.slice(2), 'base16'))
    } else {
      address = SRS.getAddress(mnemonic)
      privKey = SRS.getECPairPriv(mnemonic)
    }

    console.log('privKey:::', privKey)

    const pubKeyAny = SRS.getPubKeyAny(privKey)

    console.log('addAccount privKey', privKey)
    console.log('addAccount pubKeyAny', pubKeyAny)

    const { pw } = await storage.get(['pw'])

    const account = {
      address,
      mnemonic,
      mnemonicArr: mnemonic ? mnemonic.split(' ') : [],
      pw,
      accountName: 'Account',
      isActive: true,
      priv: priv,
    }

    console.log('account::', account)

    return new Promise((resolve, reject) => {
      storage.get(['accountList'], async ({ accountList }) => {
        accountList = accountList || []

        if (!accountList.find((item: any) => item.address === address)) {
          accountList.forEach((item: any) => (item.isActive = false))
          accountList.push(account)

          await storage.set({ accountList: accountList })
        }

        console.log('accountList.length::', accountList.length)

        await storage.set({
          currentAccount: {
            ...account,
          },
        })
        console.log(123)
        getAccount().then((res) => console.log('res:::', res))
        resolve('success')
      })
    })
  } catch (error) {
    console.log('addAccount: ', error)
    return Promise.reject(error)
  }
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
  memo?: string
}
export const createSend = async ({ toAddress, amount, memo }: params) => {
  console.log('createSend')
  const { address, pubKeyAny, privKey }: any = await getAccount()

  const data: any = await SRS.getAccounts(address)
  console.log('res123', data)
  // const data = res?.body
  // const { data }: any = await getAccountByAddr(address)

  console.log('createSend222222')

  // signDoc = (1)txBody + (2)authInfo
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
  const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo })

  // --------------------------------- (2)authInfo ---------------------------------
  const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
    public_key: pubKeyAny,
    mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
    sequence: data?.account?.sequence,
  })

  const feeValue = new message.cosmos.tx.v1beta1.Fee({
    amount: [{ denom: 'src', amount: String(amount) }],
    gas_limit: 200000,
  })

  const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue })

  // -------------------------------- sign --------------------------------
  // console.log('txBody:::', txBody)
  // console.log('authInfo:::', authInfo)
  // console.log('account_number:::', data.account?.account_number)
  // console.log('privKey:::', privKey)

  const signedTxBytes = SRS.sign(txBody, authInfo, data.account?.account_number, privKey)

  // console.log('signedTxBytes:::::', signedTxBytes)

  const res2: any = await SRS.broadcast(signedTxBytes)
  console.log('createSend::', res2)
  return res2
}
