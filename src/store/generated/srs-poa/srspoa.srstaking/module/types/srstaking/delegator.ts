/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

export interface RegionDelegator {
  delegatorAddress: string;
  belongRegion: string;
  bondDenom: string;
  bondSrs: string;
  bondSrsRate: string;
  changeBondDenom: string;
  denom: string;
  isChange: boolean;
}

const baseRegionDelegator: object = {
  delegatorAddress: "",
  belongRegion: "",
  bondDenom: "",
  bondSrs: "",
  bondSrsRate: "",
  changeBondDenom: "",
  denom: "",
  isChange: false,
};

export const RegionDelegator = {
  encode(message: RegionDelegator, writer: Writer = Writer.create()): Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.belongRegion !== "") {
      writer.uint32(18).string(message.belongRegion);
    }
    if (message.bondDenom !== "") {
      writer.uint32(26).string(message.bondDenom);
    }
    if (message.bondSrs !== "") {
      writer.uint32(34).string(message.bondSrs);
    }
    if (message.bondSrsRate !== "") {
      writer.uint32(42).string(message.bondSrsRate);
    }
    if (message.changeBondDenom !== "") {
      writer.uint32(50).string(message.changeBondDenom);
    }
    if (message.denom !== "") {
      writer.uint32(58).string(message.denom);
    }
    if (message.isChange === true) {
      writer.uint32(64).bool(message.isChange);
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
          message.delegatorAddress = reader.string();
          break;
        case 2:
          message.belongRegion = reader.string();
          break;
        case 3:
          message.bondDenom = reader.string();
          break;
        case 4:
          message.bondSrs = reader.string();
          break;
        case 5:
          message.bondSrsRate = reader.string();
          break;
        case 6:
          message.changeBondDenom = reader.string();
          break;
        case 7:
          message.denom = reader.string();
          break;
        case 8:
          message.isChange = reader.bool();
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
    if (object.bondDenom !== undefined && object.bondDenom !== null) {
      message.bondDenom = String(object.bondDenom);
    } else {
      message.bondDenom = "";
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
    if (
      object.changeBondDenom !== undefined &&
      object.changeBondDenom !== null
    ) {
      message.changeBondDenom = String(object.changeBondDenom);
    } else {
      message.changeBondDenom = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom);
    } else {
      message.denom = "";
    }
    if (object.isChange !== undefined && object.isChange !== null) {
      message.isChange = Boolean(object.isChange);
    } else {
      message.isChange = false;
    }
    return message;
  },

  toJSON(message: RegionDelegator): unknown {
    const obj: any = {};
    message.delegatorAddress !== undefined &&
      (obj.delegatorAddress = message.delegatorAddress);
    message.belongRegion !== undefined &&
      (obj.belongRegion = message.belongRegion);
    message.bondDenom !== undefined && (obj.bondDenom = message.bondDenom);
    message.bondSrs !== undefined && (obj.bondSrs = message.bondSrs);
    message.bondSrsRate !== undefined &&
      (obj.bondSrsRate = message.bondSrsRate);
    message.changeBondDenom !== undefined &&
      (obj.changeBondDenom = message.changeBondDenom);
    message.denom !== undefined && (obj.denom = message.denom);
    message.isChange !== undefined && (obj.isChange = message.isChange);
    return obj;
  },

  fromPartial(object: DeepPartial<RegionDelegator>): RegionDelegator {
    const message = { ...baseRegionDelegator } as RegionDelegator;
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
    if (object.bondDenom !== undefined && object.bondDenom !== null) {
      message.bondDenom = object.bondDenom;
    } else {
      message.bondDenom = "";
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
    if (
      object.changeBondDenom !== undefined &&
      object.changeBondDenom !== null
    ) {
      message.changeBondDenom = object.changeBondDenom;
    } else {
      message.changeBondDenom = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    } else {
      message.denom = "";
    }
    if (object.isChange !== undefined && object.isChange !== null) {
      message.isChange = object.isChange;
    } else {
      message.isChange = false;
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
