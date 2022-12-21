/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../srvault/params";
import { FixedDeposit } from "../srvault/fixed_deposit";
import { Bonus } from "../srvault/bonus";
import { RegionVault } from "../srvault/region_vault";
import { Kyc } from "../srvault/kyc";
import { VaultParams } from "../srvault/vault_params";

export const protobufPackage = "srspoa.srvault";

/** GenesisState defines the srvault module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  fixedDepositList: FixedDeposit[];
  fixedDepositCount: number;
  bonusList: Bonus[];
  regionVaultList: RegionVault[];
  kycList: Kyc[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  vaultParams: VaultParams | undefined;
}

const baseGenesisState: object = { fixedDepositCount: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.fixedDepositList) {
      FixedDeposit.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.fixedDepositCount !== 0) {
      writer.uint32(24).uint64(message.fixedDepositCount);
    }
    for (const v of message.bonusList) {
      Bonus.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.regionVaultList) {
      RegionVault.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.kycList) {
      Kyc.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.vaultParams !== undefined) {
      VaultParams.encode(
        message.vaultParams,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.fixedDepositList = [];
    message.bonusList = [];
    message.regionVaultList = [];
    message.kycList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.fixedDepositList.push(
            FixedDeposit.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.fixedDepositCount = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.bonusList.push(Bonus.decode(reader, reader.uint32()));
          break;
        case 5:
          message.regionVaultList.push(
            RegionVault.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.kycList.push(Kyc.decode(reader, reader.uint32()));
          break;
        case 7:
          message.vaultParams = VaultParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.fixedDepositList = [];
    message.bonusList = [];
    message.regionVaultList = [];
    message.kycList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (
      object.fixedDepositList !== undefined &&
      object.fixedDepositList !== null
    ) {
      for (const e of object.fixedDepositList) {
        message.fixedDepositList.push(FixedDeposit.fromJSON(e));
      }
    }
    if (
      object.fixedDepositCount !== undefined &&
      object.fixedDepositCount !== null
    ) {
      message.fixedDepositCount = Number(object.fixedDepositCount);
    } else {
      message.fixedDepositCount = 0;
    }
    if (object.bonusList !== undefined && object.bonusList !== null) {
      for (const e of object.bonusList) {
        message.bonusList.push(Bonus.fromJSON(e));
      }
    }
    if (
      object.regionVaultList !== undefined &&
      object.regionVaultList !== null
    ) {
      for (const e of object.regionVaultList) {
        message.regionVaultList.push(RegionVault.fromJSON(e));
      }
    }
    if (object.kycList !== undefined && object.kycList !== null) {
      for (const e of object.kycList) {
        message.kycList.push(Kyc.fromJSON(e));
      }
    }
    if (object.vaultParams !== undefined && object.vaultParams !== null) {
      message.vaultParams = VaultParams.fromJSON(object.vaultParams);
    } else {
      message.vaultParams = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.fixedDepositList) {
      obj.fixedDepositList = message.fixedDepositList.map((e) =>
        e ? FixedDeposit.toJSON(e) : undefined
      );
    } else {
      obj.fixedDepositList = [];
    }
    message.fixedDepositCount !== undefined &&
      (obj.fixedDepositCount = message.fixedDepositCount);
    if (message.bonusList) {
      obj.bonusList = message.bonusList.map((e) =>
        e ? Bonus.toJSON(e) : undefined
      );
    } else {
      obj.bonusList = [];
    }
    if (message.regionVaultList) {
      obj.regionVaultList = message.regionVaultList.map((e) =>
        e ? RegionVault.toJSON(e) : undefined
      );
    } else {
      obj.regionVaultList = [];
    }
    if (message.kycList) {
      obj.kycList = message.kycList.map((e) => (e ? Kyc.toJSON(e) : undefined));
    } else {
      obj.kycList = [];
    }
    message.vaultParams !== undefined &&
      (obj.vaultParams = message.vaultParams
        ? VaultParams.toJSON(message.vaultParams)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.fixedDepositList = [];
    message.bonusList = [];
    message.regionVaultList = [];
    message.kycList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (
      object.fixedDepositList !== undefined &&
      object.fixedDepositList !== null
    ) {
      for (const e of object.fixedDepositList) {
        message.fixedDepositList.push(FixedDeposit.fromPartial(e));
      }
    }
    if (
      object.fixedDepositCount !== undefined &&
      object.fixedDepositCount !== null
    ) {
      message.fixedDepositCount = object.fixedDepositCount;
    } else {
      message.fixedDepositCount = 0;
    }
    if (object.bonusList !== undefined && object.bonusList !== null) {
      for (const e of object.bonusList) {
        message.bonusList.push(Bonus.fromPartial(e));
      }
    }
    if (
      object.regionVaultList !== undefined &&
      object.regionVaultList !== null
    ) {
      for (const e of object.regionVaultList) {
        message.regionVaultList.push(RegionVault.fromPartial(e));
      }
    }
    if (object.kycList !== undefined && object.kycList !== null) {
      for (const e of object.kycList) {
        message.kycList.push(Kyc.fromPartial(e));
      }
    }
    if (object.vaultParams !== undefined && object.vaultParams !== null) {
      message.vaultParams = VaultParams.fromPartial(object.vaultParams);
    } else {
      message.vaultParams = undefined;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
