/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "srspoa.srstaking";

/** ValidatorStatus is the status of a validator. */
export enum ValidatorStatus {
  /** STATUS_ON_WORKING - ON_WORKING defines an invalid validator status. */
  STATUS_ON_WORKING = 0,
  /** STATUS_JAILED - JAILED defines a validator that is jailed. */
  STATUS_JAILED = 1,
  /** STATUS_OFF_WORK - OFF_WORKING defines a validator that is off_working. */
  STATUS_OFF_WORK = 2,
  UNRECOGNIZED = -1,
}

export function validatorStatusFromJSON(object: any): ValidatorStatus {
  switch (object) {
    case 0:
    case "STATUS_ON_WORKING":
      return ValidatorStatus.STATUS_ON_WORKING;
    case 1:
    case "STATUS_JAILED":
      return ValidatorStatus.STATUS_JAILED;
    case 2:
    case "STATUS_OFF_WORK":
      return ValidatorStatus.STATUS_OFF_WORK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidatorStatus.UNRECOGNIZED;
  }
}

export function validatorStatusToJSON(object: ValidatorStatus): string {
  switch (object) {
    case ValidatorStatus.STATUS_ON_WORKING:
      return "STATUS_ON_WORKING";
    case ValidatorStatus.STATUS_JAILED:
      return "STATUS_JAILED";
    case ValidatorStatus.STATUS_OFF_WORK:
      return "STATUS_OFF_WORK";
    default:
      return "UNKNOWN";
  }
}

/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export interface CommissionRates {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate: string;
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  max_rate: string;
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  max_change_rate: string;
}

/** Commission defines commission parameters for a given validator. */
export interface Commission {
  /** commission_rates defines the initial commission rates to be used for creating a validator. */
  commission_rates: CommissionRates | undefined;
  /** update_time is the last time the commission rate was changed. */
  update_time: Date | undefined;
}

export interface Validator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operator_address: string;
  /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
  consensus_pubkey: string;
  /** description defines the description terms for the validator. */
  description: Description | undefined;
  /** status is the validator status (bonded/unbonding/unbonded). */
  status: ValidatorStatus;
  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens: string;
  /** delegator_shares defines total shares issued to a validator's delegators. */
  delegator_shares: string;
  RegionID: string;
  /** unbonding_time defines, if unbonding, the min time for the validator to complete unbonding. */
  unbonding_time: Date | undefined;
  /** commission defines the commission parameters. */
  commission: Commission | undefined;
}

/** Description defines a validator description. */
export interface Description {
  /** moniker defines a human-readable name for the validator. */
  moniker: string;
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity: string;
  /** website defines an optional website link. */
  website: string;
  /** security_contact defines an optional email for security contact. */
  security_contact: string;
  /** details define other optional details. */
  details: string;
}

const baseCommissionRates: object = {
  rate: "",
  max_rate: "",
  max_change_rate: "",
};

export const CommissionRates = {
  encode(message: CommissionRates, writer: Writer = Writer.create()): Writer {
    if (message.rate !== "") {
      writer.uint32(10).string(message.rate);
    }
    if (message.max_rate !== "") {
      writer.uint32(18).string(message.max_rate);
    }
    if (message.max_change_rate !== "") {
      writer.uint32(26).string(message.max_change_rate);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CommissionRates {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommissionRates } as CommissionRates;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rate = reader.string();
          break;
        case 2:
          message.max_rate = reader.string();
          break;
        case 3:
          message.max_change_rate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommissionRates {
    const message = { ...baseCommissionRates } as CommissionRates;
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = String(object.rate);
    } else {
      message.rate = "";
    }
    if (object.max_rate !== undefined && object.max_rate !== null) {
      message.max_rate = String(object.max_rate);
    } else {
      message.max_rate = "";
    }
    if (
      object.max_change_rate !== undefined &&
      object.max_change_rate !== null
    ) {
      message.max_change_rate = String(object.max_change_rate);
    } else {
      message.max_change_rate = "";
    }
    return message;
  },

  toJSON(message: CommissionRates): unknown {
    const obj: any = {};
    message.rate !== undefined && (obj.rate = message.rate);
    message.max_rate !== undefined && (obj.max_rate = message.max_rate);
    message.max_change_rate !== undefined &&
      (obj.max_change_rate = message.max_change_rate);
    return obj;
  },

  fromPartial(object: DeepPartial<CommissionRates>): CommissionRates {
    const message = { ...baseCommissionRates } as CommissionRates;
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = object.rate;
    } else {
      message.rate = "";
    }
    if (object.max_rate !== undefined && object.max_rate !== null) {
      message.max_rate = object.max_rate;
    } else {
      message.max_rate = "";
    }
    if (
      object.max_change_rate !== undefined &&
      object.max_change_rate !== null
    ) {
      message.max_change_rate = object.max_change_rate;
    } else {
      message.max_change_rate = "";
    }
    return message;
  },
};

const baseCommission: object = {};

export const Commission = {
  encode(message: Commission, writer: Writer = Writer.create()): Writer {
    if (message.commission_rates !== undefined) {
      CommissionRates.encode(
        message.commission_rates,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Commission {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommission } as Commission;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commission_rates = CommissionRates.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Commission {
    const message = { ...baseCommission } as Commission;
    if (
      object.commission_rates !== undefined &&
      object.commission_rates !== null
    ) {
      message.commission_rates = CommissionRates.fromJSON(
        object.commission_rates
      );
    } else {
      message.commission_rates = undefined;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    } else {
      message.update_time = undefined;
    }
    return message;
  },

  toJSON(message: Commission): unknown {
    const obj: any = {};
    message.commission_rates !== undefined &&
      (obj.commission_rates = message.commission_rates
        ? CommissionRates.toJSON(message.commission_rates)
        : undefined);
    message.update_time !== undefined &&
      (obj.update_time =
        message.update_time !== undefined
          ? message.update_time.toISOString()
          : null);
    return obj;
  },

  fromPartial(object: DeepPartial<Commission>): Commission {
    const message = { ...baseCommission } as Commission;
    if (
      object.commission_rates !== undefined &&
      object.commission_rates !== null
    ) {
      message.commission_rates = CommissionRates.fromPartial(
        object.commission_rates
      );
    } else {
      message.commission_rates = undefined;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    } else {
      message.update_time = undefined;
    }
    return message;
  },
};

const baseValidator: object = {
  operator_address: "",
  consensus_pubkey: "",
  status: 0,
  tokens: "",
  delegator_shares: "",
  RegionID: "",
};

export const Validator = {
  encode(message: Validator, writer: Writer = Writer.create()): Writer {
    if (message.operator_address !== "") {
      writer.uint32(10).string(message.operator_address);
    }
    if (message.consensus_pubkey !== "") {
      writer.uint32(18).string(message.consensus_pubkey);
    }
    if (message.description !== undefined) {
      Description.encode(
        message.description,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.tokens !== "") {
      writer.uint32(42).string(message.tokens);
    }
    if (message.delegator_shares !== "") {
      writer.uint32(50).string(message.delegator_shares);
    }
    if (message.RegionID !== "") {
      writer.uint32(58).string(message.RegionID);
    }
    if (message.unbonding_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.unbonding_time),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.commission !== undefined) {
      Commission.encode(message.commission, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidator } as Validator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operator_address = reader.string();
          break;
        case 2:
          message.consensus_pubkey = reader.string();
          break;
        case 3:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        case 5:
          message.tokens = reader.string();
          break;
        case 6:
          message.delegator_shares = reader.string();
          break;
        case 7:
          message.RegionID = reader.string();
          break;
        case 8:
          message.unbonding_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.commission = Commission.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Validator {
    const message = { ...baseValidator } as Validator;
    if (
      object.operator_address !== undefined &&
      object.operator_address !== null
    ) {
      message.operator_address = String(object.operator_address);
    } else {
      message.operator_address = "";
    }
    if (
      object.consensus_pubkey !== undefined &&
      object.consensus_pubkey !== null
    ) {
      message.consensus_pubkey = String(object.consensus_pubkey);
    } else {
      message.consensus_pubkey = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromJSON(object.description);
    } else {
      message.description = undefined;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = validatorStatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.tokens !== undefined && object.tokens !== null) {
      message.tokens = String(object.tokens);
    } else {
      message.tokens = "";
    }
    if (
      object.delegator_shares !== undefined &&
      object.delegator_shares !== null
    ) {
      message.delegator_shares = String(object.delegator_shares);
    } else {
      message.delegator_shares = "";
    }
    if (object.RegionID !== undefined && object.RegionID !== null) {
      message.RegionID = String(object.RegionID);
    } else {
      message.RegionID = "";
    }
    if (object.unbonding_time !== undefined && object.unbonding_time !== null) {
      message.unbonding_time = fromJsonTimestamp(object.unbonding_time);
    } else {
      message.unbonding_time = undefined;
    }
    if (object.commission !== undefined && object.commission !== null) {
      message.commission = Commission.fromJSON(object.commission);
    } else {
      message.commission = undefined;
    }
    return message;
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.operator_address !== undefined &&
      (obj.operator_address = message.operator_address);
    message.consensus_pubkey !== undefined &&
      (obj.consensus_pubkey = message.consensus_pubkey);
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    message.status !== undefined &&
      (obj.status = validatorStatusToJSON(message.status));
    message.tokens !== undefined && (obj.tokens = message.tokens);
    message.delegator_shares !== undefined &&
      (obj.delegator_shares = message.delegator_shares);
    message.RegionID !== undefined && (obj.RegionID = message.RegionID);
    message.unbonding_time !== undefined &&
      (obj.unbonding_time =
        message.unbonding_time !== undefined
          ? message.unbonding_time.toISOString()
          : null);
    message.commission !== undefined &&
      (obj.commission = message.commission
        ? Commission.toJSON(message.commission)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Validator>): Validator {
    const message = { ...baseValidator } as Validator;
    if (
      object.operator_address !== undefined &&
      object.operator_address !== null
    ) {
      message.operator_address = object.operator_address;
    } else {
      message.operator_address = "";
    }
    if (
      object.consensus_pubkey !== undefined &&
      object.consensus_pubkey !== null
    ) {
      message.consensus_pubkey = object.consensus_pubkey;
    } else {
      message.consensus_pubkey = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromPartial(object.description);
    } else {
      message.description = undefined;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.tokens !== undefined && object.tokens !== null) {
      message.tokens = object.tokens;
    } else {
      message.tokens = "";
    }
    if (
      object.delegator_shares !== undefined &&
      object.delegator_shares !== null
    ) {
      message.delegator_shares = object.delegator_shares;
    } else {
      message.delegator_shares = "";
    }
    if (object.RegionID !== undefined && object.RegionID !== null) {
      message.RegionID = object.RegionID;
    } else {
      message.RegionID = "";
    }
    if (object.unbonding_time !== undefined && object.unbonding_time !== null) {
      message.unbonding_time = object.unbonding_time;
    } else {
      message.unbonding_time = undefined;
    }
    if (object.commission !== undefined && object.commission !== null) {
      message.commission = Commission.fromPartial(object.commission);
    } else {
      message.commission = undefined;
    }
    return message;
  },
};

const baseDescription: object = {
  moniker: "",
  identity: "",
  website: "",
  security_contact: "",
  details: "",
};

export const Description = {
  encode(message: Description, writer: Writer = Writer.create()): Writer {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.identity !== "") {
      writer.uint32(18).string(message.identity);
    }
    if (message.website !== "") {
      writer.uint32(26).string(message.website);
    }
    if (message.security_contact !== "") {
      writer.uint32(34).string(message.security_contact);
    }
    if (message.details !== "") {
      writer.uint32(42).string(message.details);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Description {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDescription } as Description;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moniker = reader.string();
          break;
        case 2:
          message.identity = reader.string();
          break;
        case 3:
          message.website = reader.string();
          break;
        case 4:
          message.security_contact = reader.string();
          break;
        case 5:
          message.details = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Description {
    const message = { ...baseDescription } as Description;
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = String(object.moniker);
    } else {
      message.moniker = "";
    }
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity);
    } else {
      message.identity = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = String(object.website);
    } else {
      message.website = "";
    }
    if (
      object.security_contact !== undefined &&
      object.security_contact !== null
    ) {
      message.security_contact = String(object.security_contact);
    } else {
      message.security_contact = "";
    }
    if (object.details !== undefined && object.details !== null) {
      message.details = String(object.details);
    } else {
      message.details = "";
    }
    return message;
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.identity !== undefined && (obj.identity = message.identity);
    message.website !== undefined && (obj.website = message.website);
    message.security_contact !== undefined &&
      (obj.security_contact = message.security_contact);
    message.details !== undefined && (obj.details = message.details);
    return obj;
  },

  fromPartial(object: DeepPartial<Description>): Description {
    const message = { ...baseDescription } as Description;
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = object.moniker;
    } else {
      message.moniker = "";
    }
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity;
    } else {
      message.identity = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = object.website;
    } else {
      message.website = "";
    }
    if (
      object.security_contact !== undefined &&
      object.security_contact !== null
    ) {
      message.security_contact = object.security_contact;
    } else {
      message.security_contact = "";
    }
    if (object.details !== undefined && object.details !== null) {
      message.details = object.details;
    } else {
      message.details = "";
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
