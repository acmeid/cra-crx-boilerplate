import { Client, registry, MissingWalletError } from 'srs-poa-client-ts'

import { Bonus } from "srs-poa-client-ts/srspoa.srvault/types"
import { FixedDeposit } from "srs-poa-client-ts/srspoa.srvault/types"
import { Kyc } from "srs-poa-client-ts/srspoa.srvault/types"
import { Params } from "srs-poa-client-ts/srspoa.srvault/types"
import { QueryGetDepositRequest } from "srs-poa-client-ts/srspoa.srvault/types"
import { RegionAnnualRate } from "srs-poa-client-ts/srspoa.srvault/types"
import { RegionVault } from "srs-poa-client-ts/srspoa.srvault/types"
import { VaultParams } from "srs-poa-client-ts/srspoa.srvault/types"


export { Bonus, FixedDeposit, Kyc, Params, QueryGetDepositRequest, RegionAnnualRate, RegionVault, VaultParams };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				Params: {},
				FixedDeposit: {},
				FixedDepositAll: {},
				RegionVault: {},
				RegionVaultAll: {},
				Kyc: {},
				KycAll: {},
				KycByRegion: {},
				FixedDepositByAcct: {},
				FixedDepositByRegion: {},
				
				_Structure: {
						Bonus: getStructure(Bonus.fromPartial({})),
						FixedDeposit: getStructure(FixedDeposit.fromPartial({})),
						Kyc: getStructure(Kyc.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						QueryGetDepositRequest: getStructure(QueryGetDepositRequest.fromPartial({})),
						RegionAnnualRate: getStructure(RegionAnnualRate.fromPartial({})),
						RegionVault: getStructure(RegionVault.fromPartial({})),
						VaultParams: getStructure(VaultParams.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getFixedDeposit: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.FixedDeposit[JSON.stringify(params)] ?? {}
		},
				getFixedDepositAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.FixedDepositAll[JSON.stringify(params)] ?? {}
		},
				getRegionVault: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RegionVault[JSON.stringify(params)] ?? {}
		},
				getRegionVaultAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RegionVaultAll[JSON.stringify(params)] ?? {}
		},
				getKyc: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Kyc[JSON.stringify(params)] ?? {}
		},
				getKycAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.KycAll[JSON.stringify(params)] ?? {}
		},
				getKycByRegion: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.KycByRegion[JSON.stringify(params)] ?? {}
		},
				getFixedDepositByAcct: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.FixedDepositByAcct[JSON.stringify(params)] ?? {}
		},
				getFixedDepositByRegion: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.FixedDepositByRegion[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: srspoa.srvault initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryFixedDeposit({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryFixedDeposit( key.id)).data
				
					
				commit('QUERY', { query: 'FixedDeposit', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryFixedDeposit', payload: { options: { all }, params: {...key},query }})
				return getters['getFixedDeposit']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryFixedDeposit API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryFixedDepositAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryFixedDepositAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SrspoaSrvault.query.queryFixedDepositAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'FixedDepositAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryFixedDepositAll', payload: { options: { all }, params: {...key},query }})
				return getters['getFixedDepositAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryFixedDepositAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRegionVault({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryRegionVault( key.regionId)).data
				
					
				commit('QUERY', { query: 'RegionVault', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRegionVault', payload: { options: { all }, params: {...key},query }})
				return getters['getRegionVault']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRegionVault API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRegionVaultAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryRegionVaultAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SrspoaSrvault.query.queryRegionVaultAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RegionVaultAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRegionVaultAll', payload: { options: { all }, params: {...key},query }})
				return getters['getRegionVaultAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRegionVaultAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryKyc({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryKyc( key.account)).data
				
					
				commit('QUERY', { query: 'Kyc', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryKyc', payload: { options: { all }, params: {...key},query }})
				return getters['getKyc']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryKyc API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryKycAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryKycAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SrspoaSrvault.query.queryKycAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'KycAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryKycAll', payload: { options: { all }, params: {...key},query }})
				return getters['getKycAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryKycAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryKycByRegion({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryKycByRegion( key.regionid, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SrspoaSrvault.query.queryKycByRegion( key.regionid, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'KycByRegion', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryKycByRegion', payload: { options: { all }, params: {...key},query }})
				return getters['getKycByRegion']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryKycByRegion API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryFixedDepositByAcct({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryFixedDepositByAcct( key.account, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SrspoaSrvault.query.queryFixedDepositByAcct( key.account, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'FixedDepositByAcct', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryFixedDepositByAcct', payload: { options: { all }, params: {...key},query }})
				return getters['getFixedDepositByAcct']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryFixedDepositByAcct API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryFixedDepositByRegion({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SrspoaSrvault.query.queryFixedDepositByRegion( key.regionid, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SrspoaSrvault.query.queryFixedDepositByRegion( key.regionid, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'FixedDepositByRegion', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryFixedDepositByRegion', payload: { options: { all }, params: {...key},query }})
				return getters['getFixedDepositByRegion']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryFixedDepositByRegion API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgNewKyc({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgNewKyc({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgNewKyc:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgNewKyc:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDoFixedDeposit({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgDoFixedDeposit({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDoFixedDeposit:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDoFixedDeposit:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetFixedDepositInterestRate({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgSetFixedDepositInterestRate({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetFixedDepositInterestRate:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetFixedDepositInterestRate:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDoFixedWithdraw({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgDoFixedWithdraw({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDoFixedWithdraw:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDoFixedWithdraw:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetRegionFeeRate({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgSetRegionFeeRate({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetRegionFeeRate:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetRegionFeeRate:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveKyc({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgRemoveKyc({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveKyc:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveKyc:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetKycMaxStaking({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgSetKycMaxStaking({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetKycMaxStaking:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetKycMaxStaking:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAgToAc({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SrspoaSrvault.tx.sendMsgAgToAc({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAgToAc:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAgToAc:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgNewKyc({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgNewKyc({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgNewKyc:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgNewKyc:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDoFixedDeposit({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgDoFixedDeposit({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDoFixedDeposit:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDoFixedDeposit:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetFixedDepositInterestRate({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgSetFixedDepositInterestRate({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetFixedDepositInterestRate:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetFixedDepositInterestRate:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDoFixedWithdraw({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgDoFixedWithdraw({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDoFixedWithdraw:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDoFixedWithdraw:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetRegionFeeRate({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgSetRegionFeeRate({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetRegionFeeRate:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetRegionFeeRate:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveKyc({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgRemoveKyc({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveKyc:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveKyc:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetKycMaxStaking({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgSetKycMaxStaking({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetKycMaxStaking:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetKycMaxStaking:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAgToAc({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SrspoaSrvault.tx.msgAgToAc({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAgToAc:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAgToAc:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
