// @ts-nocheck
import { txClient } from '@/store/generated/srs-poa/srspoa.srstaking/module'
import { DirectSecp256k1HdWallet, Registry } from '@cosmjs/proto-signing'
import { getAccount } from '../account'
import { prefix, addr, denom } from '@/resources/constants'

// 获取钱包
const getWallet = async () => {
  // const mnemonic = 'champion session feature cry pretty middle hamster dinner snap grunt glass hire rent notable spoon bachelor gorilla fire salt dice riot brisk hair flag'
  const account: any = await getAccount()
  if (account.mnemonic) {
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(account.mnemonic, { prefix })
    return wallet
  } else {
    throw new Error('通过私钥导入的账户没有mnemonic')
  }
}

// 添加质押
export const msgDetegate = async (data?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  wallet.getAccounts().then((res) => console.log('res::', res))

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    creator: 'sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0',
    // belongRegion: 'huabei-01',
    amount: { denom, amount: '300000000' },
  }

  const msg = await client.msgDelegate(value)
  console.log('msg:::', msg)

  const fee = {
    amount: [
      {
        denom,
        amount: '100000000',
      },
    ],
    gas: '200000',
  }

  const memo = ''

  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}

// 创建质押
export const msgCreateDetegate = async (data?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  wallet.getAccounts().then((res) => console.log('wallet.getAccounts::', res))

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    creator: 'sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0',
    belongRegion: 'huabei-01',
    amount: { denom, amount: '300000000' },
  }

  const msg = await client.msgDelegate(value)
  console.log('msg:::', msg)

  const fee = {
    amount: [
      {
        denom,
        amount: '100000000',
      },
    ],
    gas: '200000',
  }

  const memo = ''

  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}
