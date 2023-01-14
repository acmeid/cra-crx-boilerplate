/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

export interface Region {
  regionName: string;
  regionId: string;
  /** 区域的最大as数限制 */
  commissionPowerLimit: string;
  /** 区域的最大ac数限制 */
  bondDenomLimit: string;
  /** 区域的as最大数:全局最大as数比率 */
  commissionPowerRate: string;
  /** 区域质押节点数限制 */
  delegatorsLimit: number;
  /** 最低ac质押数 */
  minDelegateBondDenom: string;
  /** 最低as质押数(通过ac转换) */
  minDelegateCommissionPower: string;
  /** 清算周期块数 */
  clearPeriodBlocks: number;
  /** ac的货币名 */
  bondDenom: string;
  /** as的货币名 */
  commissionPowerDenom: string;
  /** 手续费区域金库上缴国库比率 */
  regionFeeRate: string;
  /** 区域金库揸fit人 */
  regionAdminAddress: string;
  /** 区金库KYC用户质押总额度 */
  regionKYCStakeUpQuota: string;
}

export interface RegionDelegators {
  regionId: string;
  delegators: string[];
}

export interface RegionsDelegators {
  delegators: RegionDelegators[];
}

const baseRegion: object = {
  regionName: "",
  regionId: "",
  commissionPowerLimit: "",
  bondDenomLimit: "",
  commissionPowerRate: "",
  delegatorsLimit: 0,
  minDelegateBondDenom: "",
  minDelegateCommissionPower: "",
  clearPeriodBlocks: 0,
  bondDenom: "",
  commissionPowerDenom: "",
  regionFeeRate: "",
  regionAdminAddress: "",
  regionKYCStakeUpQuota: "",
};

export const Region = {
  encode(message: Region, writer: Writer = Writer.create()): Writer {
    if (message.regionName !== "") {
      writer.uint32(10).string(message.regionName);
    }
    if (message.regionId !== "") {
      writer.uint32(18).string(message.regionId);
    }
    if (message.commissionPowerLimit !== "") {
      writer.uint32(26).string(message.commissionPowerLimit);
    }
    if (message.bondDenomLimit !== "") {
      writer.uint32(34).string(message.bondDenomLimit);
    }
    if (message.commissionPowerRate !== "") {
      writer.uint32(42).string(message.commissionPowerRate);
    }
    if (message.delegatorsLimit !== 0) {
      writer.uint32(48).int64(message.delegatorsLimit);
    }
    if (message.minDelegateBondDenom !== "") {
      writer.uint32(58).string(message.minDelegateBondDenom);
    }
    if (message.minDelegateCommissionPower !== "") {
      writer.uint32(66).string(message.minDelegateCommissionPower);
    }
    if (message.clearPeriodBlocks !== 0) {
      writer.uint32(72).int64(message.clearPeriodBlocks);
    }
    if (message.bondDenom !== "") {
      writer.uint32(82).string(message.bondDenom);
    }
    if (message.commissionPowerDenom !== "") {
      writer.uint32(90).string(message.commissionPowerDenom);
    }
    if (message.regionFeeRate !== "") {
      writer.uint32(98).string(message.regionFeeRate);
    }
    if (message.regionAdminAddress !== "") {
      writer.uint32(106).string(message.regionAdminAddress);
    }
    if (message.regionKYCStakeUpQuota !== "") {
      writer.uint32(114).string(message.regionKYCStakeUpQuota);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Region {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegion } as Region;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionName = reader.string();
          break;
        case 2:
          message.regionId = reader.string();
          break;
        case 3:
          message.commissionPowerLimit = reader.string();
          break;
        case 4:
          message.bondDenomLimit = reader.string();
          break;
        case 5:
          message.commissionPowerRate = reader.string();
          break;
        case 6:
          message.delegatorsLimit = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.minDelegateBondDenom = reader.string();
          break;
        case 8:
          message.minDelegateCommissionPower = reader.string();
          break;
        case 9:
          message.clearPeriodBlocks = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.bondDenom = reader.string();
          break;
        case 11:
          message.commissionPowerDenom = reader.string();
          break;
        case 12:
          message.regionFeeRate = reader.string();
          break;
        case 13:
          message.regionAdminAddress = reader.string();
          break;
        case 14:
          message.regionKYCStakeUpQuota = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Region {
    const message = { ...baseRegion } as Region;
    if (object.regionName !== undefined && object.regionName !== null) {
      message.regionName = String(object.regionName);
    } else {
      message.regionName = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (
      object.commissionPowerLimit !== undefined &&
      object.commissionPowerLimit !== null
    ) {
      message.commissionPowerLimit = String(object.commissionPowerLimit);
    } else {
      message.commissionPowerLimit = "";
    }
    if (object.bondDenomLimit !== undefined && object.bondDenomLimit !== null) {
      message.bondDenomLimit = String(object.bondDenomLimit);
    } else {
      message.bondDenomLimit = "";
    }
    if (
      object.commissionPowerRate !== undefined &&
      object.commissionPowerRate !== null
    ) {
      message.commissionPowerRate = String(object.commissionPowerRate);
    } else {
      message.commissionPowerRate = "";
    }
    if (
      object.delegatorsLimit !== undefined &&
      object.delegatorsLimit !== null
    ) {
      message.delegatorsLimit = Number(object.delegatorsLimit);
    } else {
      message.delegatorsLimit = 0;
    }
    if (
      object.minDelegateBondDenom !== undefined &&
      object.minDelegateBondDenom !== null
    ) {
      message.minDelegateBondDenom = String(object.minDelegateBondDenom);
    } else {
      message.minDelegateBondDenom = "";
    }
    if (
      object.minDelegateCommissionPower !== undefined &&
      object.minDelegateCommissionPower !== null
    ) {
      message.minDelegateCommissionPower = String(
        object.minDelegateCommissionPower
      );
    } else {
      message.minDelegateCommissionPower = "";
    }
    if (
      object.clearPeriodBlocks !== undefined &&
      object.clearPeriodBlocks !== null
    ) {
      message.clearPeriodBlocks = Number(object.clearPeriodBlocks);
    } else {
      message.clearPeriodBlocks = 0;
    }
    if (object.bondDenom !== undefined && object.bondDenom !== null) {
      message.bondDenom = String(object.bondDenom);
    } else {
      message.bondDenom = "";
    }
    if (
      object.commissionPowerDenom !== undefined &&
      object.commissionPowerDenom !== null
    ) {
      message.commissionPowerDenom = String(object.commissionPowerDenom);
    } else {
      message.commissionPowerDenom = "";
    }
    if (object.regionFeeRate !== undefined && object.regionFeeRate !== null) {
      message.regionFeeRate = String(object.regionFeeRate);
    } else {
      message.regionFeeRate = "";
    }
    if (
      object.regionAdminAddress !== undefined &&
      object.regionAdminAddress !== null
    ) {
      message.regionAdminAddress = String(object.regionAdminAddress);
    } else {
      message.regionAdminAddress = "";
    }
    if (
      object.regionKYCStakeUpQuota !== undefined &&
      object.regionKYCStakeUpQuota !== null
    ) {
      message.regionKYCStakeUpQuota = String(object.regionKYCStakeUpQuota);
    } else {
      message.regionKYCStakeUpQuota = "";
    }
    return message;
  },

  toJSON(message: Region): unknown {
    const obj: any = {};
    message.regionName !== undefined && (obj.regionName = message.regionName);
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.commissionPowerLimit !== undefined &&
      (obj.commissionPowerLimit = message.commissionPowerLimit);
    message.bondDenomLimit !== undefined &&
      (obj.bondDenomLimit = message.bondDenomLimit);
    message.commissionPowerRate !== undefined &&
      (obj.commissionPowerRate = message.commissionPowerRate);
    message.delegatorsLimit !== undefined &&
      (obj.delegatorsLimit = message.delegatorsLimit);
    message.minDelegateBondDenom !== undefined &&
      (obj.minDelegateBondDenom = message.minDelegateBondDenom);
    message.minDelegateCommissionPower !== undefined &&
      (obj.minDelegateCommissionPower = message.minDelegateCommissionPower);
    message.clearPeriodBlocks !== undefined &&
      (obj.clearPeriodBlocks = message.clearPeriodBlocks);
    message.bondDenom !== undefined && (obj.bondDenom = message.bondDenom);
    message.commissionPowerDenom !== undefined &&
      (obj.commissionPowerDenom = message.commissionPowerDenom);
    message.regionFeeRate !== undefined &&
      (obj.regionFeeRate = message.regionFeeRate);
    message.regionAdminAddress !== undefined &&
      (obj.regionAdminAddress = message.regionAdminAddress);
    message.regionKYCStakeUpQuota !== undefined &&
      (obj.regionKYCStakeUpQuota = message.regionKYCStakeUpQuota);
    return obj;
  },

  fromPartial(object: DeepPartial<Region>): Region {
    const message = { ...baseRegion } as Region;
    if (object.regionName !== undefined && object.regionName !== null) {
      message.regionName = object.regionName;
    } else {
      message.regionName = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (
      object.commissionPowerLimit !== undefined &&
      object.commissionPowerLimit !== null
    ) {
      message.commissionPowerLimit = object.commissionPowerLimit;
    } else {
      message.commissionPowerLimit = "";
    }
    if (object.bondDenomLimit !== undefined && object.bondDenomLimit !== null) {
      message.bondDenomLimit = object.bondDenomLimit;
    } else {
      message.bondDenomLimit = "";
    }
    if (
      object.commissionPowerRate !== undefined &&
      object.commissionPowerRate !== null
    ) {
      message.commissionPowerRate = object.commissionPowerRate;
    } else {
      message.commissionPowerRate = "";
    }
    if (
      object.delegatorsLimit !== undefined &&
      object.delegatorsLimit !== null
    ) {
      message.delegatorsLimit = object.delegatorsLimit;
    } else {
      message.delegatorsLimit = 0;
    }
    if (
      object.minDelegateBondDenom !== undefined &&
      object.minDelegateBondDenom !== null
    ) {
      message.minDelegateBondDenom = object.minDelegateBondDenom;
    } else {
      message.minDelegateBondDenom = "";
    }
    if (
      object.minDelegateCommissionPower !== undefined &&
      object.minDelegateCommissionPower !== null
    ) {
      message.minDelegateCommissionPower = object.minDelegateCommissionPower;
    } else {
      message.minDelegateCommissionPower = "";
    }
    if (
      object.clearPeriodBlocks !== undefined &&
      object.clearPeriodBlocks !== null
    ) {
      message.clearPeriodBlocks = object.clearPeriodBlocks;
    } else {
      message.clearPeriodBlocks = 0;
    }
    if (object.bondDenom !== undefined && object.bondDenom !== null) {
      message.bondDenom = object.bondDenom;
    } else {
      message.bondDenom = "";
    }
    if (
      object.commissionPowerDenom !== undefined &&
      object.commissionPowerDenom !== null
    ) {
      message.commissionPowerDenom = object.commissionPowerDenom;
    } else {
      message.commissionPowerDenom = "";
    }
    if (object.regionFeeRate !== undefined && object.regionFeeRate !== null) {
      message.regionFeeRate = object.regionFeeRate;
    } else {
      message.regionFeeRate = "";
    }
    if (
      object.regionAdminAddress !== undefined &&
      object.regionAdminAddress !== null
    ) {
      message.regionAdminAddress = object.regionAdminAddress;
    } else {
      message.regionAdminAddress = "";
    }
    if (
      object.regionKYCStakeUpQuota !== undefined &&
      object.regionKYCStakeUpQuota !== null
    ) {
      message.regionKYCStakeUpQuota = object.regionKYCStakeUpQuota;
    } else {
      message.regionKYCStakeUpQuota = "";
    }
    return message;
  },
};

const baseRegionDelegators: object = { regionId: "", delegators: "" };

export const RegionDelegators = {
  encode(message: RegionDelegators, writer: Writer = Writer.create()): Writer {
    if (message.regionId !== "") {
      writer.uint32(10).string(message.regionId);
    }
    for (const v of message.delegators) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegionDelegators {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegionDelegators } as RegionDelegators;
    message.delegators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionId = reader.string();
          break;
        case 2:
          message.delegators.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegionDelegators {
    const message = { ...baseRegionDelegators } as RegionDelegators;
    message.delegators = [];
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (object.delegators !== undefined && object.delegators !== null) {
      for (const e of object.delegators) {
        message.delegators.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: RegionDelegators): unknown {
    const obj: any = {};
    message.regionId !== undefined && (obj.regionId = message.regionId);
    if (message.delegators) {
      obj.delegators = message.delegators.map((e) => e);
    } else {
      obj.delegators = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RegionDelegators>): RegionDelegators {
    const message = { ...baseRegionDelegators } as RegionDelegators;
    message.delegators = [];
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (object.delegators !== undefined && object.delegators !== null) {
      for (const e of object.delegators) {
        message.delegators.push(e);
      }
    }
    return message;
  },
};

const baseRegionsDelegators: object = {};

export const RegionsDelegators = {
  encode(message: RegionsDelegators, writer: Writer = Writer.create()): Writer {
    for (const v of message.delegators) {
      RegionDelegators.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegionsDelegators {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegionsDelegators } as RegionsDelegators;
    message.delegators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.delegators.push(
            RegionDelegators.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegionsDelegators {
    const message = { ...baseRegionsDelegators } as RegionsDelegators;
    message.delegators = [];
    if (object.delegators !== undefined && object.delegators !== null) {
      for (const e of object.delegators) {
        message.delegators.push(RegionDelegators.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: RegionsDelegators): unknown {
    const obj: any = {};
    if (message.delegators) {
      obj.delegators = message.delegators.map((e) =>
        e ? RegionDelegators.toJSON(e) : undefined
      );
    } else {
      obj.delegators = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RegionsDelegators>): RegionsDelegators {
    const message = { ...baseRegionsDelegators } as RegionsDelegators;
    message.delegators = [];
    if (object.delegators !== undefined && object.delegators !== null) {
      for (const e of object.delegators) {
        message.delegators.push(RegionDelegators.fromPartial(e));
      }
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
