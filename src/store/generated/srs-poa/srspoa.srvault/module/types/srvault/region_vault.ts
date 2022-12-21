/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srvault";

export enum VAULT_ACCOUNT_TYPE {
  VAULT_ACCOUNT_TYPE_BASE = 0,
  VAULT_ACCOUNT_TYPE_FIXED_DEPOSIT = 1,
  VAULT_ACCOUNT_TYPE_BONUS = 2,
  UNRECOGNIZED = -1,
}

export function vAULT_ACCOUNT_TYPEFromJSON(object: any): VAULT_ACCOUNT_TYPE {
  switch (object) {
    case 0:
    case "VAULT_ACCOUNT_TYPE_BASE":
      return VAULT_ACCOUNT_TYPE.VAULT_ACCOUNT_TYPE_BASE;
    case 1:
    case "VAULT_ACCOUNT_TYPE_FIXED_DEPOSIT":
      return VAULT_ACCOUNT_TYPE.VAULT_ACCOUNT_TYPE_FIXED_DEPOSIT;
    case 2:
    case "VAULT_ACCOUNT_TYPE_BONUS":
      return VAULT_ACCOUNT_TYPE.VAULT_ACCOUNT_TYPE_BONUS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VAULT_ACCOUNT_TYPE.UNRECOGNIZED;
  }
}

export function vAULT_ACCOUNT_TYPEToJSON(object: VAULT_ACCOUNT_TYPE): string {
  switch (object) {
    case VAULT_ACCOUNT_TYPE.VAULT_ACCOUNT_TYPE_BASE:
      return "VAULT_ACCOUNT_TYPE_BASE";
    case VAULT_ACCOUNT_TYPE.VAULT_ACCOUNT_TYPE_FIXED_DEPOSIT:
      return "VAULT_ACCOUNT_TYPE_FIXED_DEPOSIT";
    case VAULT_ACCOUNT_TYPE.VAULT_ACCOUNT_TYPE_BONUS:
      return "VAULT_ACCOUNT_TYPE_BONUS";
    default:
      return "UNKNOWN";
  }
}

export interface RegionAnnualRate {
  annualRate_1_months: string;
  annualRate_3_months: string;
  annualRate_6_months: string;
  annualRate_12_months: string;
  annualRate_24_months: string;
  annualRate_48_months: string;
}

export interface RegionVault {
  regionId: string;
  name: string;
  Admin: string;
  feeRate: string;
  baseAccountAddr: string;
  fixedDepositAccountAddr: string;
  bonusAccountAddr: string;
  annualRate: RegionAnnualRate | undefined;
}

const baseRegionAnnualRate: object = {
  annualRate_1_months: "",
  annualRate_3_months: "",
  annualRate_6_months: "",
  annualRate_12_months: "",
  annualRate_24_months: "",
  annualRate_48_months: "",
};

export const RegionAnnualRate = {
  encode(message: RegionAnnualRate, writer: Writer = Writer.create()): Writer {
    if (message.annualRate_1_months !== "") {
      writer.uint32(10).string(message.annualRate_1_months);
    }
    if (message.annualRate_3_months !== "") {
      writer.uint32(18).string(message.annualRate_3_months);
    }
    if (message.annualRate_6_months !== "") {
      writer.uint32(26).string(message.annualRate_6_months);
    }
    if (message.annualRate_12_months !== "") {
      writer.uint32(34).string(message.annualRate_12_months);
    }
    if (message.annualRate_24_months !== "") {
      writer.uint32(42).string(message.annualRate_24_months);
    }
    if (message.annualRate_48_months !== "") {
      writer.uint32(50).string(message.annualRate_48_months);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegionAnnualRate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegionAnnualRate } as RegionAnnualRate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.annualRate_1_months = reader.string();
          break;
        case 2:
          message.annualRate_3_months = reader.string();
          break;
        case 3:
          message.annualRate_6_months = reader.string();
          break;
        case 4:
          message.annualRate_12_months = reader.string();
          break;
        case 5:
          message.annualRate_24_months = reader.string();
          break;
        case 6:
          message.annualRate_48_months = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegionAnnualRate {
    const message = { ...baseRegionAnnualRate } as RegionAnnualRate;
    if (
      object.annualRate_1_months !== undefined &&
      object.annualRate_1_months !== null
    ) {
      message.annualRate_1_months = String(object.annualRate_1_months);
    } else {
      message.annualRate_1_months = "";
    }
    if (
      object.annualRate_3_months !== undefined &&
      object.annualRate_3_months !== null
    ) {
      message.annualRate_3_months = String(object.annualRate_3_months);
    } else {
      message.annualRate_3_months = "";
    }
    if (
      object.annualRate_6_months !== undefined &&
      object.annualRate_6_months !== null
    ) {
      message.annualRate_6_months = String(object.annualRate_6_months);
    } else {
      message.annualRate_6_months = "";
    }
    if (
      object.annualRate_12_months !== undefined &&
      object.annualRate_12_months !== null
    ) {
      message.annualRate_12_months = String(object.annualRate_12_months);
    } else {
      message.annualRate_12_months = "";
    }
    if (
      object.annualRate_24_months !== undefined &&
      object.annualRate_24_months !== null
    ) {
      message.annualRate_24_months = String(object.annualRate_24_months);
    } else {
      message.annualRate_24_months = "";
    }
    if (
      object.annualRate_48_months !== undefined &&
      object.annualRate_48_months !== null
    ) {
      message.annualRate_48_months = String(object.annualRate_48_months);
    } else {
      message.annualRate_48_months = "";
    }
    return message;
  },

  toJSON(message: RegionAnnualRate): unknown {
    const obj: any = {};
    message.annualRate_1_months !== undefined &&
      (obj.annualRate_1_months = message.annualRate_1_months);
    message.annualRate_3_months !== undefined &&
      (obj.annualRate_3_months = message.annualRate_3_months);
    message.annualRate_6_months !== undefined &&
      (obj.annualRate_6_months = message.annualRate_6_months);
    message.annualRate_12_months !== undefined &&
      (obj.annualRate_12_months = message.annualRate_12_months);
    message.annualRate_24_months !== undefined &&
      (obj.annualRate_24_months = message.annualRate_24_months);
    message.annualRate_48_months !== undefined &&
      (obj.annualRate_48_months = message.annualRate_48_months);
    return obj;
  },

  fromPartial(object: DeepPartial<RegionAnnualRate>): RegionAnnualRate {
    const message = { ...baseRegionAnnualRate } as RegionAnnualRate;
    if (
      object.annualRate_1_months !== undefined &&
      object.annualRate_1_months !== null
    ) {
      message.annualRate_1_months = object.annualRate_1_months;
    } else {
      message.annualRate_1_months = "";
    }
    if (
      object.annualRate_3_months !== undefined &&
      object.annualRate_3_months !== null
    ) {
      message.annualRate_3_months = object.annualRate_3_months;
    } else {
      message.annualRate_3_months = "";
    }
    if (
      object.annualRate_6_months !== undefined &&
      object.annualRate_6_months !== null
    ) {
      message.annualRate_6_months = object.annualRate_6_months;
    } else {
      message.annualRate_6_months = "";
    }
    if (
      object.annualRate_12_months !== undefined &&
      object.annualRate_12_months !== null
    ) {
      message.annualRate_12_months = object.annualRate_12_months;
    } else {
      message.annualRate_12_months = "";
    }
    if (
      object.annualRate_24_months !== undefined &&
      object.annualRate_24_months !== null
    ) {
      message.annualRate_24_months = object.annualRate_24_months;
    } else {
      message.annualRate_24_months = "";
    }
    if (
      object.annualRate_48_months !== undefined &&
      object.annualRate_48_months !== null
    ) {
      message.annualRate_48_months = object.annualRate_48_months;
    } else {
      message.annualRate_48_months = "";
    }
    return message;
  },
};

const baseRegionVault: object = {
  regionId: "",
  name: "",
  Admin: "",
  feeRate: "",
  baseAccountAddr: "",
  fixedDepositAccountAddr: "",
  bonusAccountAddr: "",
};

export const RegionVault = {
  encode(message: RegionVault, writer: Writer = Writer.create()): Writer {
    if (message.regionId !== "") {
      writer.uint32(10).string(message.regionId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.Admin !== "") {
      writer.uint32(26).string(message.Admin);
    }
    if (message.feeRate !== "") {
      writer.uint32(34).string(message.feeRate);
    }
    if (message.baseAccountAddr !== "") {
      writer.uint32(42).string(message.baseAccountAddr);
    }
    if (message.fixedDepositAccountAddr !== "") {
      writer.uint32(50).string(message.fixedDepositAccountAddr);
    }
    if (message.bonusAccountAddr !== "") {
      writer.uint32(58).string(message.bonusAccountAddr);
    }
    if (message.annualRate !== undefined) {
      RegionAnnualRate.encode(
        message.annualRate,
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegionVault {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegionVault } as RegionVault;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.Admin = reader.string();
          break;
        case 4:
          message.feeRate = reader.string();
          break;
        case 5:
          message.baseAccountAddr = reader.string();
          break;
        case 6:
          message.fixedDepositAccountAddr = reader.string();
          break;
        case 7:
          message.bonusAccountAddr = reader.string();
          break;
        case 8:
          message.annualRate = RegionAnnualRate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegionVault {
    const message = { ...baseRegionVault } as RegionVault;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.Admin !== undefined && object.Admin !== null) {
      message.Admin = String(object.Admin);
    } else {
      message.Admin = "";
    }
    if (object.feeRate !== undefined && object.feeRate !== null) {
      message.feeRate = String(object.feeRate);
    } else {
      message.feeRate = "";
    }
    if (
      object.baseAccountAddr !== undefined &&
      object.baseAccountAddr !== null
    ) {
      message.baseAccountAddr = String(object.baseAccountAddr);
    } else {
      message.baseAccountAddr = "";
    }
    if (
      object.fixedDepositAccountAddr !== undefined &&
      object.fixedDepositAccountAddr !== null
    ) {
      message.fixedDepositAccountAddr = String(object.fixedDepositAccountAddr);
    } else {
      message.fixedDepositAccountAddr = "";
    }
    if (
      object.bonusAccountAddr !== undefined &&
      object.bonusAccountAddr !== null
    ) {
      message.bonusAccountAddr = String(object.bonusAccountAddr);
    } else {
      message.bonusAccountAddr = "";
    }
    if (object.annualRate !== undefined && object.annualRate !== null) {
      message.annualRate = RegionAnnualRate.fromJSON(object.annualRate);
    } else {
      message.annualRate = undefined;
    }
    return message;
  },

  toJSON(message: RegionVault): unknown {
    const obj: any = {};
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.name !== undefined && (obj.name = message.name);
    message.Admin !== undefined && (obj.Admin = message.Admin);
    message.feeRate !== undefined && (obj.feeRate = message.feeRate);
    message.baseAccountAddr !== undefined &&
      (obj.baseAccountAddr = message.baseAccountAddr);
    message.fixedDepositAccountAddr !== undefined &&
      (obj.fixedDepositAccountAddr = message.fixedDepositAccountAddr);
    message.bonusAccountAddr !== undefined &&
      (obj.bonusAccountAddr = message.bonusAccountAddr);
    message.annualRate !== undefined &&
      (obj.annualRate = message.annualRate
        ? RegionAnnualRate.toJSON(message.annualRate)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<RegionVault>): RegionVault {
    const message = { ...baseRegionVault } as RegionVault;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.Admin !== undefined && object.Admin !== null) {
      message.Admin = object.Admin;
    } else {
      message.Admin = "";
    }
    if (object.feeRate !== undefined && object.feeRate !== null) {
      message.feeRate = object.feeRate;
    } else {
      message.feeRate = "";
    }
    if (
      object.baseAccountAddr !== undefined &&
      object.baseAccountAddr !== null
    ) {
      message.baseAccountAddr = object.baseAccountAddr;
    } else {
      message.baseAccountAddr = "";
    }
    if (
      object.fixedDepositAccountAddr !== undefined &&
      object.fixedDepositAccountAddr !== null
    ) {
      message.fixedDepositAccountAddr = object.fixedDepositAccountAddr;
    } else {
      message.fixedDepositAccountAddr = "";
    }
    if (
      object.bonusAccountAddr !== undefined &&
      object.bonusAccountAddr !== null
    ) {
      message.bonusAccountAddr = object.bonusAccountAddr;
    } else {
      message.bonusAccountAddr = "";
    }
    if (object.annualRate !== undefined && object.annualRate !== null) {
      message.annualRate = RegionAnnualRate.fromPartial(object.annualRate);
    } else {
      message.annualRate = undefined;
    }
    return message;
  },
};

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
