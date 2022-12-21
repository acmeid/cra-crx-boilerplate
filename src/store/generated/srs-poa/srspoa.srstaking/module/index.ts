// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgDelegate } from "./types/srstaking/tx";
import { MsgWithdraw } from "./types/srstaking/tx";
import { MsgExitDelegate } from "./types/srstaking/tx";
import { MsgUndelegate } from "./types/srstaking/tx";
import { MsgCreateRegion } from "./types/srstaking/tx";
import { MsgKickValidatorByAddress } from "./types/srstaking/tx";
import { MsgKickValidatorByPubkey } from "./types/srstaking/tx";
import { MsgCreateValidator } from "./types/srstaking/tx";
import { MsgUpdateValidator } from "./types/srstaking/tx";
import { MsgCreateDelegate } from "./types/srstaking/tx";
import { MsgUpdateRegion } from "./types/srstaking/tx";
import { MsgDeleteRegion } from "./types/srstaking/tx";


const types = [
  ["/srspoa.srstaking.MsgDelegate", MsgDelegate],
  ["/srspoa.srstaking.MsgWithdraw", MsgWithdraw],
  ["/srspoa.srstaking.MsgExitDelegate", MsgExitDelegate],
  ["/srspoa.srstaking.MsgUndelegate", MsgUndelegate],
  ["/srspoa.srstaking.MsgCreateRegion", MsgCreateRegion],
  ["/srspoa.srstaking.MsgKickValidatorByAddress", MsgKickValidatorByAddress],
  ["/srspoa.srstaking.MsgKickValidatorByPubkey", MsgKickValidatorByPubkey],
  ["/srspoa.srstaking.MsgCreateValidator", MsgCreateValidator],
  ["/srspoa.srstaking.MsgUpdateValidator", MsgUpdateValidator],
  ["/srspoa.srstaking.MsgCreateDelegate", MsgCreateDelegate],
  ["/srspoa.srstaking.MsgUpdateRegion", MsgUpdateRegion],
  ["/srspoa.srstaking.MsgDeleteRegion", MsgDeleteRegion],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client: any;
  if (addr) {
    try {
      console.log('addr:::', addr)
      console.log('wallet:::', wallet)
      console.log('registry:::', registry)
      client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    } catch (error) {
      console.log('SigningStargateClient.connectWithSigner:', error)
    }
    
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgDelegate: (data: MsgDelegate): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgDelegate", value: MsgDelegate.fromPartial( data ) }),
    msgWithdraw: (data: MsgWithdraw): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgWithdraw", value: MsgWithdraw.fromPartial( data ) }),
    msgExitDelegate: (data: MsgExitDelegate): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgExitDelegate", value: MsgExitDelegate.fromPartial( data ) }),
    msgUndelegate: (data: MsgUndelegate): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgUndelegate", value: MsgUndelegate.fromPartial( data ) }),
    msgCreateRegion: (data: MsgCreateRegion): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgCreateRegion", value: MsgCreateRegion.fromPartial( data ) }),
    msgKickValidatorByAddress: (data: MsgKickValidatorByAddress): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgKickValidatorByAddress", value: MsgKickValidatorByAddress.fromPartial( data ) }),
    msgKickValidatorByPubkey: (data: MsgKickValidatorByPubkey): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgKickValidatorByPubkey", value: MsgKickValidatorByPubkey.fromPartial( data ) }),
    msgCreateValidator: (data: MsgCreateValidator): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgCreateValidator", value: MsgCreateValidator.fromPartial( data ) }),
    msgUpdateValidator: (data: MsgUpdateValidator): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgUpdateValidator", value: MsgUpdateValidator.fromPartial( data ) }),
    msgCreateDelegate: (data: MsgCreateDelegate): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgCreateDelegate", value: MsgCreateDelegate.fromPartial( data ) }),
    msgUpdateRegion: (data: MsgUpdateRegion): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgUpdateRegion", value: MsgUpdateRegion.fromPartial( data ) }),
    msgDeleteRegion: (data: MsgDeleteRegion): EncodeObject => ({ typeUrl: "/srspoa.srstaking.MsgDeleteRegion", value: MsgDeleteRegion.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
