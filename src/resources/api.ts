import ajax from './axios'

export const getBlocksByLatest = (config?: any): Promise<any> => {
  return ajax.get('/cosmos/base/tendermint/v1beta1/blocks/latest', config)
}

export const getBlocksByHeight = (height: any): Promise<any> => {
  return ajax.get(`/cosmos/base/tendermint/v1beta1/blocks/${height}`)
}

export const getTxsByHash = (hash: any): Promise<any> => {
  return ajax.get(`/cosmos/tx/v1beta1/txs/${hash}`)
}

export const getAllTx = (): Promise<any> => {
  return ajax.get(`//192.168.0.206:8080/srspoa/transactions`, {})
}

export const getValidatorByLatest = (): Promise<any> => {
  return ajax.get(`/cosmos/base/tendermint/v1beta1/validatorsets/latest`)
}

export const getValidatorByHeight = (height: any): Promise<any> => {
  return ajax.get(`/cosmos/base/tendermint/v1beta1/validatorsets/${height}`)
}

export const getTakingRegion = (): Promise<any> => {
  return ajax.get(`/srs-poa/srstaking/region`)
}

export const getTakingRegionById = (id: any): Promise<any> => {
  return ajax.get(`/srs-poa/srstaking/region/${id}`)
}

export const getRegionVaultById = (regionId: any): Promise<any> => {
  return ajax.get(`/srs-poa/srvault/region_vault/${regionId}`)
}

export const getBalanceByAddr = (address: any): Promise<any> => {
  return ajax.get(`/cosmos/bank/v1beta1/balances/${address}`)
}

export const getAccountByAddr = (address: any): Promise<any> => {
  return ajax.get(`/cosmos/auth/v1beta1/accounts/${address}`)
}

export const getAccount = (): Promise<any> => {
  return ajax.get(`/cosmos/auth/v1beta1/accounts`)
}

export const delegation = (): Promise<any> => {
  return ajax.get(`/srs-poa/srstaking/delegation`)
}