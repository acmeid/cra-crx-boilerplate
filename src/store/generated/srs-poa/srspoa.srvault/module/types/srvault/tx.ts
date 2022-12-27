/* eslint-disable */
// @ts-nocheck
import {
  FixedDepositPeriod,
  fixedDepositPeriodFromJSON,
  fixedDepositPeriodToJSON,
} from "../srvault/fixed_deposit";
import { KYC_ROLE, kYC_ROLEFromJSON, kYC_ROLEToJSON } from "../srvault/kyc";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "srspoa.srvault";

export interface MsgAgToAc {
  account: string;
  agAmount: string;
}

export interface MsgAgToAcResponse {
  retcode: string;
}

export interface MsgDoFixedDeposit {
  account: string;
  denom: string;
  amount: string;
  period: FixedDepositPeriod;
}

export interface MsgDoFixedDepositResponse {
  id: number;
}

export interface MsgDoFixedWithdraw {
  account: string;
  id: number;
}

export interface MsgDoFixedWithdrawResponse {
  retcode: string;
}

export interface MsgNewKyc {
  creator: string;
  account: string;
  regionId: string;
  role: KYC_ROLE;
  maxStaking: string;
}

export interface MsgNewKycResponse {
  retcode: string;
}

export interface MsgRemoveKyc {
  creator: string;
  account: string;
}

export interface MsgRemoveKycResponse {
  retcode: string;
}

export interface MsgSetFixedDepositInterestRate {
  admin: string;
  regionId: string;
  rate: string;
  depositPeiod: FixedDepositPeriod;
}

export interface MsgSetFixedDepositInterestRateResponse {
  retcode: string;
}

export interface MsgSetRegionFeeRate {
  admin: string;
  regionId: string;
  feeRate: string;
}

export interface MsgSetRegionFeeRateResponse {
  retcode: string;
}

export interface MsgSetKycMaxStaking {
  admin: string;
  account: string;
  maxValue: string;
}

export interface MsgSetKycMaxStakingResponse {
  retcode: string;
}

const baseMsgAgToAc: object = { account: "", agAmount: "" };

export const MsgAgToAc = {
  encode(message: MsgAgToAc, writer: Writer = Writer.create()): Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.agAmount !== "") {
      writer.uint32(18).string(message.agAmount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAgToAc {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAgToAc } as MsgAgToAc;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.agAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAgToAc {
    const message = { ...baseMsgAgToAc } as MsgAgToAc;
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.agAmount !== undefined && object.agAmount !== null) {
      message.agAmount = String(object.agAmount);
    } else {
      message.agAmount = "";
    }
    return message;
  },

  toJSON(message: MsgAgToAc): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.agAmount !== undefined && (obj.agAmount = message.agAmount);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAgToAc>): MsgAgToAc {
    const message = { ...baseMsgAgToAc } as MsgAgToAc;
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.agAmount !== undefined && object.agAmount !== null) {
      message.agAmount = object.agAmount;
    } else {
      message.agAmount = "";
    }
    return message;
  },
};

const baseMsgAgToAcResponse: object = { retcode: "" };

export const MsgAgToAcResponse = {
  encode(message: MsgAgToAcResponse, writer: Writer = Writer.create()): Writer {
    if (message.retcode !== "") {
      writer.uint32(10).string(message.retcode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAgToAcResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAgToAcResponse } as MsgAgToAcResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retcode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAgToAcResponse {
    const message = { ...baseMsgAgToAcResponse } as MsgAgToAcResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = String(object.retcode);
    } else {
      message.retcode = "";
    }
    return message;
  },

  toJSON(message: MsgAgToAcResponse): unknown {
    const obj: any = {};
    message.retcode !== undefined && (obj.retcode = message.retcode);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAgToAcResponse>): MsgAgToAcResponse {
    const message = { ...baseMsgAgToAcResponse } as MsgAgToAcResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = object.retcode;
    } else {
      message.retcode = "";
    }
    return message;
  },
};

const baseMsgDoFixedDeposit: object = {
  account: "",
  denom: "",
  amount: "",
  period: 0,
};

export const MsgDoFixedDeposit = {
  encode(message: MsgDoFixedDeposit, writer: Writer = Writer.create()): Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.period !== 0) {
      writer.uint32(32).int32(message.period);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDoFixedDeposit {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDoFixedDeposit } as MsgDoFixedDeposit;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.period = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDoFixedDeposit {
    const message = { ...baseMsgDoFixedDeposit } as MsgDoFixedDeposit;
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom);
    } else {
      message.denom = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = String(object.amount);
    } else {
      message.amount = "";
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = fixedDepositPeriodFromJSON(object.period);
    } else {
      message.period = 0;
    }
    return message;
  },

  toJSON(message: MsgDoFixedDeposit): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.denom !== undefined && (obj.denom = message.denom);
    message.amount !== undefined && (obj.amount = message.amount);
    message.period !== undefined &&
      (obj.period = fixedDepositPeriodToJSON(message.period));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDoFixedDeposit>): MsgDoFixedDeposit {
    const message = { ...baseMsgDoFixedDeposit } as MsgDoFixedDeposit;
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    } else {
      message.denom = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = "";
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = object.period;
    } else {
      message.period = 0;
    }
    return message;
  },
};

const baseMsgDoFixedDepositResponse: object = { id: 0 };

export const MsgDoFixedDepositResponse = {
  encode(
    message: MsgDoFixedDepositResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDoFixedDepositResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDoFixedDepositResponse,
    } as MsgDoFixedDepositResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDoFixedDepositResponse {
    const message = {
      ...baseMsgDoFixedDepositResponse,
    } as MsgDoFixedDepositResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDoFixedDepositResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDoFixedDepositResponse>
  ): MsgDoFixedDepositResponse {
    const message = {
      ...baseMsgDoFixedDepositResponse,
    } as MsgDoFixedDepositResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDoFixedWithdraw: object = { account: "", id: 0 };

export const MsgDoFixedWithdraw = {
  encode(
    message: MsgDoFixedWithdraw,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDoFixedWithdraw {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDoFixedWithdraw } as MsgDoFixedWithdraw;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDoFixedWithdraw {
    const message = { ...baseMsgDoFixedWithdraw } as MsgDoFixedWithdraw;
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDoFixedWithdraw): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDoFixedWithdraw>): MsgDoFixedWithdraw {
    const message = { ...baseMsgDoFixedWithdraw } as MsgDoFixedWithdraw;
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDoFixedWithdrawResponse: object = { retcode: "" };

export const MsgDoFixedWithdrawResponse = {
  encode(
    message: MsgDoFixedWithdrawResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.retcode !== "") {
      writer.uint32(10).string(message.retcode);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDoFixedWithdrawResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDoFixedWithdrawResponse,
    } as MsgDoFixedWithdrawResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retcode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDoFixedWithdrawResponse {
    const message = {
      ...baseMsgDoFixedWithdrawResponse,
    } as MsgDoFixedWithdrawResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = String(object.retcode);
    } else {
      message.retcode = "";
    }
    return message;
  },

  toJSON(message: MsgDoFixedWithdrawResponse): unknown {
    const obj: any = {};
    message.retcode !== undefined && (obj.retcode = message.retcode);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDoFixedWithdrawResponse>
  ): MsgDoFixedWithdrawResponse {
    const message = {
      ...baseMsgDoFixedWithdrawResponse,
    } as MsgDoFixedWithdrawResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = object.retcode;
    } else {
      message.retcode = "";
    }
    return message;
  },
};

const baseMsgNewKyc: object = {
  creator: "",
  account: "",
  regionId: "",
  role: 0,
  maxStaking: "",
};

export const MsgNewKyc = {
  encode(message: MsgNewKyc, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.regionId !== "") {
      writer.uint32(26).string(message.regionId);
    }
    if (message.role !== 0) {
      writer.uint32(32).int32(message.role);
    }
    if (message.maxStaking !== "") {
      writer.uint32(42).string(message.maxStaking);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgNewKyc {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgNewKyc } as MsgNewKyc;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.account = reader.string();
          break;
        case 3:
          message.regionId = reader.string();
          break;
        case 4:
          message.role = reader.int32() as any;
          break;
        case 5:
          message.maxStaking = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgNewKyc {
    const message = { ...baseMsgNewKyc } as MsgNewKyc;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = kYC_ROLEFromJSON(object.role);
    } else {
      message.role = 0;
    }
    if (object.maxStaking !== undefined && object.maxStaking !== null) {
      message.maxStaking = String(object.maxStaking);
    } else {
      message.maxStaking = "";
    }
    return message;
  },

  toJSON(message: MsgNewKyc): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.account !== undefined && (obj.account = message.account);
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.role !== undefined && (obj.role = kYC_ROLEToJSON(message.role));
    message.maxStaking !== undefined && (obj.maxStaking = message.maxStaking);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgNewKyc>): MsgNewKyc {
    const message = { ...baseMsgNewKyc } as MsgNewKyc;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = 0;
    }
    if (object.maxStaking !== undefined && object.maxStaking !== null) {
      message.maxStaking = object.maxStaking;
    } else {
      message.maxStaking = "";
    }
    return message;
  },
};

const baseMsgNewKycResponse: object = { retcode: "" };

export const MsgNewKycResponse = {
  encode(message: MsgNewKycResponse, writer: Writer = Writer.create()): Writer {
    if (message.retcode !== "") {
      writer.uint32(10).string(message.retcode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgNewKycResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgNewKycResponse } as MsgNewKycResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retcode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgNewKycResponse {
    const message = { ...baseMsgNewKycResponse } as MsgNewKycResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = String(object.retcode);
    } else {
      message.retcode = "";
    }
    return message;
  },

  toJSON(message: MsgNewKycResponse): unknown {
    const obj: any = {};
    message.retcode !== undefined && (obj.retcode = message.retcode);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgNewKycResponse>): MsgNewKycResponse {
    const message = { ...baseMsgNewKycResponse } as MsgNewKycResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = object.retcode;
    } else {
      message.retcode = "";
    }
    return message;
  },
};

const baseMsgRemoveKyc: object = { creator: "", account: "" };

export const MsgRemoveKyc = {
  encode(message: MsgRemoveKyc, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveKyc {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRemoveKyc } as MsgRemoveKyc;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.account = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveKyc {
    const message = { ...baseMsgRemoveKyc } as MsgRemoveKyc;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    return message;
  },

  toJSON(message: MsgRemoveKyc): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRemoveKyc>): MsgRemoveKyc {
    const message = { ...baseMsgRemoveKyc } as MsgRemoveKyc;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    return message;
  },
};

const baseMsgRemoveKycResponse: object = { retcode: "" };

export const MsgRemoveKycResponse = {
  encode(
    message: MsgRemoveKycResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.retcode !== "") {
      writer.uint32(10).string(message.retcode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveKycResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRemoveKycResponse } as MsgRemoveKycResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retcode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveKycResponse {
    const message = { ...baseMsgRemoveKycResponse } as MsgRemoveKycResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = String(object.retcode);
    } else {
      message.retcode = "";
    }
    return message;
  },

  toJSON(message: MsgRemoveKycResponse): unknown {
    const obj: any = {};
    message.retcode !== undefined && (obj.retcode = message.retcode);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRemoveKycResponse>): MsgRemoveKycResponse {
    const message = { ...baseMsgRemoveKycResponse } as MsgRemoveKycResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = object.retcode;
    } else {
      message.retcode = "";
    }
    return message;
  },
};

const baseMsgSetFixedDepositInterestRate: object = {
  admin: "",
  regionId: "",
  rate: "",
  depositPeiod: 0,
};

export const MsgSetFixedDepositInterestRate = {
  encode(
    message: MsgSetFixedDepositInterestRate,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.regionId !== "") {
      writer.uint32(18).string(message.regionId);
    }
    if (message.rate !== "") {
      writer.uint32(26).string(message.rate);
    }
    if (message.depositPeiod !== 0) {
      writer.uint32(32).int32(message.depositPeiod);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetFixedDepositInterestRate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetFixedDepositInterestRate,
    } as MsgSetFixedDepositInterestRate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.regionId = reader.string();
          break;
        case 3:
          message.rate = reader.string();
          break;
        case 4:
          message.depositPeiod = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetFixedDepositInterestRate {
    const message = {
      ...baseMsgSetFixedDepositInterestRate,
    } as MsgSetFixedDepositInterestRate;
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin);
    } else {
      message.admin = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = String(object.rate);
    } else {
      message.rate = "";
    }
    if (object.depositPeiod !== undefined && object.depositPeiod !== null) {
      message.depositPeiod = fixedDepositPeriodFromJSON(object.depositPeiod);
    } else {
      message.depositPeiod = 0;
    }
    return message;
  },

  toJSON(message: MsgSetFixedDepositInterestRate): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.rate !== undefined && (obj.rate = message.rate);
    message.depositPeiod !== undefined &&
      (obj.depositPeiod = fixedDepositPeriodToJSON(message.depositPeiod));
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetFixedDepositInterestRate>
  ): MsgSetFixedDepositInterestRate {
    const message = {
      ...baseMsgSetFixedDepositInterestRate,
    } as MsgSetFixedDepositInterestRate;
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    } else {
      message.admin = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = object.rate;
    } else {
      message.rate = "";
    }
    if (object.depositPeiod !== undefined && object.depositPeiod !== null) {
      message.depositPeiod = object.depositPeiod;
    } else {
      message.depositPeiod = 0;
    }
    return message;
  },
};

const baseMsgSetFixedDepositInterestRateResponse: object = { retcode: "" };

export const MsgSetFixedDepositInterestRateResponse = {
  encode(
    message: MsgSetFixedDepositInterestRateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.retcode !== "") {
      writer.uint32(10).string(message.retcode);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetFixedDepositInterestRateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetFixedDepositInterestRateResponse,
    } as MsgSetFixedDepositInterestRateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retcode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetFixedDepositInterestRateResponse {
    const message = {
      ...baseMsgSetFixedDepositInterestRateResponse,
    } as MsgSetFixedDepositInterestRateResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = String(object.retcode);
    } else {
      message.retcode = "";
    }
    return message;
  },

  toJSON(message: MsgSetFixedDepositInterestRateResponse): unknown {
    const obj: any = {};
    message.retcode !== undefined && (obj.retcode = message.retcode);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetFixedDepositInterestRateResponse>
  ): MsgSetFixedDepositInterestRateResponse {
    const message = {
      ...baseMsgSetFixedDepositInterestRateResponse,
    } as MsgSetFixedDepositInterestRateResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = object.retcode;
    } else {
      message.retcode = "";
    }
    return message;
  },
};

const baseMsgSetRegionFeeRate: object = {
  admin: "",
  regionId: "",
  feeRate: "",
};

export const MsgSetRegionFeeRate = {
  encode(
    message: MsgSetRegionFeeRate,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.regionId !== "") {
      writer.uint32(18).string(message.regionId);
    }
    if (message.feeRate !== "") {
      writer.uint32(26).string(message.feeRate);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetRegionFeeRate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetRegionFeeRate } as MsgSetRegionFeeRate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.regionId = reader.string();
          break;
        case 3:
          message.feeRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetRegionFeeRate {
    const message = { ...baseMsgSetRegionFeeRate } as MsgSetRegionFeeRate;
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin);
    } else {
      message.admin = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (object.feeRate !== undefined && object.feeRate !== null) {
      message.feeRate = String(object.feeRate);
    } else {
      message.feeRate = "";
    }
    return message;
  },

  toJSON(message: MsgSetRegionFeeRate): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.feeRate !== undefined && (obj.feeRate = message.feeRate);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetRegionFeeRate>): MsgSetRegionFeeRate {
    const message = { ...baseMsgSetRegionFeeRate } as MsgSetRegionFeeRate;
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    } else {
      message.admin = "";
    }
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (object.feeRate !== undefined && object.feeRate !== null) {
      message.feeRate = object.feeRate;
    } else {
      message.feeRate = "";
    }
    return message;
  },
};

const baseMsgSetRegionFeeRateResponse: object = { retcode: "" };

export const MsgSetRegionFeeRateResponse = {
  encode(
    message: MsgSetRegionFeeRateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.retcode !== "") {
      writer.uint32(10).string(message.retcode);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetRegionFeeRateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetRegionFeeRateResponse,
    } as MsgSetRegionFeeRateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retcode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetRegionFeeRateResponse {
    const message = {
      ...baseMsgSetRegionFeeRateResponse,
    } as MsgSetRegionFeeRateResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = String(object.retcode);
    } else {
      message.retcode = "";
    }
    return message;
  },

  toJSON(message: MsgSetRegionFeeRateResponse): unknown {
    const obj: any = {};
    message.retcode !== undefined && (obj.retcode = message.retcode);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetRegionFeeRateResponse>
  ): MsgSetRegionFeeRateResponse {
    const message = {
      ...baseMsgSetRegionFeeRateResponse,
    } as MsgSetRegionFeeRateResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = object.retcode;
    } else {
      message.retcode = "";
    }
    return message;
  },
};

const baseMsgSetKycMaxStaking: object = {
  admin: "",
  account: "",
  maxValue: "",
};

export const MsgSetKycMaxStaking = {
  encode(
    message: MsgSetKycMaxStaking,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.maxValue !== "") {
      writer.uint32(26).string(message.maxValue);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetKycMaxStaking {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetKycMaxStaking } as MsgSetKycMaxStaking;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.account = reader.string();
          break;
        case 3:
          message.maxValue = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetKycMaxStaking {
    const message = { ...baseMsgSetKycMaxStaking } as MsgSetKycMaxStaking;
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = String(object.admin);
    } else {
      message.admin = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.maxValue !== undefined && object.maxValue !== null) {
      message.maxValue = String(object.maxValue);
    } else {
      message.maxValue = "";
    }
    return message;
  },

  toJSON(message: MsgSetKycMaxStaking): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.account !== undefined && (obj.account = message.account);
    message.maxValue !== undefined && (obj.maxValue = message.maxValue);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetKycMaxStaking>): MsgSetKycMaxStaking {
    const message = { ...baseMsgSetKycMaxStaking } as MsgSetKycMaxStaking;
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    } else {
      message.admin = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.maxValue !== undefined && object.maxValue !== null) {
      message.maxValue = object.maxValue;
    } else {
      message.maxValue = "";
    }
    return message;
  },
};

const baseMsgSetKycMaxStakingResponse: object = { retcode: "" };

export const MsgSetKycMaxStakingResponse = {
  encode(
    message: MsgSetKycMaxStakingResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.retcode !== "") {
      writer.uint32(10).string(message.retcode);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetKycMaxStakingResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetKycMaxStakingResponse,
    } as MsgSetKycMaxStakingResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retcode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetKycMaxStakingResponse {
    const message = {
      ...baseMsgSetKycMaxStakingResponse,
    } as MsgSetKycMaxStakingResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = String(object.retcode);
    } else {
      message.retcode = "";
    }
    return message;
  },

  toJSON(message: MsgSetKycMaxStakingResponse): unknown {
    const obj: any = {};
    message.retcode !== undefined && (obj.retcode = message.retcode);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetKycMaxStakingResponse>
  ): MsgSetKycMaxStakingResponse {
    const message = {
      ...baseMsgSetKycMaxStakingResponse,
    } as MsgSetKycMaxStakingResponse;
    if (object.retcode !== undefined && object.retcode !== null) {
      message.retcode = object.retcode;
    } else {
      message.retcode = "";
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  AgToAc(request: MsgAgToAc): Promise<MsgAgToAcResponse>;
  DoFixedDeposit(
    request: MsgDoFixedDeposit
  ): Promise<MsgDoFixedDepositResponse>;
  DoFixedWithdraw(
    request: MsgDoFixedWithdraw
  ): Promise<MsgDoFixedWithdrawResponse>;
  NewKyc(request: MsgNewKyc): Promise<MsgNewKycResponse>;
  RemoveKyc(request: MsgRemoveKyc): Promise<MsgRemoveKycResponse>;
  SetFixedDepositInterestRate(
    request: MsgSetFixedDepositInterestRate
  ): Promise<MsgSetFixedDepositInterestRateResponse>;
  SetRegionFeeRate(
    request: MsgSetRegionFeeRate
  ): Promise<MsgSetRegionFeeRateResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SetKycMaxStaking(
    request: MsgSetKycMaxStaking
  ): Promise<MsgSetKycMaxStakingResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  AgToAc(request: MsgAgToAc): Promise<MsgAgToAcResponse> {
    const data = MsgAgToAc.encode(request).finish();
    const promise = this.rpc.request("srspoa.srvault.Msg", "AgToAc", data);
    return promise.then((data) => MsgAgToAcResponse.decode(new Reader(data)));
  }

  DoFixedDeposit(
    request: MsgDoFixedDeposit
  ): Promise<MsgDoFixedDepositResponse> {
    const data = MsgDoFixedDeposit.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Msg",
      "DoFixedDeposit",
      data
    );
    return promise.then((data) =>
      MsgDoFixedDepositResponse.decode(new Reader(data))
    );
  }

  DoFixedWithdraw(
    request: MsgDoFixedWithdraw
  ): Promise<MsgDoFixedWithdrawResponse> {
    const data = MsgDoFixedWithdraw.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Msg",
      "DoFixedWithdraw",
      data
    );
    return promise.then((data) =>
      MsgDoFixedWithdrawResponse.decode(new Reader(data))
    );
  }

  NewKyc(request: MsgNewKyc): Promise<MsgNewKycResponse> {
    const data = MsgNewKyc.encode(request).finish();
    const promise = this.rpc.request("srspoa.srvault.Msg", "NewKyc", data);
    return promise.then((data) => MsgNewKycResponse.decode(new Reader(data)));
  }

  RemoveKyc(request: MsgRemoveKyc): Promise<MsgRemoveKycResponse> {
    const data = MsgRemoveKyc.encode(request).finish();
    const promise = this.rpc.request("srspoa.srvault.Msg", "RemoveKyc", data);
    return promise.then((data) =>
      MsgRemoveKycResponse.decode(new Reader(data))
    );
  }

  SetFixedDepositInterestRate(
    request: MsgSetFixedDepositInterestRate
  ): Promise<MsgSetFixedDepositInterestRateResponse> {
    const data = MsgSetFixedDepositInterestRate.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Msg",
      "SetFixedDepositInterestRate",
      data
    );
    return promise.then((data) =>
      MsgSetFixedDepositInterestRateResponse.decode(new Reader(data))
    );
  }

  SetRegionFeeRate(
    request: MsgSetRegionFeeRate
  ): Promise<MsgSetRegionFeeRateResponse> {
    const data = MsgSetRegionFeeRate.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Msg",
      "SetRegionFeeRate",
      data
    );
    return promise.then((data) =>
      MsgSetRegionFeeRateResponse.decode(new Reader(data))
    );
  }

  SetKycMaxStaking(
    request: MsgSetKycMaxStaking
  ): Promise<MsgSetKycMaxStakingResponse> {
    const data = MsgSetKycMaxStaking.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Msg",
      "SetKycMaxStaking",
      data
    );
    return promise.then((data) =>
      MsgSetKycMaxStakingResponse.decode(new Reader(data))
    );
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
