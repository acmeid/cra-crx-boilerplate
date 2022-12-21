/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

export interface RegionCommision {
  regionId: string;
  regionSrsLimit: string;
  regionSrsRate: string;
  delegatorsBondSrsAmount: string;
  delegatorsBondSrsRate: string;
  delegatorsBondDenomAmount: string;
  denom: string;
}

const baseRegionCommision: object = {
  regionId: "",
  regionSrsLimit: "",
  regionSrsRate: "",
  delegatorsBondSrsAmount: "",
  delegatorsBondSrsRate: "",
  delegatorsBondDenomAmount: "",
  denom: "",
};

export const RegionCommision = {
  encode(message: RegionCommision, writer: Writer = Writer.create()): Writer {
    if (message.regionId !== "") {
      writer.uint32(10).string(message.regionId);
    }
    if (message.regionSrsLimit !== "") {
      writer.uint32(18).string(message.regionSrsLimit);
    }
    if (message.regionSrsRate !== "") {
      writer.uint32(26).string(message.regionSrsRate);
    }
    if (message.delegatorsBondSrsAmount !== "") {
      writer.uint32(34).string(message.delegatorsBondSrsAmount);
    }
    if (message.delegatorsBondSrsRate !== "") {
      writer.uint32(42).string(message.delegatorsBondSrsRate);
    }
    if (message.delegatorsBondDenomAmount !== "") {
      writer.uint32(50).string(message.delegatorsBondDenomAmount);
    }
    if (message.denom !== "") {
      writer.uint32(58).string(message.denom);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegionCommision {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegionCommision } as RegionCommision;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionId = reader.string();
          break;
        case 2:
          message.regionSrsLimit = reader.string();
          break;
        case 3:
          message.regionSrsRate = reader.string();
          break;
        case 4:
          message.delegatorsBondSrsAmount = reader.string();
          break;
        case 5:
          message.delegatorsBondSrsRate = reader.string();
          break;
        case 6:
          message.delegatorsBondDenomAmount = reader.string();
          break;
        case 7:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegionCommision {
    const message = { ...baseRegionCommision } as RegionCommision;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    if (object.regionSrsLimit !== undefined && object.regionSrsLimit !== null) {
      message.regionSrsLimit = String(object.regionSrsLimit);
    } else {
      message.regionSrsLimit = "";
    }
    if (object.regionSrsRate !== undefined && object.regionSrsRate !== null) {
      message.regionSrsRate = String(object.regionSrsRate);
    } else {
      message.regionSrsRate = "";
    }
    if (
      object.delegatorsBondSrsAmount !== undefined &&
      object.delegatorsBondSrsAmount !== null
    ) {
      message.delegatorsBondSrsAmount = String(object.delegatorsBondSrsAmount);
    } else {
      message.delegatorsBondSrsAmount = "";
    }
    if (
      object.delegatorsBondSrsRate !== undefined &&
      object.delegatorsBondSrsRate !== null
    ) {
      message.delegatorsBondSrsRate = String(object.delegatorsBondSrsRate);
    } else {
      message.delegatorsBondSrsRate = "";
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
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom);
    } else {
      message.denom = "";
    }
    return message;
  },

  toJSON(message: RegionCommision): unknown {
    const obj: any = {};
    message.regionId !== undefined && (obj.regionId = message.regionId);
    message.regionSrsLimit !== undefined &&
      (obj.regionSrsLimit = message.regionSrsLimit);
    message.regionSrsRate !== undefined &&
      (obj.regionSrsRate = message.regionSrsRate);
    message.delegatorsBondSrsAmount !== undefined &&
      (obj.delegatorsBondSrsAmount = message.delegatorsBondSrsAmount);
    message.delegatorsBondSrsRate !== undefined &&
      (obj.delegatorsBondSrsRate = message.delegatorsBondSrsRate);
    message.delegatorsBondDenomAmount !== undefined &&
      (obj.delegatorsBondDenomAmount = message.delegatorsBondDenomAmount);
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial(object: DeepPartial<RegionCommision>): RegionCommision {
    const message = { ...baseRegionCommision } as RegionCommision;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    if (object.regionSrsLimit !== undefined && object.regionSrsLimit !== null) {
      message.regionSrsLimit = object.regionSrsLimit;
    } else {
      message.regionSrsLimit = "";
    }
    if (object.regionSrsRate !== undefined && object.regionSrsRate !== null) {
      message.regionSrsRate = object.regionSrsRate;
    } else {
      message.regionSrsRate = "";
    }
    if (
      object.delegatorsBondSrsAmount !== undefined &&
      object.delegatorsBondSrsAmount !== null
    ) {
      message.delegatorsBondSrsAmount = object.delegatorsBondSrsAmount;
    } else {
      message.delegatorsBondSrsAmount = "";
    }
    if (
      object.delegatorsBondSrsRate !== undefined &&
      object.delegatorsBondSrsRate !== null
    ) {
      message.delegatorsBondSrsRate = object.delegatorsBondSrsRate;
    } else {
      message.delegatorsBondSrsRate = "";
    }
    if (
      object.delegatorsBondDenomAmount !== undefined &&
      object.delegatorsBondDenomAmount !== null
    ) {
      message.delegatorsBondDenomAmount = object.delegatorsBondDenomAmount;
    } else {
      message.delegatorsBondDenomAmount = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    } else {
      message.denom = "";
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
