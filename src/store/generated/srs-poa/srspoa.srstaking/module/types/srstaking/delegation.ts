/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

/** ValidatorStatus is the status of a validator. */
export enum DelegationStatus {
  STATUS_DELEGATE_NOCHANGE = 0,
  STATUS_CREATE_DELEGATE = 1,
  STATUS_DELEGATE = 2,
  STATUS_UNDELEGATE = 3,
  STATUS_EXIT_DELEGATE = 4,
  UNRECOGNIZED = -1,
}

export function delegationStatusFromJSON(object: any): DelegationStatus {
  switch (object) {
    case 0:
    case "STATUS_DELEGATE_NOCHANGE":
      return DelegationStatus.STATUS_DELEGATE_NOCHANGE;
    case 1:
    case "STATUS_CREATE_DELEGATE":
      return DelegationStatus.STATUS_CREATE_DELEGATE;
    case 2:
    case "STATUS_DELEGATE":
      return DelegationStatus.STATUS_DELEGATE;
    case 3:
    case "STATUS_UNDELEGATE":
      return DelegationStatus.STATUS_UNDELEGATE;
    case 4:
    case "STATUS_EXIT_DELEGATE":
      return DelegationStatus.STATUS_EXIT_DELEGATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DelegationStatus.UNRECOGNIZED;
  }
}

export function delegationStatusToJSON(object: DelegationStatus): string {
  switch (object) {
    case DelegationStatus.STATUS_DELEGATE_NOCHANGE:
      return "STATUS_DELEGATE_NOCHANGE";
    case DelegationStatus.STATUS_CREATE_DELEGATE:
      return "STATUS_CREATE_DELEGATE";
    case DelegationStatus.STATUS_DELEGATE:
      return "STATUS_DELEGATE";
    case DelegationStatus.STATUS_UNDELEGATE:
      return "STATUS_UNDELEGATE";
    case DelegationStatus.STATUS_EXIT_DELEGATE:
      return "STATUS_EXIT_DELEGATE";
    default:
      return "UNKNOWN";
  }
}

export interface Delegation {
  delegatorAddress: string;
  validator_address: string;
  belongRegion: string;
  bondAmount: string;
  commissionPowerAmount: string;
  commissionPowerRate: string;
  changeBondAmount: string;
  bondDenom: string;
  commissionPowerDenom: string;
  shares: string;
  status: DelegationStatus;
}

const baseDelegation: object = {
  delegatorAddress: "",
  validator_address: "",
  belongRegion: "",
  bondAmount: "",
  commissionPowerAmount: "",
  commissionPowerRate: "",
  changeBondAmount: "",
  bondDenom: "",
  commissionPowerDenom: "",
  shares: "",
  status: 0,
};

export const Delegation = {
  encode(message: Delegation, writer: Writer = Writer.create()): Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    if (message.belongRegion !== "") {
      writer.uint32(26).string(message.belongRegion);
    }
    if (message.bondAmount !== "") {
      writer.uint32(34).string(message.bondAmount);
    }
    if (message.commissionPowerAmount !== "") {
      writer.uint32(42).string(message.commissionPowerAmount);
    }
    if (message.commissionPowerRate !== "") {
      writer.uint32(50).string(message.commissionPowerRate);
    }
    if (message.changeBondAmount !== "") {
      writer.uint32(58).string(message.changeBondAmount);
    }
    if (message.bondDenom !== "") {
      writer.uint32(66).string(message.bondDenom);
    }
    if (message.commissionPowerDenom !== "") {
      writer.uint32(74).string(message.commissionPowerDenom);
    }
    if (message.shares !== "") {
      writer.uint32(82).string(message.shares);
    }
    if (message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Delegation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDelegation } as Delegation;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.belongRegion = reader.string();
          break;
        case 4:
          message.bondAmount = reader.string();
          break;
        case 5:
          message.commissionPowerAmount = reader.string();
          break;
        case 6:
          message.commissionPowerRate = reader.string();
          break;
        case 7:
          message.changeBondAmount = reader.string();
          break;
        case 8:
          message.bondDenom = reader.string();
          break;
        case 9:
          message.commissionPowerDenom = reader.string();
          break;
        case 10:
          message.shares = reader.string();
          break;
        case 11:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Delegation {
    const message = { ...baseDelegation } as Delegation;
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = String(object.delegatorAddress);
    } else {
      message.delegatorAddress = "";
    }
    if (
      object.validator_address !== undefined &&
      object.validator_address !== null
    ) {
      message.validator_address = String(object.validator_address);
    } else {
      message.validator_address = "";
    }
    if (object.belongRegion !== undefined && object.belongRegion !== null) {
      message.belongRegion = String(object.belongRegion);
    } else {
      message.belongRegion = "";
    }
    if (object.bondAmount !== undefined && object.bondAmount !== null) {
      message.bondAmount = String(object.bondAmount);
    } else {
      message.bondAmount = "";
    }
    if (
      object.commissionPowerAmount !== undefined &&
      object.commissionPowerAmount !== null
    ) {
      message.commissionPowerAmount = String(object.commissionPowerAmount);
    } else {
      message.commissionPowerAmount = "";
    }
    if (
      object.commissionPowerRate !== undefined &&
      object.commissionPowerRate !== null
    ) {
      message.commissionPowerRate = String(object.commissionPowerRate);
    } else {
      message.commissionPowerRate = "";
    }
    if (
      object.changeBondAmount !== undefined &&
      object.changeBondAmount !== null
    ) {
      message.changeBondAmount = String(object.changeBondAmount);
    } else {
      message.changeBondAmount = "";
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
    if (object.shares !== undefined && object.shares !== null) {
      message.shares = String(object.shares);
    } else {
      message.shares = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = delegationStatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    return message;
  },

  toJSON(message: Delegation): unknown {
    const obj: any = {};
    message.delegatorAddress !== undefined &&
      (obj.delegatorAddress = message.delegatorAddress);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.belongRegion !== undefined &&
      (obj.belongRegion = message.belongRegion);
    message.bondAmount !== undefined && (obj.bondAmount = message.bondAmount);
    message.commissionPowerAmount !== undefined &&
      (obj.commissionPowerAmount = message.commissionPowerAmount);
    message.commissionPowerRate !== undefined &&
      (obj.commissionPowerRate = message.commissionPowerRate);
    message.changeBondAmount !== undefined &&
      (obj.changeBondAmount = message.changeBondAmount);
    message.bondDenom !== undefined && (obj.bondDenom = message.bondDenom);
    message.commissionPowerDenom !== undefined &&
      (obj.commissionPowerDenom = message.commissionPowerDenom);
    message.shares !== undefined && (obj.shares = message.shares);
    message.status !== undefined &&
      (obj.status = delegationStatusToJSON(message.status));
    return obj;
  },

  fromPartial(object: DeepPartial<Delegation>): Delegation {
    const message = { ...baseDelegation } as Delegation;
    if (
      object.delegatorAddress !== undefined &&
      object.delegatorAddress !== null
    ) {
      message.delegatorAddress = object.delegatorAddress;
    } else {
      message.delegatorAddress = "";
    }
    if (
      object.validator_address !== undefined &&
      object.validator_address !== null
    ) {
      message.validator_address = object.validator_address;
    } else {
      message.validator_address = "";
    }
    if (object.belongRegion !== undefined && object.belongRegion !== null) {
      message.belongRegion = object.belongRegion;
    } else {
      message.belongRegion = "";
    }
    if (object.bondAmount !== undefined && object.bondAmount !== null) {
      message.bondAmount = object.bondAmount;
    } else {
      message.bondAmount = "";
    }
    if (
      object.commissionPowerAmount !== undefined &&
      object.commissionPowerAmount !== null
    ) {
      message.commissionPowerAmount = object.commissionPowerAmount;
    } else {
      message.commissionPowerAmount = "";
    }
    if (
      object.commissionPowerRate !== undefined &&
      object.commissionPowerRate !== null
    ) {
      message.commissionPowerRate = object.commissionPowerRate;
    } else {
      message.commissionPowerRate = "";
    }
    if (
      object.changeBondAmount !== undefined &&
      object.changeBondAmount !== null
    ) {
      message.changeBondAmount = object.changeBondAmount;
    } else {
      message.changeBondAmount = "";
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
    if (object.shares !== undefined && object.shares !== null) {
      message.shares = object.shares;
    } else {
      message.shares = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
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
