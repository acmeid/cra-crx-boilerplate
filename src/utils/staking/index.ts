// const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
//   if (!wallet) throw MissingWalletError;
//   let client;
//   if (addr) {
//     client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
//   }else{
//     client = await SigningStargateClient.offline( wallet, { registry });
//   }
//   const { address } = (await wallet.getAccounts())[0];

//   return {
//     signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
//     msgBeginRedelegate: (data: MsgBeginRedelegate): EncodeObject => ({ typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate", value: MsgBeginRedelegate.fromPartial( data ) }),
//     msgUndelegate: (data: MsgUndelegate): EncodeObject => ({ typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate", value: MsgUndelegate.fromPartial( data ) }),
//     msgCreateValidator: (data: MsgCreateValidator): EncodeObject => ({ typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator", value: MsgCreateValidator.fromPartial( data ) }),
//     msgDelegate: (data: MsgDelegate): EncodeObject => ({ typeUrl: "/cosmos.staking.v1beta1.MsgDelegate", value: MsgDelegate.fromPartial( data ) }),
//     msgEditValidator: (data: MsgEditValidator): EncodeObject => ({ typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator", value: MsgEditValidator.fromPartial( data ) }),

//   };
// };

// @ts-nocheck
import { txClient } from '@/store/generated/srs-poa/srspoa.srstaking/module'
import { getAccount } from '../'
import {
  Keplr,
  OfflineDirectSigner,
  OfflineAminoSigner,
  AccountData,
  AminoSignResponse,
  StdSignDoc,
  DirectSignResponse,
  SignDoc,
} from '@keplr-wallet/types'
import deepmerge from 'deepmerge'
import Long from 'long'
import { RequestSignDirectMsg } from './msgs'
import { InExtensionMessageRequester } from '@keplr-wallet/router-extension'

export class CosmJSOfflineSignerOnlyAmino {
  constructor(protected readonly chainId: string, protected readonly keplr: Keplr) {}

  async getAccounts(): Promise<AccountData[]> {
    // const key = await this.keplr.getKey(this.chainId)

    const res = await getAccount()

    return [
      {
        // address: key.bech32Address,
        // Currently, only secp256k1 is supported.
        algo: 'secp256k1',
        // pubkey: key.pubKey,
        address: res.address,
        pubkey: res.pubKey,
      },
    ]
  }

  async signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
    if (this.chainId !== signDoc.chain_id) {
      throw new Error('Unmatched chain id with the offline signer')
    }

    // const key = await this.keplr.getKey(signDoc.chain_id)

    // if (key.bech32Address !== signerAddress) {
    //   throw new Error('Unknown signer address')
    // }

    return await this.keplr.signAmino(this.chainId, signerAddress, signDoc)
  }

  // Fallback function for the legacy cosmjs implementation before the staragte.
  async sign(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
    return await this.signAmino(signerAddress, signDoc)
  }
}

export class CosmJSOfflineSigner extends CosmJSOfflineSignerOnlyAmino {
  constructor(protected readonly chainId: string, protected readonly keplr: Keplr) {
    super(chainId, keplr)
  }

  async signDirect(signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    // if (this.chainId !== signDoc.chainId) {
    //   throw new Error('Unmatched chain id with the offline signer')
    // }

    // const key = await this.keplr.getKey(signDoc.chainId)

    // if (key.bech32Address !== signerAddress) {
    //   throw new Error('Unknown signer address')
    // }

    return await this.keplr.signDirect(this.chainId, signerAddress, signDoc)
  }
}

export class Srs {
  protected enigmaUtils: Map<string, SecretUtils> = new Map()

  public defaultOptions: KeplrIntereactionOptions = {}

  constructor(public readonly version?: string, public readonly mode?: KeplrMode, protected readonly requester?: MessageRequester) {}

  // async getKey(chainId: string): Promise<Key> {
  //   const msg = new GetKeyMsg(chainId)
  //   return await this.requester.sendMessage(BACKGROUND_PORT, msg)
  // }

  async signDirect(
    chainId: string,
    signer: string,
    signDoc: {
      bodyBytes?: Uint8Array | null
      authInfoBytes?: Uint8Array | null
      chainId?: string | null
      accountNumber?: Long | null
    },
    signOptions: KeplrSignOptions = {}
  ): Promise<DirectSignResponse> {
    console.log('chainId::', chainId)
    console.log('signer::', signer)
    console.log('signDoc::', signDoc)
    const msg = new RequestSignDirectMsg(
      chainId,
      signer,
      {
        bodyBytes: signDoc.bodyBytes,
        authInfoBytes: signDoc.authInfoBytes,
        chainId: signDoc.chainId,
        accountNumber: signDoc.accountNumber ? signDoc.accountNumber.toString() : null,
      },
      deepmerge(this.defaultOptions.sign ?? {}, signOptions)
    )
    const response = await this.requester.sendMessage(BACKGROUND_PORT, msg)

    return {
      signed: {
        bodyBytes: response.signed.bodyBytes,
        authInfoBytes: response.signed.authInfoBytes,
        chainId: response.signed.chainId,
        accountNumber: Long.fromString(response.signed.accountNumber),
      },
      signature: response.signature,
    }
  }

  getOfflineSigner(chainId: string): OfflineAminoSigner & OfflineDirectSigner {
    return new CosmJSOfflineSigner(chainId, this)
  }
}

// const wallet = {
//   getAccounts: async () => {
//     const res = await getAccount()
//     return [res]
//   },
//   signDirect: () => {},
// }

export const createDetegate = async (data?: any) => {
  console.log('createDetegate---------------------------------------------------')
  console.log('txClient:::::', txClient)
  // eslint-disable-next-line no-debugger

  const wallet = new Srs('1.0', 'core', new InExtensionMessageRequester()).getOfflineSigner('srspoa')

  console.log('wallet:::::', wallet)

  // console.log('wallet2:::::', wallet.getAccounts())
  // console.log('wallet3:::::', wallet.signDirect())

  try {
    const client = await txClient(wallet, { addr: 'http://192.168.0.206:1317' })
  } catch (error) {
    console.log('error::::::', error)
  }

  // console.log('client:::', client)

  // const value = {
  //   // creator: address,
  //   // delegatorAddress: address,
  //   belongRegion: 'huabei-01',
  //   amount: { denom: 'src', amount: '100000000' },
  // }

  // const msg = await client.msgCreateDelegate(value)
  // const fee = [
  //   {
  //     amount: [{ denom: 'src', amount: '100000000' }],
  //     denom: 'src',
  //   },
  // ]
  // const memo = ''

  // const result = await client.signAndBroadcast([msg], { fee: { amount: fee, gas: '200000' }, memo })
  console.log('createDetegate---------------------------------------------------')
  // return result
}
