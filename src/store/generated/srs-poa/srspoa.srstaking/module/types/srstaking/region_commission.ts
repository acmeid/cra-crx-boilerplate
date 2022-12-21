/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

export interface RegionCommission {
  regionId: string;
  regionCommissionPowerLimit: string;
  regionBondDenomLimit: string;
  regionCommissionPowerRate: string;
  delegatorsCommissionPowerAmount: string;
  delegatorsCommissionPowerRate: string;
  delegatorsBondDenomAmount: string;
  bondDenom: string;
  commissionPowerDenom: string;
  accountName: string;
  accountAddress: string;
  jailed: boolean;
}

const baseRegionCommission: object = {
  regionId: "",
  regionCommissionPowerLimit: "",
  regionBondDenomLimit: "",
  regionCommissionPowerRate: "",
  delegatorsCommissionPowerAmount: "",
  delegatorsCommissionPowerRate: "",
  delegatorsBondDenomAmount: "",
  bondDenom: "",
  commissionPowerDenom: "",
  accountName: "",
  accountAddress: "",
  jailed: false,
};

export const RegionCommission = {
  encode(message: RegionCommission, writer: Writer = Writer.create()): Writer {
    if (message.regionId !== "") {
      writer.uint32(10).string(message.regionId);
    }
    if (message.regionCommissionPowerLimit !== "") {
      writer.uint32(18).string(message.regionCommissionPowerLimit);
    }
    if (message.regionBondDenomLimit !== "") {
      writer.uint32(26).string(message.regionBondDenomLimit);
    }
    if (message.regionCommissionPowerRate !== "") {
      writer.uint32(34).string(message.regionCommissionPowerRate);
    }
    if (message.delegatorsCommissionPowerAmount !== "") {
      writer.uint32(42).string(message.delegatorsCommissionPowerAmount);
    }
    if (message.delegatorsCommissionPowerRate !== "") {
      writer.uint32(50).string(message.delegatorsCommissionPowerRate);
    }
    if (message.delegatorsBondDenomAmount !== "") {
      writer.uint32(58).string(message.delegatorsBondDenomAmount);
    }
    if (message.bondDenom !== "") {
      writer.uint32(66).string(message.bondDenom);
    }
    if (message.commissionPowerDenom !== "") {
      writer.uint32(74).string(message.commissionPowerDenom);
    }
    if (message.accountName !== "") {
      writer.uint32(82).string(message.accountName);
    }
    if (message.accountAddress !== "") {
      writer.uint32(90).string(message.accountAddress);
    }
    if (message.jailed === true) {
      writer.uint32(96).bool(message.jailed);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegionCommission {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegionCommission } as RegionCommission;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionId = reader.string();
          break;
        case 2:
          message.regionCommissionPowerLimit = reader.string();
          break;
        case 3:
          message.regionBondDenomLimit = reader.string();
          break;
        case 4:
          message.regionCommissionPowerRate = reader.string();
          break;
        case 5:
          message.delegatorsCommissionPowerAmount = reader.string();
          break;
        case 6:
          message.delegatorsCommissionPowerRate = reader.string();
          break;
        case 7:
          message.delegatorsBondDenomAmount = reader.string();
          break;
        case 8:
          message.bondDenom = reader.string();
          break;
        case 9:
          message.commissionPowerDenom = reader.string();
          break;
        case 10:
          message.accountName = reader.string();
          break;
        case 11:
          message.accountAddress = reader.string();
          break;
        case 12:
          message.jailed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegionCommission {
    const message = { ...baseRegionCommission } as RegionCommission;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (
      object.regionCommissionPowerLimit !== undefined &&
      object.regionCommissionPowerLimit !== null
    ) {
      message.regionCommissionPowerLimit = String(
        object.regionCommissionPowerLimit
      );
    } else {
      message.regionCommissionPowerLimit = "";
    }
    if (
      object.regionBondDenomLimit !== undefined &&
      object.regionBondDenomLimit !== null
    ) {
      message.regionBondDenomLimit = String(object.regionBondDenomLimit);
    } else {
      message.regionBondDenomLimit = "";
    }
    if (
      object.regionCommissionPowerRate !== undefined &&
      object.regionCommissionPowerRate !== null
    ) {
      message.regionCommissionPowerRate = String(
        object.regionCommissionPowerRate
      );
    } else {
      message.regionCommissionPowerRate = "";
    }
    if (
      object.delegatorsCommissionPowerAmount !== undefined &&
      object.delegatorsCommissionPowerAmount !== null
    ) {
      message.delegatorsCommissionPowerAmount = String(
        object.delegatorsCommissionPowerAmount
      );
    } else {
      message.delegatorsCommissionPowerAmount = "";
    }
    if (
      object.delegatorsCommissionPowerRate !== undefined &&
      object.delegatorsCommissionPowerRate !== null
    ) {
      message.delegatorsCommissionPowerRate = String(
        object.delegatorsCommissionPowerRate
      );
    } else {
      message.delegatorsCommissionPowerRate = "";
    }
    if (
      object.delegatorsBondDenomAmount !== undefined &&
      object.delegatorsBondDenomAmount !== null
    ) {
      message.delegatorsBondDenomAmount = String(
        object.delegatorsBondDenomAmount
      );
    } else {
      message.delegatorsBondDenomAmount = "";
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
    if (object.accountName !== undefined && object.accountName !== null) {
      message.accountName = String(object.accountName);
    } else {
      message.accountName = "";
    }
    if (object.accountAddress !== undefined && object.accountAddress !== null) {
      message.accountAddress = String(object.accountAddress);
    } else {
      message.accountAddress = "";
    }
    if (object.jailed !== undefined && object.jailed !== null) {
      message.jailed = Boolean(object.jailed);
    } else {
      message.jailed = false;
    }
    return message;
  },

  toJSON(message: RegionCommission): unknown {
    const obj: any = {};
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.regionCommissionPowerLimit !== undefined &&
      (obj.regionCommissionPowerLimit = message.regionCommissionPowerLimit);
    message.regionBondDenomLimit !== undefined &&
      (obj.regionBondDenomLimit = message.regionBondDenomLimit);
    message.regionCommissionPowerRate !== undefined &&
      (obj.regionCommissionPowerRate = message.regionCommissionPowerRate);
    message.delegatorsCommissionPowerAmount !== undefined &&
      (obj.delegatorsCommissionPowerAmount =
        message.delegatorsCommissionPowerAmount);
    message.delegatorsCommissionPowerRate !== undefined &&
      (obj.delegatorsCommissionPowerRate =
        message.delegatorsCommissionPowerRate);
    message.delegatorsBondDenomAmount !== undefined &&
      (obj.delegatorsBondDenomAmount = message.delegatorsBondDenomAmount);
    message.bondDenom !== undefined && (obj.bondDenom = message.bondDenom);
    message.commissionPowerDenom !== undefined &&
      (obj.commissionPowerDenom = message.commissionPowerDenom);
    message.accountName !== undefined &&
      (obj.accountName = message.accountName);
    message.accountAddress !== undefined &&
      (obj.accountAddress = message.accountAddress);
    message.jailed !== undefined && (obj.jailed = message.jailed);
    return obj;
  },

  fromPartial(object: DeepPartial<RegionCommission>): RegionCommission {
    const message = { ...baseRegionCommission } as RegionCommission;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (
      object.regionCommissionPowerLimit !== undefined &&
      object.regionCommissionPowerLimit !== null
    ) {
      message.regionCommissionPowerLimit = object.regionCommissionPowerLimit;
    } else {
      message.regionCommissionPowerLimit = "";
    }
    if (
      object.regionBondDenomLimit !== undefined &&
      object.regionBondDenomLimit !== null
    ) {
      message.regionBondDenomLimit = object.regionBondDenomLimit;
    } else {
      message.regionBondDenomLimit = "";
    }
    if (
      object.regionCommissionPowerRate !== undefined &&
      object.regionCommissionPowerRate !== null
    ) {
      message.regionCommissionPowerRate = object.regionCommissionPowerRate;
    } else {
      message.regionCommissionPowerRate = "";
    }
    if (
      object.delegatorsCommissionPowerAmount !== undefined &&
      object.delegatorsCommissionPowerAmount !== null
    ) {
      message.delegatorsCommissionPowerAmount =
        object.delegatorsCommissionPowerAmount;
    } else {
      message.delegatorsCommissionPowerAmount = "";
    }
    if (
      object.delegatorsCommissionPowerRate !== undefined &&
      object.delegatorsCommissionPowerRate !== null
    ) {
      message.delegatorsCommissionPowerRate =
        object.delegatorsCommissionPowerRate;
    } else {
      message.delegatorsCommissionPowerRate = "";
    }
    if (
      object.delegatorsBondDenomAmount !== undefined &&
      object.delegatorsBondDenomAmount !== null
    ) {
      message.delegatorsBondDenomAmount = object.delegatorsBondDenomAmount;
    } else {
      message.delegatorsBondDenomAmount = "";
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
    if (object.accountName !== undefined && object.accountName !== null) {
      message.accountName = object.accountName;
    } else {
      message.accountName = "";
    }
    if (object.accountAddress !== undefined && object.accountAddress !== null) {
      message.accountAddress = object.accountAddress;
    } else {
      message.accountAddress = "";
    }
    if (object.jailed !== undefined && object.jailed !== null) {
      message.jailed = object.jailed;
    } else {
      message.jailed = false;
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
