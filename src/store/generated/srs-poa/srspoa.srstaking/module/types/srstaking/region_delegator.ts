/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

export interface RegionDelegator {
  delegatorId: string;
  bondSrc: string;
  bondSrs: string;
  bondSrsRate: string;
}

const baseRegionDelegator: object = {
  delegatorId: "",
  bondSrc: "",
  bondSrs: "",
  bondSrsRate: "",
};

export const RegionDelegator = {
  encode(message: RegionDelegator, writer: Writer = Writer.create()): Writer {
    if (message.delegatorId !== "") {
      writer.uint32(10).string(message.delegatorId);
    }
    if (message.bondSrc !== "") {
      writer.uint32(18).string(message.bondSrc);
    }
    if (message.bondSrs !== "") {
      writer.uint32(26).string(message.bondSrs);
    }
    if (message.bondSrsRate !== "") {
      writer.uint32(34).string(message.bondSrsRate);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegionDelegator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegionDelegator } as RegionDelegator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorId = reader.string();
          break;
        case 2:
          message.bondSrc = reader.string();
          break;
        case 3:
          message.bondSrs = reader.string();
          break;
        case 4:
          message.bondSrsRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegionDelegator {
    const message = { ...baseRegionDelegator } as RegionDelegator;
    if (object.delegatorId !== undefined && object.delegatorId !== null) {
      message.delegatorId = String(object.delegatorId);
    } else {
      message.delegatorId = "";
    }
    if (object.bondSrc !== undefined && object.bondSrc !== null) {
      message.bondSrc = String(object.bondSrc);
    } else {
      message.bondSrc = "";
    }
    if (object.bondSrs !== undefined && object.bondSrs !== null) {
      message.bondSrs = String(object.bondSrs);
    } else {
      message.bondSrs = "";
    }
    if (object.bondSrsRate !== undefined && object.bondSrsRate !== null) {
      message.bondSrsRate = String(object.bondSrsRate);
    } else {
      message.bondSrsRate = "";
    }
    return message;
  },

  toJSON(message: RegionDelegator): unknown {
    const obj: any = {};
    message.delegatorId !== undefined &&
      (obj.delegatorId = message.delegatorId);
    message.bondSrc !== undefined && (obj.bondSrc = message.bondSrc);
    message.bondSrs !== undefined && (obj.bondSrs = message.bondSrs);
    message.bondSrsRate !== undefined &&
      (obj.bondSrsRate = message.bondSrsRate);
    return obj;
  },

  fromPartial(object: DeepPartial<RegionDelegator>): RegionDelegator {
    const message = { ...baseRegionDelegator } as RegionDelegator;
    if (object.delegatorId !== undefined && object.delegatorId !== null) {
      message.delegatorId = object.delegatorId;
    } else {
      message.delegatorId = "";
    }
    if (object.bondSrc !== undefined && object.bondSrc !== null) {
      message.bondSrc = object.bondSrc;
    } else {
      message.bondSrc = "";
    }
    if (object.bondSrs !== undefined && object.bondSrs !== null) {
      message.bondSrs = object.bondSrs;
    } else {
      message.bondSrs = "";
    }
    if (object.bondSrsRate !== undefined && object.bondSrsRate !== null) {
      message.bondSrsRate = object.bondSrsRate;
    } else {
      message.bondSrsRate = "";
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
