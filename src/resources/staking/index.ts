// @ts-nocheck
import { txClient } from '@/store/generated/srs-poa/srspoa.srstaking/module'
import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet, Registry } from '@cosmjs/proto-signing'
import { getAccount } from '../account'
import { prefix, addr, denom } from '@/resources/constants'

// 获取钱包
const getWallet = async () => {
  // const mnemonic = 'champion session feature cry pretty middle hamster dinner snap grunt glass hire rent notable spoon bachelor gorilla fire salt dice riot brisk hair flag'
  const account: any = await getAccount()
  if (account.mnemonic) {
    return DirectSecp256k1HdWallet.fromMnemonic(account.mnemonic, { prefix })
  } else if (account.privKey) {
    return DirectSecp256k1Wallet.fromKey(account.privKey, prefix)
  } else {
    throw new Error('The account has no mnemonics and no private key')
  }
}

// 创建质押
export const msgCreateDelegate = async ({ amount, feeAmount, regionID, gas, memo }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    creator: account.address, // 'sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0',
    // delegatorAddress: account.address,
    // belongRegion: regionID,
    'region-id': regionID,
    amount: { denom, amount },
  }

  const msg = await client.msgCreateDelegate(value)
  delete msg.value.delegatorAddress
  delete msg.value.belongRegion
  console.log('msg:::', msg)

  const fee = {
    amount: [
      {
        denom,
        amount: feeAmount,
      },
    ],
    gas,
  }
  console.log('fee:::::', fee)
  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}

// 退回质押
export const msgExitDelegate = async ({ amount, feeAmount, gas, memo }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    creator: account.address, // 'sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0',-
    // delegatorAddress: string;
  }

  const msg = await client.msgExitDelegate(value)
  console.log('msg:::', msg)

  const fee = {
    amount: [
      {
        denom,
        amount: feeAmount,
      },
    ],
    gas,
  }

  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}

// 添加质押
export const msgDetegate = async ({ amount, feeAmount, gas, memo }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    creator: account.address,
    //'sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0',
    amount: { denom, amount },
  }

  const msg = await client.msgDelegate(value)
  console.log('msg:::', msg)

  const fee = {
    amount: [
      {
        denom,
        amount: feeAmount,
      },
    ],
    gas,
  }
  console.log('fee:::::', fee)
  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}

// 减少质押
export const msgUndelegate = async ({ amount, feeAmount, gas, memo }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    creator: account.address, // 'sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0',
    amount: { denom, amount },
  }

  const msg = await client.msgUndelegate(value)
  console.log('msg:::', msg)

  const fee = {
    amount: [
      {
        denom,
        amount: feeAmount,
      },
    ],
    gas,
  }

  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}

// 提取赠送src的收益
export const msgWithdraw = async ({ amount, feeAmount, gas, memo }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    creator: account.address, // 'sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0',-
  }

  const msg = await client.msgWithdraw(value)
  console.log('msg:::', msg)

  const fee = {
    amount: [
      {
        denom,
        amount: feeAmount,
      },
    ],
    gas,
  }

  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}
