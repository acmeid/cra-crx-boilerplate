/* eslint-disable */
// @ts-nocheck
// import * as Long from "long";
import Long from "long"
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srvault";

export enum KYC_ROLE {
  KYC_ROLE_USER = 0,
  KYC_ROLE_ADMIN = 1,
  UNRECOGNIZED = -1,
}

export function kYC_ROLEFromJSON(object: any): KYC_ROLE {
  switch (object) {
    case 0:
    case "KYC_ROLE_USER":
      return KYC_ROLE.KYC_ROLE_USER;
    case 1:
    case "KYC_ROLE_ADMIN":
      return KYC_ROLE.KYC_ROLE_ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KYC_ROLE.UNRECOGNIZED;
  }
}

export function kYC_ROLEToJSON(object: KYC_ROLE): string {
  switch (object) {
    case KYC_ROLE.KYC_ROLE_USER:
      return "KYC_ROLE_USER";
    case KYC_ROLE.KYC_ROLE_ADMIN:
      return "KYC_ROLE_ADMIN";
    default:
      return "UNKNOWN";
  }
}

export interface Kyc {
  account: string;
  regionId: string;
  LastClearHeight: number;
  role: KYC_ROLE;
  AgAmount: string;
  minStaking: string;
  maxStaking: string;
}

const baseKyc: object = {
  account: "",
  regionId: "",
  LastClearHeight: 0,
  role: 0,
  AgAmount: "",
  minStaking: "",
  maxStaking: "",
};

export const Kyc = {
  encode(message: Kyc, writer: Writer = Writer.create()): Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.regionId !== "") {
      writer.uint32(18).string(message.regionId);
    }
    if (message.LastClearHeight !== 0) {
      writer.uint32(24).int64(message.LastClearHeight);
    }
    if (message.role !== 0) {
      writer.uint32(32).int32(message.role);
    }
    if (message.AgAmount !== "") {
      writer.uint32(42).string(message.AgAmount);
    }
    if (message.minStaking !== "") {
      writer.uint32(50).string(message.minStaking);
    }
    if (message.maxStaking !== "") {
      writer.uint32(58).string(message.maxStaking);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Kyc {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKyc } as Kyc;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.regionId = reader.string();
          break;
        case 3:
          message.LastClearHeight = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.role = reader.int32() as any;
          break;
        case 5:
          message.AgAmount = reader.string();
          break;
        case 6:
          message.minStaking = reader.string();
          break;
        case 7:
          message.maxStaking = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Kyc {
    const message = { ...baseKyc } as Kyc;
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
    if (
      object.LastClearHeight !== undefined &&
      object.LastClearHeight !== null
    ) {
      message.LastClearHeight = Number(object.LastClearHeight);
    } else {
      message.LastClearHeight = 0;
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = kYC_ROLEFromJSON(object.role);
    } else {
      message.role = 0;
    }
    if (object.AgAmount !== undefined && object.AgAmount !== null) {
      message.AgAmount = String(object.AgAmount);
    } else {
      message.AgAmount = "";
    }
    if (object.minStaking !== undefined && object.minStaking !== null) {
      message.minStaking = String(object.minStaking);
    } else {
      message.minStaking = "";
    }
    if (object.maxStaking !== undefined && object.maxStaking !== null) {
      message.maxStaking = String(object.maxStaking);
    } else {
      message.maxStaking = "";
    }
    return message;
  },

  toJSON(message: Kyc): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.LastClearHeight !== undefined &&
      (obj.LastClearHeight = message.LastClearHeight);
    message.role !== undefined && (obj.role = kYC_ROLEToJSON(message.role));
    message.AgAmount !== undefined && (obj.AgAmount = message.AgAmount);
    message.minStaking !== undefined && (obj.minStaking = message.minStaking);
    message.maxStaking !== undefined && (obj.maxStaking = message.maxStaking);
    return obj;
  },

  fromPartial(object: DeepPartial<Kyc>): Kyc {
    const message = { ...baseKyc } as Kyc;
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
    if (
      object.LastClearHeight !== undefined &&
      object.LastClearHeight !== null
    ) {
      message.LastClearHeight = object.LastClearHeight;
    } else {
      message.LastClearHeight = 0;
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = 0;
    }
    if (object.AgAmount !== undefined && object.AgAmount !== null) {
      message.AgAmount = object.AgAmount;
    } else {
      message.AgAmount = "";
    }
    if (object.minStaking !== undefined && object.minStaking !== null) {
      message.minStaking = object.minStaking;
    } else {
      message.minStaking = "";
    }
    if (object.maxStaking !== undefined && object.maxStaking !== null) {
      message.maxStaking = object.maxStaking;
    } else {
      message.maxStaking = "";
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
