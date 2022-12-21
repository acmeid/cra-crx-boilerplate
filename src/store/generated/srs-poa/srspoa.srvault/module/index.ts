// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgSetFixedDepositInterestRate } from "./types/srvault/tx";
import { MsgSetKycMaxStaking } from "./types/srvault/tx";
import { MsgSetRegionFeeRate } from "./types/srvault/tx";
import { MsgRemoveKyc } from "./types/srvault/tx";
import { MsgAgToAc } from "./types/srvault/tx";
import { MsgDoFixedDeposit } from "./types/srvault/tx";
import { MsgDoFixedWithdraw } from "./types/srvault/tx";
import { MsgNewKyc } from "./types/srvault/tx";


const types = [
  ["/srspoa.srvault.MsgSetFixedDepositInterestRate", MsgSetFixedDepositInterestRate],
  ["/srspoa.srvault.MsgSetKycMaxStaking", MsgSetKycMaxStaking],
  ["/srspoa.srvault.MsgSetRegionFeeRate", MsgSetRegionFeeRate],
  ["/srspoa.srvault.MsgRemoveKyc", MsgRemoveKyc],
  ["/srspoa.srvault.MsgAgToAc", MsgAgToAc],
  ["/srspoa.srvault.MsgDoFixedDeposit", MsgDoFixedDeposit],
  ["/srspoa.srvault.MsgDoFixedWithdraw", MsgDoFixedWithdraw],
  ["/srspoa.srvault.MsgNewKyc", MsgNewKyc],
  
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
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgSetFixedDepositInterestRate: (data: MsgSetFixedDepositInterestRate): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgSetFixedDepositInterestRate", value: MsgSetFixedDepositInterestRate.fromPartial( data ) }),
    msgSetKycMaxStaking: (data: MsgSetKycMaxStaking): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgSetKycMaxStaking", value: MsgSetKycMaxStaking.fromPartial( data ) }),
    msgSetRegionFeeRate: (data: MsgSetRegionFeeRate): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgSetRegionFeeRate", value: MsgSetRegionFeeRate.fromPartial( data ) }),
    msgRemoveKyc: (data: MsgRemoveKyc): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgRemoveKyc", value: MsgRemoveKyc.fromPartial( data ) }),
    msgAgToAc: (data: MsgAgToAc): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgAgToAc", value: MsgAgToAc.fromPartial( data ) }),
    msgDoFixedDeposit: (data: MsgDoFixedDeposit): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgDoFixedDeposit", value: MsgDoFixedDeposit.fromPartial( data ) }),
    msgDoFixedWithdraw: (data: MsgDoFixedWithdraw): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgDoFixedWithdraw", value: MsgDoFixedWithdraw.fromPartial( data ) }),
    msgNewKyc: (data: MsgNewKyc): EncodeObject => ({ typeUrl: "/srspoa.srvault.MsgNewKyc", value: MsgNewKyc.fromPartial( data ) }),
    
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
