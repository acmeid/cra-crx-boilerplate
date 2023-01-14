/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Description } from "../srstaking/validator";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "srspoa.srstaking";

export interface MsgCreateRegion {
  creator: string;
  regionName: string;
  regionId: string;
  commissionPowerLimit: string;
  delegatorsLimit: number;
  /** 手续费区域金库上缴国库比率 */
  regionFeeRate: string;
  /** 最低ac质押数 */
  minDelegateBondDenom: string;
  /** 区金库KYC用户质押总额度 */
  regionKYCStakeUpQuota: string;
}

export interface MsgCreateRegionResponse {}

export interface MsgUpdateRegion {
  creator: string;
  regionKey: string;
  regionName: string;
  /** 区域的最大as数限制 */
  commissionPowerLimit: string;
  /** 区域质押节点数限制 */
  delegatorsLimit: number;
  /**
   * update by YY
   * 手续费区域金库上缴国库比率
   */
  regionFeeRate: string;
  /** 最低ac质押数 */
  minDelegateBondDenom: string;
  /** 区金库KYC用户质押总额度 */
  regionKYCStakeUpQuota: string;
}

export interface MsgUpdateRegionResponse {}

export interface MsgDeleteRegion {
  creator: string;
  regionKey: string;
}

export interface MsgDeleteRegionResponse {}

export interface MsgCreateValidator {
  creator: string;
  valAddress: string;
  valPubkey: string;
  description: Description | undefined;
  RegionID: string;
}

export interface MsgCreateValidatorResponse {}

export interface MsgUpdateValidator {
  creator: string;
  valAddress: string;
  RegionID: string;
}

export interface MsgUpdateValidatorResponse {}

export interface MsgKickValidatorByAddress {
  creator: string;
  validatorAddress: string;
}

export interface MsgKickValidatorByAddressResponse {}

export interface MsgKickValidatorByPubkey {
  creator: string;
  pubkey: string;
}

export interface MsgKickValidatorByPubkeyResponse {}

export interface MsgDelegate {
  creator: string;
  delegatorAddress: string;
  amount: Coin | undefined;
}

export interface MsgDelegateResponse {}

export interface MsgUndelegate {
  creator: string;
  delegatorAddress: string;
  amount: Coin | undefined;
}

export interface MsgUndelegateResponse {}

export interface MsgExitDelegate {
  creator: string;
  delegatorAddress: string;
}

export interface MsgExitDelegateResponse {}

export interface MsgCreateDelegate {
  creator: string;
  delegatorAddress: string;
  belongRegion: string;
  amount: Coin | undefined;
}

export interface MsgCreateDelegateResponse {}

export interface MsgWithdraw {
  creator: string;
}

export interface MsgWithdrawResponse {
  receive_address: string;
  region_id: string;
  from_height: number;
  to_height: number;
  srs: string;
  src: string;
  srg: string;
}

const baseMsgCreateRegion: object = {
  creator: "",
  regionName: "",
  regionId: "",
  commissionPowerLimit: "",
  delegatorsLimit: 0,
  regionFeeRate: "",
  minDelegateBondDenom: "",
  regionKYCStakeUpQuota: "",
};

export const MsgCreateRegion = {
  encode(message: MsgCreateRegion, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.regionName !== "") {
      writer.uint32(18).string(message.regionName);
    }
    if (message.regionId !== "") {
      writer.uint32(26).string(message.regionId);
    }
    if (message.commissionPowerLimit !== "") {
      writer.uint32(34).string(message.commissionPowerLimit);
    }
    if (message.delegatorsLimit !== 0) {
      writer.uint32(40).int64(message.delegatorsLimit);
    }
    if (message.regionFeeRate !== "") {
      writer.uint32(50).string(message.regionFeeRate);
    }
    if (message.minDelegateBondDenom !== "") {
      writer.uint32(58).string(message.minDelegateBondDenom);
    }
    if (message.regionKYCStakeUpQuota !== "") {
      writer.uint32(66).string(message.regionKYCStakeUpQuota);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRegion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateRegion } as MsgCreateRegion;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.regionName = reader.string();
          break;
        case 3:
          message.regionId = reader.string();
          break;
        case 4:
          message.commissionPowerLimit = reader.string();
          break;
        case 5:
          message.delegatorsLimit = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.regionFeeRate = reader.string();
          break;
        case 7:
          message.minDelegateBondDenom = reader.string();
          break;
        case 8:
          message.regionKYCStakeUpQuota = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRegion {
    const message = { ...baseMsgCreateRegion } as MsgCreateRegion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
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
    if (
      object.delegatorsLimit !== undefined &&
      object.delegatorsLimit !== null
    ) {
      message.delegatorsLimit = Number(object.delegatorsLimit);
    } else {
      message.delegatorsLimit = 0;
    }
    if (object.regionFeeRate !== undefined && object.regionFeeRate !== null) {
      message.regionFeeRate = String(object.regionFeeRate);
    } else {
      message.regionFeeRate = "";
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
      object.regionKYCStakeUpQuota !== undefined &&
      object.regionKYCStakeUpQuota !== null
    ) {
      message.regionKYCStakeUpQuota = String(object.regionKYCStakeUpQuota);
    } else {
      message.regionKYCStakeUpQuota = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRegion): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.regionName !== undefined && (obj.regionName = message.regionName);
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.commissionPowerLimit !== undefined &&
      (obj.commissionPowerLimit = message.commissionPowerLimit);
    message.delegatorsLimit !== undefined &&
      (obj.delegatorsLimit = message.delegatorsLimit);
    message.regionFeeRate !== undefined &&
      (obj.regionFeeRate = message.regionFeeRate);
    message.minDelegateBondDenom !== undefined &&
      (obj.minDelegateBondDenom = message.minDelegateBondDenom);
    message.regionKYCStakeUpQuota !== undefined &&
      (obj.regionKYCStakeUpQuota = message.regionKYCStakeUpQuota);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateRegion>): MsgCreateRegion {
    const message = { ...baseMsgCreateRegion } as MsgCreateRegion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
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
    if (
      object.delegatorsLimit !== undefined &&
      object.delegatorsLimit !== null
    ) {
      message.delegatorsLimit = object.delegatorsLimit;
    } else {
      message.delegatorsLimit = 0;
    }
    if (object.regionFeeRate !== undefined && object.regionFeeRate !== null) {
      message.regionFeeRate = object.regionFeeRate;
    } else {
      message.regionFeeRate = "";
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

const baseMsgCreateRegionResponse: object = {};

export const MsgCreateRegionResponse = {
  encode(_: MsgCreateRegionResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRegionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateRegionResponse,
    } as MsgCreateRegionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateRegionResponse {
    const message = {
      ...baseMsgCreateRegionResponse,
    } as MsgCreateRegionResponse;
    return message;
  },

  toJSON(_: MsgCreateRegionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreateRegionResponse>
  ): MsgCreateRegionResponse {
    const message = {
      ...baseMsgCreateRegionResponse,
    } as MsgCreateRegionResponse;
    return message;
  },
};

const baseMsgUpdateRegion: object = {
  creator: "",
  regionKey: "",
  regionName: "",
  commissionPowerLimit: "",
  delegatorsLimit: 0,
  regionFeeRate: "",
  minDelegateBondDenom: "",
  regionKYCStakeUpQuota: "",
};

export const MsgUpdateRegion = {
  encode(message: MsgUpdateRegion, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.regionKey !== "") {
      writer.uint32(18).string(message.regionKey);
    }
    if (message.regionName !== "") {
      writer.uint32(26).string(message.regionName);
    }
    if (message.commissionPowerLimit !== "") {
      writer.uint32(34).string(message.commissionPowerLimit);
    }
    if (message.delegatorsLimit !== 0) {
      writer.uint32(40).int64(message.delegatorsLimit);
    }
    if (message.regionFeeRate !== "") {
      writer.uint32(50).string(message.regionFeeRate);
    }
    if (message.minDelegateBondDenom !== "") {
      writer.uint32(58).string(message.minDelegateBondDenom);
    }
    if (message.regionKYCStakeUpQuota !== "") {
      writer.uint32(66).string(message.regionKYCStakeUpQuota);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateRegion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateRegion } as MsgUpdateRegion;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.regionKey = reader.string();
          break;
        case 3:
          message.regionName = reader.string();
          break;
        case 4:
          message.commissionPowerLimit = reader.string();
          break;
        case 5:
          message.delegatorsLimit = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.regionFeeRate = reader.string();
          break;
        case 7:
          message.minDelegateBondDenom = reader.string();
          break;
        case 8:
          message.regionKYCStakeUpQuota = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRegion {
    const message = { ...baseMsgUpdateRegion } as MsgUpdateRegion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.regionKey !== undefined && object.regionKey !== null) {
      message.regionKey = String(object.regionKey);
    } else {
      message.regionKey = "";
    }
    if (object.regionName !== undefined && object.regionName !== null) {
      message.regionName = String(object.regionName);
    } else {
      message.regionName = "";
    }
    if (
      object.commissionPowerLimit !== undefined &&
      object.commissionPowerLimit !== null
    ) {
      message.commissionPowerLimit = String(object.commissionPowerLimit);
    } else {
      message.commissionPowerLimit = "";
    }
    if (
      object.delegatorsLimit !== undefined &&
      object.delegatorsLimit !== null
    ) {
      message.delegatorsLimit = Number(object.delegatorsLimit);
    } else {
      message.delegatorsLimit = 0;
    }
    if (object.regionFeeRate !== undefined && object.regionFeeRate !== null) {
      message.regionFeeRate = String(object.regionFeeRate);
    } else {
      message.regionFeeRate = "";
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
      object.regionKYCStakeUpQuota !== undefined &&
      object.regionKYCStakeUpQuota !== null
    ) {
      message.regionKYCStakeUpQuota = String(object.regionKYCStakeUpQuota);
    } else {
      message.regionKYCStakeUpQuota = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateRegion): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.regionKey !== undefined && (obj.regionKey = message.regionKey);
    message.regionName !== undefined && (obj.regionName = message.regionName);
    message.commissionPowerLimit !== undefined &&
      (obj.commissionPowerLimit = message.commissionPowerLimit);
    message.delegatorsLimit !== undefined &&
      (obj.delegatorsLimit = message.delegatorsLimit);
    message.regionFeeRate !== undefined &&
      (obj.regionFeeRate = message.regionFeeRate);
    message.minDelegateBondDenom !== undefined &&
      (obj.minDelegateBondDenom = message.minDelegateBondDenom);
    message.regionKYCStakeUpQuota !== undefined &&
      (obj.regionKYCStakeUpQuota = message.regionKYCStakeUpQuota);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateRegion>): MsgUpdateRegion {
    const message = { ...baseMsgUpdateRegion } as MsgUpdateRegion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.regionKey !== undefined && object.regionKey !== null) {
      message.regionKey = object.regionKey;
    } else {
      message.regionKey = "";
    }
    if (object.regionName !== undefined && object.regionName !== null) {
      message.regionName = object.regionName;
    } else {
      message.regionName = "";
    }
    if (
      object.commissionPowerLimit !== undefined &&
      object.commissionPowerLimit !== null
    ) {
      message.commissionPowerLimit = object.commissionPowerLimit;
    } else {
      message.commissionPowerLimit = "";
    }
    if (
      object.delegatorsLimit !== undefined &&
      object.delegatorsLimit !== null
    ) {
      message.delegatorsLimit = object.delegatorsLimit;
    } else {
      message.delegatorsLimit = 0;
    }
    if (object.regionFeeRate !== undefined && object.regionFeeRate !== null) {
      message.regionFeeRate = object.regionFeeRate;
    } else {
      message.regionFeeRate = "";
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

const baseMsgUpdateRegionResponse: object = {};

export const MsgUpdateRegionResponse = {
  encode(_: MsgUpdateRegionResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateRegionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRegionResponse,
    } as MsgUpdateRegionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateRegionResponse {
    const message = {
      ...baseMsgUpdateRegionResponse,
    } as MsgUpdateRegionResponse;
    return message;
  },

  toJSON(_: MsgUpdateRegionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateRegionResponse>
  ): MsgUpdateRegionResponse {
    const message = {
      ...baseMsgUpdateRegionResponse,
    } as MsgUpdateRegionResponse;
    return message;
  },
};

const baseMsgDeleteRegion: object = { creator: "", regionKey: "" };

export const MsgDeleteRegion = {
  encode(message: MsgDeleteRegion, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.regionKey !== "") {
      writer.uint32(18).string(message.regionKey);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteRegion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteRegion } as MsgDeleteRegion;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.regionKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteRegion {
    const message = { ...baseMsgDeleteRegion } as MsgDeleteRegion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.regionKey !== undefined && object.regionKey !== null) {
      message.regionKey = String(object.regionKey);
    } else {
      message.regionKey = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteRegion): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.regionKey !== undefined && (obj.regionKey = message.regionKey);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteRegion>): MsgDeleteRegion {
    const message = { ...baseMsgDeleteRegion } as MsgDeleteRegion;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.regionKey !== undefined && object.regionKey !== null) {
      message.regionKey = object.regionKey;
    } else {
      message.regionKey = "";
    }
    return message;
  },
};

const baseMsgDeleteRegionResponse: object = {};

export const MsgDeleteRegionResponse = {
  encode(_: MsgDeleteRegionResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteRegionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteRegionResponse,
    } as MsgDeleteRegionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteRegionResponse {
    const message = {
      ...baseMsgDeleteRegionResponse,
    } as MsgDeleteRegionResponse;
    return message;
  },

  toJSON(_: MsgDeleteRegionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteRegionResponse>
  ): MsgDeleteRegionResponse {
    const message = {
      ...baseMsgDeleteRegionResponse,
    } as MsgDeleteRegionResponse;
    return message;
  },
};

const baseMsgCreateValidator: object = {
  creator: "",
  valAddress: "",
  valPubkey: "",
  RegionID: "",
};

export const MsgCreateValidator = {
  encode(
    message: MsgCreateValidator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.valAddress !== "") {
      writer.uint32(18).string(message.valAddress);
    }
    if (message.valPubkey !== "") {
      writer.uint32(26).string(message.valPubkey);
    }
    if (message.description !== undefined) {
      Description.encode(
        message.description,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.RegionID !== "") {
      writer.uint32(42).string(message.RegionID);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateValidator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateValidator } as MsgCreateValidator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.valAddress = reader.string();
          break;
        case 3:
          message.valPubkey = reader.string();
          break;
        case 4:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 5:
          message.RegionID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateValidator {
    const message = { ...baseMsgCreateValidator } as MsgCreateValidator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.valAddress !== undefined && object.valAddress !== null) {
      message.valAddress = String(object.valAddress);
    } else {
      message.valAddress = "";
    }
    if (object.valPubkey !== undefined && object.valPubkey !== null) {
      message.valPubkey = String(object.valPubkey);
    } else {
      message.valPubkey = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromJSON(object.description);
    } else {
      message.description = undefined;
    }
    if (object.RegionID !== undefined && object.RegionID !== null) {
      message.RegionID = String(object.RegionID);
    } else {
      message.RegionID = "";
    }
    return message;
  },

  toJSON(message: MsgCreateValidator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.valAddress !== undefined && (obj.valAddress = message.valAddress);
    message.valPubkey !== undefined && (obj.valPubkey = message.valPubkey);
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    message.RegionID !== undefined && (obj.RegionID = message.RegionID);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateValidator>): MsgCreateValidator {
    const message = { ...baseMsgCreateValidator } as MsgCreateValidator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.valAddress !== undefined && object.valAddress !== null) {
      message.valAddress = object.valAddress;
    } else {
      message.valAddress = "";
    }
    if (object.valPubkey !== undefined && object.valPubkey !== null) {
      message.valPubkey = object.valPubkey;
    } else {
      message.valPubkey = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromPartial(object.description);
    } else {
      message.description = undefined;
    }
    if (object.RegionID !== undefined && object.RegionID !== null) {
      message.RegionID = object.RegionID;
    } else {
      message.RegionID = "";
    }
    return message;
  },
};

const baseMsgCreateValidatorResponse: object = {};

export const MsgCreateValidatorResponse = {
  encode(
    _: MsgCreateValidatorResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateValidatorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateValidatorResponse,
    } as MsgCreateValidatorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateValidatorResponse {
    const message = {
      ...baseMsgCreateValidatorResponse,
    } as MsgCreateValidatorResponse;
    return message;
  },

  toJSON(_: MsgCreateValidatorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreateValidatorResponse>
  ): MsgCreateValidatorResponse {
    const message = {
      ...baseMsgCreateValidatorResponse,
    } as MsgCreateValidatorResponse;
    return message;
  },
};

const baseMsgUpdateValidator: object = {
  creator: "",
  valAddress: "",
  RegionID: "",
};

export const MsgUpdateValidator = {
  encode(
    message: MsgUpdateValidator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.valAddress !== "") {
      writer.uint32(18).string(message.valAddress);
    }
    if (message.RegionID !== "") {
      writer.uint32(26).string(message.RegionID);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateValidator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateValidator } as MsgUpdateValidator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.valAddress = reader.string();
          break;
        case 3:
          message.RegionID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateValidator {
    const message = { ...baseMsgUpdateValidator } as MsgUpdateValidator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.valAddress !== undefined && object.valAddress !== null) {
      message.valAddress = String(object.valAddress);
    } else {
      message.valAddress = "";
    }
    if (object.RegionID !== undefined && object.RegionID !== null) {
      message.RegionID = String(object.RegionID);
    } else {
      message.RegionID = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateValidator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.valAddress !== undefined && (obj.valAddress = message.valAddress);
    message.RegionID !== undefined && (obj.RegionID = message.RegionID);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateValidator>): MsgUpdateValidator {
    const message = { ...baseMsgUpdateValidator } as MsgUpdateValidator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.valAddress !== undefined && object.valAddress !== null) {
      message.valAddress = object.valAddress;
    } else {
      message.valAddress = "";
    }
    if (object.RegionID !== undefined && object.RegionID !== null) {
      message.RegionID = object.RegionID;
    } else {
      message.RegionID = "";
    }
    return message;
  },
};

const baseMsgUpdateValidatorResponse: object = {};

export const MsgUpdateValidatorResponse = {
  encode(
    _: MsgUpdateValidatorResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateValidatorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateValidatorResponse,
    } as MsgUpdateValidatorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateValidatorResponse {
    const message = {
      ...baseMsgUpdateValidatorResponse,
    } as MsgUpdateValidatorResponse;
    return message;
  },

  toJSON(_: MsgUpdateValidatorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateValidatorResponse>
  ): MsgUpdateValidatorResponse {
    const message = {
      ...baseMsgUpdateValidatorResponse,
    } as MsgUpdateValidatorResponse;
    return message;
  },
};

const baseMsgKickValidatorByAddress: object = {
  creator: "",
  validatorAddress: "",
};

export const MsgKickValidatorByAddress = {
  encode(
    message: MsgKickValidatorByAddress,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgKickValidatorByAddress {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgKickValidatorByAddress,
    } as MsgKickValidatorByAddress;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgKickValidatorByAddress {
    const message = {
      ...baseMsgKickValidatorByAddress,
    } as MsgKickValidatorByAddress;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.validatorAddress !== undefined &&
      object.validatorAddress !== null
    ) {
      message.validatorAddress = String(object.validatorAddress);
    } else {
      message.validatorAddress = "";
    }
    return message;
  },

  toJSON(message: MsgKickValidatorByAddress): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.validatorAddress !== undefined &&
      (obj.validatorAddress = message.validatorAddress);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgKickValidatorByAddress>
  ): MsgKickValidatorByAddress {
    const message = {
      ...baseMsgKickValidatorByAddress,
    } as MsgKickValidatorByAddress;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.validatorAddress !== undefined &&
      object.validatorAddress !== null
    ) {
      message.validatorAddress = object.validatorAddress;
    } else {
      message.validatorAddress = "";
    }
    return message;
  },
};

const baseMsgKickValidatorByAddressResponse: object = {};

export const MsgKickValidatorByAddressResponse = {
  encode(
    _: MsgKickValidatorByAddressResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgKickValidatorByAddressResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgKickValidatorByAddressResponse,
    } as MsgKickValidatorByAddressResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgKickValidatorByAddressResponse {
    const message = {
      ...baseMsgKickValidatorByAddressResponse,
    } as MsgKickValidatorByAddressResponse;
    return message;
  },

  toJSON(_: MsgKickValidatorByAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgKickValidatorByAddressResponse>
  ): MsgKickValidatorByAddressResponse {
    const message = {
      ...baseMsgKickValidatorByAddressResponse,
    } as MsgKickValidatorByAddressResponse;
    return message;
  },
};

const baseMsgKickValidatorByPubkey: object = { creator: "", pubkey: "" };

export const MsgKickValidatorByPubkey = {
  encode(
    message: MsgKickValidatorByPubkey,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pubkey !== "") {
      writer.uint32(18).string(message.pubkey);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgKickValidatorByPubkey {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgKickValidatorByPubkey,
    } as MsgKickValidatorByPubkey;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pubkey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgKickValidatorByPubkey {
    const message = {
      ...baseMsgKickValidatorByPubkey,
    } as MsgKickValidatorByPubkey;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = String(object.pubkey);
    } else {
      message.pubkey = "";
    }
    return message;
  },

  toJSON(message: MsgKickValidatorByPubkey): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.pubkey !== undefined && (obj.pubkey = message.pubkey);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgKickValidatorByPubkey>
  ): MsgKickValidatorByPubkey {
    const message = {
      ...baseMsgKickValidatorByPubkey,
    } as MsgKickValidatorByPubkey;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = object.pubkey;
    } else {
      message.pubkey = "";
    }
    return message;
  },
};

const baseMsgKickValidatorByPubkeyResponse: object = {};

export const MsgKickValidatorByPubkeyResponse = {
  encode(
    _: MsgKickValidatorByPubkeyResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgKickValidatorByPubkeyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgKickValidatorByPubkeyResponse,
    } as MsgKickValidatorByPubkeyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgKickValidatorByPubkeyResponse {
    const message = {
      ...baseMsgKickValidatorByPubkeyResponse,
    } as MsgKickValidatorByPubkeyResponse;
    return message;
  },

  toJSON(_: MsgKickValidatorByPubkeyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgKickValidatorByPubkeyResponse>
  ): MsgKickValidatorByPubkeyResponse {
    const message = {
      ...baseMsgKickValidatorByPubkeyResponse,
    } as MsgKickValidatorByPubkeyResponse;
    return message;
  },
};

const baseMsgDelegate: object = { creator: "", delegatorAddress: "" };

export const MsgDelegate = {
  encode(message: MsgDelegate, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(18).string(message.delegatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDelegate } as MsgDelegate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.delegatorAddress = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDelegate {
    const message = { ...baseMsgDelegate } as MsgDelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = String(object.delegatorAddress);
    } else {
      message.delegatorAddress = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromJSON(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },

  toJSON(message: MsgDelegate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.delegatorAddress !== undefined &&
      (obj.delegatorAddress = message.delegatorAddress);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDelegate>): MsgDelegate {
    const message = { ...baseMsgDelegate } as MsgDelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = object.delegatorAddress;
    } else {
      message.delegatorAddress = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromPartial(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },
};

const baseMsgDelegateResponse: object = {};

export const MsgDelegateResponse = {
  encode(_: MsgDelegateResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDelegateResponse } as MsgDelegateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDelegateResponse {
    const message = { ...baseMsgDelegateResponse } as MsgDelegateResponse;
    return message;
  },

  toJSON(_: MsgDelegateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDelegateResponse>): MsgDelegateResponse {
    const message = { ...baseMsgDelegateResponse } as MsgDelegateResponse;
    return message;
  },
};

const baseMsgUndelegate: object = { creator: "", delegatorAddress: "" };

export const MsgUndelegate = {
  encode(message: MsgUndelegate, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(18).string(message.delegatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUndelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUndelegate } as MsgUndelegate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.delegatorAddress = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUndelegate {
    const message = { ...baseMsgUndelegate } as MsgUndelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = String(object.delegatorAddress);
    } else {
      message.delegatorAddress = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromJSON(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },

  toJSON(message: MsgUndelegate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.delegatorAddress !== undefined &&
      (obj.delegatorAddress = message.delegatorAddress);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUndelegate>): MsgUndelegate {
    const message = { ...baseMsgUndelegate } as MsgUndelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = object.delegatorAddress;
    } else {
      message.delegatorAddress = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromPartial(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },
};

const baseMsgUndelegateResponse: object = {};

export const MsgUndelegateResponse = {
  encode(_: MsgUndelegateResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUndelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUndelegateResponse } as MsgUndelegateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUndelegateResponse {
    const message = { ...baseMsgUndelegateResponse } as MsgUndelegateResponse;
    return message;
  },

  toJSON(_: MsgUndelegateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUndelegateResponse>): MsgUndelegateResponse {
    const message = { ...baseMsgUndelegateResponse } as MsgUndelegateResponse;
    return message;
  },
};

const baseMsgExitDelegate: object = { creator: "", delegatorAddress: "" };

export const MsgExitDelegate = {
  encode(message: MsgExitDelegate, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(18).string(message.delegatorAddress);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgExitDelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgExitDelegate } as MsgExitDelegate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExitDelegate {
    const message = { ...baseMsgExitDelegate } as MsgExitDelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = String(object.delegatorAddress);
    } else {
      message.delegatorAddress = "";
    }
    return message;
  },

  toJSON(message: MsgExitDelegate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.delegatorAddress !== undefined &&
      (obj.delegatorAddress = message.delegatorAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgExitDelegate>): MsgExitDelegate {
    const message = { ...baseMsgExitDelegate } as MsgExitDelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = object.delegatorAddress;
    } else {
      message.delegatorAddress = "";
    }
    return message;
  },
};

const baseMsgExitDelegateResponse: object = {};

export const MsgExitDelegateResponse = {
  encode(_: MsgExitDelegateResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgExitDelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgExitDelegateResponse,
    } as MsgExitDelegateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgExitDelegateResponse {
    const message = {
      ...baseMsgExitDelegateResponse,
    } as MsgExitDelegateResponse;
    return message;
  },

  toJSON(_: MsgExitDelegateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgExitDelegateResponse>
  ): MsgExitDelegateResponse {
    const message = {
      ...baseMsgExitDelegateResponse,
    } as MsgExitDelegateResponse;
    return message;
  },
};

const baseMsgCreateDelegate: object = {
  creator: "",
  delegatorAddress: "",
  belongRegion: "",
};

export const MsgCreateDelegate = {
  encode(message: MsgCreateDelegate, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(18).string(message.delegatorAddress);
    }
    if (message.belongRegion !== "") {
      writer.uint32(26).string(message.belongRegion);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateDelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateDelegate } as MsgCreateDelegate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.delegatorAddress = reader.string();
          break;
        case 3:
          message.belongRegion = reader.string();
          break;
        case 4:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDelegate {
    const message = { ...baseMsgCreateDelegate } as MsgCreateDelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = String(object.delegatorAddress);
    } else {
      message.delegatorAddress = "";
    }
    if (object.belongRegion !== undefined && object.belongRegion !== null) {
      message.belongRegion = String(object.belongRegion);
    } else {
      message.belongRegion = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromJSON(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },

  toJSON(message: MsgCreateDelegate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.delegatorAddress !== undefined &&
      (obj.delegatorAddress = message.delegatorAddress);
    message.belongRegion !== undefined &&
      (obj.belongRegion = message.belongRegion);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateDelegate>): MsgCreateDelegate {
    const message = { ...baseMsgCreateDelegate } as MsgCreateDelegate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = object.delegatorAddress;
    } else {
      message.delegatorAddress = "";
    }
    if (object.belongRegion !== undefined && object.belongRegion !== null) {
      message.belongRegion = object.belongRegion;
    } else {
      message.belongRegion = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromPartial(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },
};

const baseMsgCreateDelegateResponse: object = {};

export const MsgCreateDelegateResponse = {
  encode(
    _: MsgCreateDelegateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateDelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateDelegateResponse,
    } as MsgCreateDelegateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateDelegateResponse {
    const message = {
      ...baseMsgCreateDelegateResponse,
    } as MsgCreateDelegateResponse;
    return message;
  },

  toJSON(_: MsgCreateDelegateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreateDelegateResponse>
  ): MsgCreateDelegateResponse {
    const message = {
      ...baseMsgCreateDelegateResponse,
    } as MsgCreateDelegateResponse;
    return message;
  },
};

const baseMsgWithdraw: object = { creator: "" };

export const MsgWithdraw = {
  encode(message: MsgWithdraw, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgWithdraw {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgWithdraw } as MsgWithdraw;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdraw {
    const message = { ...baseMsgWithdraw } as MsgWithdraw;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    return message;
  },

  toJSON(message: MsgWithdraw): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgWithdraw>): MsgWithdraw {
    const message = { ...baseMsgWithdraw } as MsgWithdraw;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    return message;
  },
};

const baseMsgWithdrawResponse: object = {
  receive_address: "",
  region_id: "",
  from_height: 0,
  to_height: 0,
  srs: "",
  src: "",
  srg: "",
};

export const MsgWithdrawResponse = {
  encode(
    message: MsgWithdrawResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.receive_address !== "") {
      writer.uint32(10).string(message.receive_address);
    }
    if (message.region_id !== "") {
      writer.uint32(18).string(message.region_id);
    }
    if (message.from_height !== 0) {
      writer.uint32(24).int64(message.from_height);
    }
    if (message.to_height !== 0) {
      writer.uint32(32).int64(message.to_height);
    }
    if (message.srs !== "") {
      writer.uint32(42).string(message.srs);
    }
    if (message.src !== "") {
      writer.uint32(50).string(message.src);
    }
    if (message.srg !== "") {
      writer.uint32(58).string(message.srg);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgWithdrawResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgWithdrawResponse } as MsgWithdrawResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receive_address = reader.string();
          break;
        case 2:
          message.region_id = reader.string();
          break;
        case 3:
          message.from_height = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.to_height = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.srs = reader.string();
          break;
        case 6:
          message.src = reader.string();
          break;
        case 7:
          message.srg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawResponse {
    const message = { ...baseMsgWithdrawResponse } as MsgWithdrawResponse;
    if (
      object.receive_address !== undefined &&
      object.receive_address !== null
    ) {
      message.receive_address = String(object.receive_address);
    } else {
      message.receive_address = "";
    }
    if (object.region_id !== undefined && object.region_id !== null) {
      message.region_id = String(object.region_id);
    } else {
      message.region_id = "";
    }
    if (object.from_height !== undefined && object.from_height !== null) {
      message.from_height = Number(object.from_height);
    } else {
      message.from_height = 0;
    }
    if (object.to_height !== undefined && object.to_height !== null) {
      message.to_height = Number(object.to_height);
    } else {
      message.to_height = 0;
    }
    if (object.srs !== undefined && object.srs !== null) {
      message.srs = String(object.srs);
    } else {
      message.srs = "";
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = String(object.src);
    } else {
      message.src = "";
    }
    if (object.srg !== undefined && object.srg !== null) {
      message.srg = String(object.srg);
    } else {
      message.srg = "";
    }
    return message;
  },

  toJSON(message: MsgWithdrawResponse): unknown {
    const obj: any = {};
    message.receive_address !== undefined &&
      (obj.receive_address = message.receive_address);
    message.region_id !== undefined && (obj.region_id = message.region_id);
    message.from_height !== undefined &&
      (obj.from_height = message.from_height);
    message.to_height !== undefined && (obj.to_height = message.to_height);
    message.srs !== undefined && (obj.srs = message.srs);
    message.src !== undefined && (obj.src = message.src);
    message.srg !== undefined && (obj.srg = message.srg);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgWithdrawResponse>): MsgWithdrawResponse {
    const message = { ...baseMsgWithdrawResponse } as MsgWithdrawResponse;
    if (
      object.receive_address !== undefined &&
      object.receive_address !== null
    ) {
      message.receive_address = object.receive_address;
    } else {
      message.receive_address = "";
    }
    if (object.region_id !== undefined && object.region_id !== null) {
      message.region_id = object.region_id;
    } else {
      message.region_id = "";
    }
    if (object.from_height !== undefined && object.from_height !== null) {
      message.from_height = object.from_height;
    } else {
      message.from_height = 0;
    }
    if (object.to_height !== undefined && object.to_height !== null) {
      message.to_height = object.to_height;
    } else {
      message.to_height = 0;
    }
    if (object.srs !== undefined && object.srs !== null) {
      message.srs = object.srs;
    } else {
      message.srs = "";
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = object.src;
    } else {
      message.src = "";
    }
    if (object.srg !== undefined && object.srg !== null) {
      message.srg = object.srg;
    } else {
      message.srg = "";
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateRegion(request: MsgCreateRegion): Promise<MsgCreateRegionResponse>;
  UpdateRegion(request: MsgUpdateRegion): Promise<MsgUpdateRegionResponse>;
  DeleteRegion(request: MsgDeleteRegion): Promise<MsgDeleteRegionResponse>;
  CreateValidator(
    request: MsgCreateValidator
  ): Promise<MsgCreateValidatorResponse>;
  UpdateValidator(
    request: MsgUpdateValidator
  ): Promise<MsgUpdateValidatorResponse>;
  KickValidatorByAddress(
    request: MsgKickValidatorByAddress
  ): Promise<MsgKickValidatorByAddressResponse>;
  KickValidatorByPubkey(
    request: MsgKickValidatorByPubkey
  ): Promise<MsgKickValidatorByPubkeyResponse>;
  Delegate(request: MsgDelegate): Promise<MsgDelegateResponse>;
  Undelegate(request: MsgUndelegate): Promise<MsgUndelegateResponse>;
  ExitDelegate(request: MsgExitDelegate): Promise<MsgExitDelegateResponse>;
  CreateDelegate(
    request: MsgCreateDelegate
  ): Promise<MsgCreateDelegateResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Withdraw(request: MsgWithdraw): Promise<MsgWithdrawResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateRegion(request: MsgCreateRegion): Promise<MsgCreateRegionResponse> {
    const data = MsgCreateRegion.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "CreateRegion",
      data
    );
    return promise.then((data) =>
      MsgCreateRegionResponse.decode(new Reader(data))
    );
  }

  UpdateRegion(request: MsgUpdateRegion): Promise<MsgUpdateRegionResponse> {
    const data = MsgUpdateRegion.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "UpdateRegion",
      data
    );
    return promise.then((data) =>
      MsgUpdateRegionResponse.decode(new Reader(data))
    );
  }

  DeleteRegion(request: MsgDeleteRegion): Promise<MsgDeleteRegionResponse> {
    const data = MsgDeleteRegion.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "DeleteRegion",
      data
    );
    return promise.then((data) =>
      MsgDeleteRegionResponse.decode(new Reader(data))
    );
  }

  CreateValidator(
    request: MsgCreateValidator
  ): Promise<MsgCreateValidatorResponse> {
    const data = MsgCreateValidator.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "CreateValidator",
      data
    );
    return promise.then((data) =>
      MsgCreateValidatorResponse.decode(new Reader(data))
    );
  }

  UpdateValidator(
    request: MsgUpdateValidator
  ): Promise<MsgUpdateValidatorResponse> {
    const data = MsgUpdateValidator.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "UpdateValidator",
      data
    );
    return promise.then((data) =>
      MsgUpdateValidatorResponse.decode(new Reader(data))
    );
  }

  KickValidatorByAddress(
    request: MsgKickValidatorByAddress
  ): Promise<MsgKickValidatorByAddressResponse> {
    const data = MsgKickValidatorByAddress.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "KickValidatorByAddress",
      data
    );
    return promise.then((data) =>
      MsgKickValidatorByAddressResponse.decode(new Reader(data))
    );
  }

  KickValidatorByPubkey(
    request: MsgKickValidatorByPubkey
  ): Promise<MsgKickValidatorByPubkeyResponse> {
    const data = MsgKickValidatorByPubkey.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "KickValidatorByPubkey",
      data
    );
    return promise.then((data) =>
      MsgKickValidatorByPubkeyResponse.decode(new Reader(data))
    );
  }

  Delegate(request: MsgDelegate): Promise<MsgDelegateResponse> {
    const data = MsgDelegate.encode(request).finish();
    const promise = this.rpc.request("srspoa.srstaking.Msg", "Delegate", data);
    return promise.then((data) => MsgDelegateResponse.decode(new Reader(data)));
  }

  Undelegate(request: MsgUndelegate): Promise<MsgUndelegateResponse> {
    const data = MsgUndelegate.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "Undelegate",
      data
    );
    return promise.then((data) =>
      MsgUndelegateResponse.decode(new Reader(data))
    );
  }

  ExitDelegate(request: MsgExitDelegate): Promise<MsgExitDelegateResponse> {
    const data = MsgExitDelegate.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "ExitDelegate",
      data
    );
    return promise.then((data) =>
      MsgExitDelegateResponse.decode(new Reader(data))
    );
  }

  CreateDelegate(
    request: MsgCreateDelegate
  ): Promise<MsgCreateDelegateResponse> {
    const data = MsgCreateDelegate.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srstaking.Msg",
      "CreateDelegate",
      data
    );
    return promise.then((data) =>
      MsgCreateDelegateResponse.decode(new Reader(data))
    );
  }

  Withdraw(request: MsgWithdraw): Promise<MsgWithdrawResponse> {
    const data = MsgWithdraw.encode(request).finish();
    const promise = this.rpc.request("srspoa.srstaking.Msg", "Withdraw", data);
    return promise.then((data) => MsgWithdrawResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
