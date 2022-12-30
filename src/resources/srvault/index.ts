// @ts-nocheck
import { txClient } from '@/store/generated/srs-poa/srspoa.srvault/module'
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

// 兑换
export const msgAgToAc = async ({ amount, feeAmount, gas, memo }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    account: account.address,
    agAmount: amount,
  }

  const msg = await client.msgAgToAc(value)
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
  console.log('fee:::', fee)
  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}

// 定期存款
export const msgDoFixedDeposit = async ({ amount, feeAmount, gas, memo, period }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    account: account.address,
    denom,
    amount,
    period,
  }

  const msg = await client.msgDoFixedDeposit(value)
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
  console.log('fee:::', fee)
  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}

// 定期赎回
export const msgDoFixedWithdraw = async ({ amount, feeAmount, gas, id, memo }?: any) => {
  const wallet = await getWallet()

  console.log('wallet:::::', wallet)
  const [account] = await wallet.getAccounts()
  console.log('wallet.getAccounts::', account)

  const client = await txClient(wallet, { addr })
  console.log('client:::', client)

  const value = {
    account: account.address,
    id,
  }

  const msg = await client.msgDoFixedWithdraw(value)
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
  console.log('fee:::', fee)
  const result = await client.signAndBroadcast([msg], { fee, memo })
  console.log('result:::::::', result)
  return result
}
