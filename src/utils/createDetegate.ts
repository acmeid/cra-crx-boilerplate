// @ts-nocheck
import { reject } from 'lodash-es'
import { resolve } from 'path'
import { SRS } from './cosmos'
import message from './cosmos/messages/proto'
import { toString } from 'uint8arrays/to-string'
import { fromString } from 'uint8arrays/from-string'
// import { MsgCreateDelegate, MsgClientImpl } from '@/store/generated/srs-poa/srspoa.srstaking/module/types/srstaking/tx'

// import store from '@/store'
// import { useStore } from 'vuex'
// import { createApp } from 'vue'
// const app = createApp({})
// app.use(store)

// console.log('app::::::', app)

export const createDetegate = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const r = useStore()
  // console.log(r)
}

// async function initTxClient(vuexGetters) {
//   return await txClient(vuexGetters['common/wallet/signer'], {
//     addr: vuexGetters['common/env/apiTendermint'],
//   })
// }
// export const createDetegate = () => {
//   try {
//     const txClient = await initTxClient(rootGetters)
//     const msg = await txClient.msgCreateDelegate(value)
//     const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee, gas: '200000' }, memo })
//     return result
//   } catch (e) {
//     if (e == MissingWalletError) {
//       throw new Error('TxClient:MsgCreateDelegate:Init Could not initialize signing client. Wallet is required.')
//     } else {
//       throw new Error('TxClient:MsgCreateDelegate:Send Could not broadcast Tx: ' + e.message)
//     }
//   }
// }
