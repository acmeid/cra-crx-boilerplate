/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srsmint";

/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mint_denom: string;
  /** type of coin to gov power */
  gov_power_denom: string;
  /** expected blocks per year */
  blocks_per_year: number;
}

const baseParams: object = {
  mint_denom: "",
  gov_power_denom: "",
  blocks_per_year: 0,
};

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.mint_denom !== "") {
      writer.uint32(10).string(message.mint_denom);
    }
    if (message.gov_power_denom !== "") {
      writer.uint32(18).string(message.gov_power_denom);
    }
    if (message.blocks_per_year !== 0) {
      writer.uint32(24).uint64(message.blocks_per_year);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mint_denom = reader.string();
          break;
        case 2:
          message.gov_power_denom = reader.string();
          break;
        case 3:
          message.blocks_per_year = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    if (object.mint_denom !== undefined && object.mint_denom !== null) {
      message.mint_denom = String(object.mint_denom);
    } else {
      message.mint_denom = "";
    }
    if (
      object.gov_power_denom !== undefined &&
      object.gov_power_denom !== null
    ) {
      message.gov_power_denom = String(object.gov_power_denom);
    } else {
      message.gov_power_denom = "";
    }
    if (
      object.blocks_per_year !== undefined &&
      object.blocks_per_year !== null
    ) {
      message.blocks_per_year = Number(object.blocks_per_year);
    } else {
      message.blocks_per_year = 0;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mint_denom !== undefined && (obj.mint_denom = message.mint_denom);
    message.gov_power_denom !== undefined &&
      (obj.gov_power_denom = message.gov_power_denom);
    message.blocks_per_year !== undefined &&
      (obj.blocks_per_year = message.blocks_per_year);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.mint_denom !== undefined && object.mint_denom !== null) {
      message.mint_denom = object.mint_denom;
    } else {
      message.mint_denom = "";
    }
    if (
      object.gov_power_denom !== undefined &&
      object.gov_power_denom !== null
    ) {
      message.gov_power_denom = object.gov_power_denom;
    } else {
      message.gov_power_denom = "";
    }
    if (
      object.blocks_per_year !== undefined &&
      object.blocks_per_year !== null
    ) {
      message.blocks_per_year = object.blocks_per_year;
    } else {
      message.blocks_per_year = 0;
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
