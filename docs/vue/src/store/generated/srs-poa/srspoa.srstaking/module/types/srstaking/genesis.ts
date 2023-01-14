/* eslint-disable */
import { Params } from "../srstaking/params";
import { Region } from "../srstaking/region";
import { Validator } from "../srstaking/validator";
import { Delegation } from "../srstaking/delegation";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

/** GenesisState defines the srstaking module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  regionList: Region[];
  validatorList: Validator[];
  delegationList: Delegation[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  exported: boolean;
}

const baseGenesisState: object = { exported: false };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.regionList) {
      Region.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.validatorList) {
      Validator.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.delegationList) {
      Delegation.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.exported === true) {
      writer.uint32(40).bool(message.exported);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.regionList = [];
    message.validatorList = [];
    message.delegationList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.regionList.push(Region.decode(reader, reader.uint32()));
          break;
        case 3:
          message.validatorList.push(Validator.decode(reader, reader.uint32()));
          break;
        case 4:
          message.delegationList.push(
            Delegation.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.exported = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.regionList = [];
    message.validatorList = [];
    message.delegationList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.regionList !== undefined && object.regionList !== null) {
      for (const e of object.regionList) {
        message.regionList.push(Region.fromJSON(e));
      }
    }
    if (object.validatorList !== undefined && object.validatorList !== null) {
      for (const e of object.validatorList) {
        message.validatorList.push(Validator.fromJSON(e));
      }
    }
    if (object.delegationList !== undefined && object.delegationList !== null) {
      for (const e of object.delegationList) {
        message.delegationList.push(Delegation.fromJSON(e));
      }
    }
    if (object.exported !== undefined && object.exported !== null) {
      message.exported = Boolean(object.exported);
    } else {
      message.exported = false;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.regionList) {
      obj.regionList = message.regionList.map((e) =>
        e ? Region.toJSON(e) : undefined
      );
    } else {
      obj.regionList = [];
    }
    if (message.validatorList) {
      obj.validatorList = message.validatorList.map((e) =>
        e ? Validator.toJSON(e) : undefined
      );
    } else {
      obj.validatorList = [];
    }
    if (message.delegationList) {
      obj.delegationList = message.delegationList.map((e) =>
        e ? Delegation.toJSON(e) : undefined
      );
    } else {
      obj.delegationList = [];
    }
    message.exported !== undefined && (obj.exported = message.exported);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.regionList = [];
    message.validatorList = [];
    message.delegationList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.regionList !== undefined && object.regionList !== null) {
      for (const e of object.regionList) {
        message.regionList.push(Region.fromPartial(e));
      }
    }
    if (object.validatorList !== undefined && object.validatorList !== null) {
      for (const e of object.validatorList) {
        message.validatorList.push(Validator.fromPartial(e));
      }
    }
    if (object.delegationList !== undefined && object.delegationList !== null) {
      for (const e of object.delegationList) {
        message.delegationList.push(Delegation.fromPartial(e));
      }
    }
    if (object.exported !== undefined && object.exported !== null) {
      message.exported = object.exported;
    } else {
      message.exported = false;
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
