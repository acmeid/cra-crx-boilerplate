/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../srvault/params";
import { FixedDeposit } from "../srvault/fixed_deposit";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { RegionVault } from "../srvault/region_vault";
import { Kyc } from "../srvault/kyc";

export const protobufPackage = "srspoa.srvault";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetDepositRequest {
  account: string;
  denom: string;
}

export interface QueryGetFixedDepositRequest {
  id: number;
}

export interface QueryGetFixedDepositResponse {
  FixedDeposit: FixedDeposit | undefined;
}

export interface QueryAllFixedDepositRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllFixedDepositResponse {
  FixedDeposit: FixedDeposit[];
  pagination: PageResponse | undefined;
}

export interface QueryFixedDepositByAcctRequest {
  pagination: PageRequest | undefined;
  account: string;
}

export interface QueryFixedDepositByAcctResponse {
  FixedDeposit: FixedDeposit[];
  pagination: PageResponse | undefined;
}

export interface QueryGetRegionVaultRequest {
  regionId: string;
}

export interface QueryGetRegionVaultResponse {
  regionVault: RegionVault | undefined;
}

export interface QueryAllRegionVaultRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllRegionVaultResponse {
  regionVault: RegionVault[];
  pagination: PageResponse | undefined;
}

export interface QueryGetKycRequest {
  account: string;
}

export interface QueryGetKycResponse {
  kyc: Kyc | undefined;
}

export interface QueryAllKycRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllKycResponse {
  kyc: Kyc[];
  pagination: PageResponse | undefined;
}

export interface QueryKycByRegionRequest {
  regionid: string;
  pagination: PageRequest | undefined;
}

export interface QueryKycByRegionResponse {
  kyc: Kyc[];
  pagination: PageResponse | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetDepositRequest: object = { account: "", denom: "" };

export const QueryGetDepositRequest = {
  encode(
    message: QueryGetDepositRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDepositRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetDepositRequest } as QueryGetDepositRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDepositRequest {
    const message = { ...baseQueryGetDepositRequest } as QueryGetDepositRequest;
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
    return message;
  },

  toJSON(message: QueryGetDepositRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetDepositRequest>
  ): QueryGetDepositRequest {
    const message = { ...baseQueryGetDepositRequest } as QueryGetDepositRequest;
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
    return message;
  },
};

const baseQueryGetFixedDepositRequest: object = { id: 0 };

export const QueryGetFixedDepositRequest = {
  encode(
    message: QueryGetFixedDepositRequest,
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
  ): QueryGetFixedDepositRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetFixedDepositRequest,
    } as QueryGetFixedDepositRequest;
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

  fromJSON(object: any): QueryGetFixedDepositRequest {
    const message = {
      ...baseQueryGetFixedDepositRequest,
    } as QueryGetFixedDepositRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetFixedDepositRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetFixedDepositRequest>
  ): QueryGetFixedDepositRequest {
    const message = {
      ...baseQueryGetFixedDepositRequest,
    } as QueryGetFixedDepositRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetFixedDepositResponse: object = {};

export const QueryGetFixedDepositResponse = {
  encode(
    message: QueryGetFixedDepositResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.FixedDeposit !== undefined) {
      FixedDeposit.encode(
        message.FixedDeposit,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetFixedDepositResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetFixedDepositResponse,
    } as QueryGetFixedDepositResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FixedDeposit = FixedDeposit.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetFixedDepositResponse {
    const message = {
      ...baseQueryGetFixedDepositResponse,
    } as QueryGetFixedDepositResponse;
    if (object.FixedDeposit !== undefined && object.FixedDeposit !== null) {
      message.FixedDeposit = FixedDeposit.fromJSON(object.FixedDeposit);
    } else {
      message.FixedDeposit = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetFixedDepositResponse): unknown {
    const obj: any = {};
    message.FixedDeposit !== undefined &&
      (obj.FixedDeposit = message.FixedDeposit
        ? FixedDeposit.toJSON(message.FixedDeposit)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetFixedDepositResponse>
  ): QueryGetFixedDepositResponse {
    const message = {
      ...baseQueryGetFixedDepositResponse,
    } as QueryGetFixedDepositResponse;
    if (object.FixedDeposit !== undefined && object.FixedDeposit !== null) {
      message.FixedDeposit = FixedDeposit.fromPartial(object.FixedDeposit);
    } else {
      message.FixedDeposit = undefined;
    }
    return message;
  },
};

const baseQueryAllFixedDepositRequest: object = {};

export const QueryAllFixedDepositRequest = {
  encode(
    message: QueryAllFixedDepositRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllFixedDepositRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllFixedDepositRequest,
    } as QueryAllFixedDepositRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllFixedDepositRequest {
    const message = {
      ...baseQueryAllFixedDepositRequest,
    } as QueryAllFixedDepositRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllFixedDepositRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllFixedDepositRequest>
  ): QueryAllFixedDepositRequest {
    const message = {
      ...baseQueryAllFixedDepositRequest,
    } as QueryAllFixedDepositRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllFixedDepositResponse: object = {};

export const QueryAllFixedDepositResponse = {
  encode(
    message: QueryAllFixedDepositResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.FixedDeposit) {
      FixedDeposit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllFixedDepositResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllFixedDepositResponse,
    } as QueryAllFixedDepositResponse;
    message.FixedDeposit = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FixedDeposit.push(
            FixedDeposit.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllFixedDepositResponse {
    const message = {
      ...baseQueryAllFixedDepositResponse,
    } as QueryAllFixedDepositResponse;
    message.FixedDeposit = [];
    if (object.FixedDeposit !== undefined && object.FixedDeposit !== null) {
      for (const e of object.FixedDeposit) {
        message.FixedDeposit.push(FixedDeposit.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllFixedDepositResponse): unknown {
    const obj: any = {};
    if (message.FixedDeposit) {
      obj.FixedDeposit = message.FixedDeposit.map((e) =>
        e ? FixedDeposit.toJSON(e) : undefined
      );
    } else {
      obj.FixedDeposit = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllFixedDepositResponse>
  ): QueryAllFixedDepositResponse {
    const message = {
      ...baseQueryAllFixedDepositResponse,
    } as QueryAllFixedDepositResponse;
    message.FixedDeposit = [];
    if (object.FixedDeposit !== undefined && object.FixedDeposit !== null) {
      for (const e of object.FixedDeposit) {
        message.FixedDeposit.push(FixedDeposit.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryFixedDepositByAcctRequest: object = { account: "" };

export const QueryFixedDepositByAcctRequest = {
  encode(
    message: QueryFixedDepositByAcctRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryFixedDepositByAcctRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryFixedDepositByAcctRequest,
    } as QueryFixedDepositByAcctRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryFixedDepositByAcctRequest {
    const message = {
      ...baseQueryFixedDepositByAcctRequest,
    } as QueryFixedDepositByAcctRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    return message;
  },

  toJSON(message: QueryFixedDepositByAcctRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryFixedDepositByAcctRequest>
  ): QueryFixedDepositByAcctRequest {
    const message = {
      ...baseQueryFixedDepositByAcctRequest,
    } as QueryFixedDepositByAcctRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    return message;
  },
};

const baseQueryFixedDepositByAcctResponse: object = {};

export const QueryFixedDepositByAcctResponse = {
  encode(
    message: QueryFixedDepositByAcctResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.FixedDeposit) {
      FixedDeposit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryFixedDepositByAcctResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryFixedDepositByAcctResponse,
    } as QueryFixedDepositByAcctResponse;
    message.FixedDeposit = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FixedDeposit.push(
            FixedDeposit.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFixedDepositByAcctResponse {
    const message = {
      ...baseQueryFixedDepositByAcctResponse,
    } as QueryFixedDepositByAcctResponse;
    message.FixedDeposit = [];
    if (object.FixedDeposit !== undefined && object.FixedDeposit !== null) {
      for (const e of object.FixedDeposit) {
        message.FixedDeposit.push(FixedDeposit.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryFixedDepositByAcctResponse): unknown {
    const obj: any = {};
    if (message.FixedDeposit) {
      obj.FixedDeposit = message.FixedDeposit.map((e) =>
        e ? FixedDeposit.toJSON(e) : undefined
      );
    } else {
      obj.FixedDeposit = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryFixedDepositByAcctResponse>
  ): QueryFixedDepositByAcctResponse {
    const message = {
      ...baseQueryFixedDepositByAcctResponse,
    } as QueryFixedDepositByAcctResponse;
    message.FixedDeposit = [];
    if (object.FixedDeposit !== undefined && object.FixedDeposit !== null) {
      for (const e of object.FixedDeposit) {
        message.FixedDeposit.push(FixedDeposit.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetRegionVaultRequest: object = { regionId: "" };

export const QueryGetRegionVaultRequest = {
  encode(
    message: QueryGetRegionVaultRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.regionId !== "") {
      writer.uint32(10).string(message.regionId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRegionVaultRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRegionVaultRequest,
    } as QueryGetRegionVaultRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRegionVaultRequest {
    const message = {
      ...baseQueryGetRegionVaultRequest,
    } as QueryGetRegionVaultRequest;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = String(object.regionId);
    } else {
      message.regionId = "";
    }
    return message;
  },

  toJSON(message: QueryGetRegionVaultRequest): unknown {
    const obj: any = {};
    message.regionId !== undefined && (obj.regionId = message.regionId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRegionVaultRequest>
  ): QueryGetRegionVaultRequest {
    const message = {
      ...baseQueryGetRegionVaultRequest,
    } as QueryGetRegionVaultRequest;
    if (object.regionId !== undefined && object.regionId !== null) {
      message.regionId = object.regionId;
    } else {
      message.regionId = "";
    }
    return message;
  },
};

const baseQueryGetRegionVaultResponse: object = {};

export const QueryGetRegionVaultResponse = {
  encode(
    message: QueryGetRegionVaultResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.regionVault !== undefined) {
      RegionVault.encode(
        message.regionVault,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRegionVaultResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRegionVaultResponse,
    } as QueryGetRegionVaultResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionVault = RegionVault.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRegionVaultResponse {
    const message = {
      ...baseQueryGetRegionVaultResponse,
    } as QueryGetRegionVaultResponse;
    if (object.regionVault !== undefined && object.regionVault !== null) {
      message.regionVault = RegionVault.fromJSON(object.regionVault);
    } else {
      message.regionVault = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRegionVaultResponse): unknown {
    const obj: any = {};
    message.regionVault !== undefined &&
      (obj.regionVault = message.regionVault
        ? RegionVault.toJSON(message.regionVault)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRegionVaultResponse>
  ): QueryGetRegionVaultResponse {
    const message = {
      ...baseQueryGetRegionVaultResponse,
    } as QueryGetRegionVaultResponse;
    if (object.regionVault !== undefined && object.regionVault !== null) {
      message.regionVault = RegionVault.fromPartial(object.regionVault);
    } else {
      message.regionVault = undefined;
    }
    return message;
  },
};

const baseQueryAllRegionVaultRequest: object = {};

export const QueryAllRegionVaultRequest = {
  encode(
    message: QueryAllRegionVaultRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRegionVaultRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRegionVaultRequest,
    } as QueryAllRegionVaultRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRegionVaultRequest {
    const message = {
      ...baseQueryAllRegionVaultRequest,
    } as QueryAllRegionVaultRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRegionVaultRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRegionVaultRequest>
  ): QueryAllRegionVaultRequest {
    const message = {
      ...baseQueryAllRegionVaultRequest,
    } as QueryAllRegionVaultRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRegionVaultResponse: object = {};

export const QueryAllRegionVaultResponse = {
  encode(
    message: QueryAllRegionVaultResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.regionVault) {
      RegionVault.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRegionVaultResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRegionVaultResponse,
    } as QueryAllRegionVaultResponse;
    message.regionVault = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionVault.push(RegionVault.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRegionVaultResponse {
    const message = {
      ...baseQueryAllRegionVaultResponse,
    } as QueryAllRegionVaultResponse;
    message.regionVault = [];
    if (object.regionVault !== undefined && object.regionVault !== null) {
      for (const e of object.regionVault) {
        message.regionVault.push(RegionVault.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRegionVaultResponse): unknown {
    const obj: any = {};
    if (message.regionVault) {
      obj.regionVault = message.regionVault.map((e) =>
        e ? RegionVault.toJSON(e) : undefined
      );
    } else {
      obj.regionVault = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRegionVaultResponse>
  ): QueryAllRegionVaultResponse {
    const message = {
      ...baseQueryAllRegionVaultResponse,
    } as QueryAllRegionVaultResponse;
    message.regionVault = [];
    if (object.regionVault !== undefined && object.regionVault !== null) {
      for (const e of object.regionVault) {
        message.regionVault.push(RegionVault.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetKycRequest: object = { account: "" };

export const QueryGetKycRequest = {
  encode(
    message: QueryGetKycRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetKycRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetKycRequest } as QueryGetKycRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetKycRequest {
    const message = { ...baseQueryGetKycRequest } as QueryGetKycRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    return message;
  },

  toJSON(message: QueryGetKycRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetKycRequest>): QueryGetKycRequest {
    const message = { ...baseQueryGetKycRequest } as QueryGetKycRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    return message;
  },
};

const baseQueryGetKycResponse: object = {};

export const QueryGetKycResponse = {
  encode(
    message: QueryGetKycResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.kyc !== undefined) {
      Kyc.encode(message.kyc, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetKycResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetKycResponse } as QueryGetKycResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kyc = Kyc.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetKycResponse {
    const message = { ...baseQueryGetKycResponse } as QueryGetKycResponse;
    if (object.kyc !== undefined && object.kyc !== null) {
      message.kyc = Kyc.fromJSON(object.kyc);
    } else {
      message.kyc = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetKycResponse): unknown {
    const obj: any = {};
    message.kyc !== undefined &&
      (obj.kyc = message.kyc ? Kyc.toJSON(message.kyc) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetKycResponse>): QueryGetKycResponse {
    const message = { ...baseQueryGetKycResponse } as QueryGetKycResponse;
    if (object.kyc !== undefined && object.kyc !== null) {
      message.kyc = Kyc.fromPartial(object.kyc);
    } else {
      message.kyc = undefined;
    }
    return message;
  },
};

const baseQueryAllKycRequest: object = {};

export const QueryAllKycRequest = {
  encode(
    message: QueryAllKycRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllKycRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllKycRequest } as QueryAllKycRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllKycRequest {
    const message = { ...baseQueryAllKycRequest } as QueryAllKycRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllKycRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllKycRequest>): QueryAllKycRequest {
    const message = { ...baseQueryAllKycRequest } as QueryAllKycRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllKycResponse: object = {};

export const QueryAllKycResponse = {
  encode(
    message: QueryAllKycResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.kyc) {
      Kyc.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllKycResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllKycResponse } as QueryAllKycResponse;
    message.kyc = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kyc.push(Kyc.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllKycResponse {
    const message = { ...baseQueryAllKycResponse } as QueryAllKycResponse;
    message.kyc = [];
    if (object.kyc !== undefined && object.kyc !== null) {
      for (const e of object.kyc) {
        message.kyc.push(Kyc.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllKycResponse): unknown {
    const obj: any = {};
    if (message.kyc) {
      obj.kyc = message.kyc.map((e) => (e ? Kyc.toJSON(e) : undefined));
    } else {
      obj.kyc = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllKycResponse>): QueryAllKycResponse {
    const message = { ...baseQueryAllKycResponse } as QueryAllKycResponse;
    message.kyc = [];
    if (object.kyc !== undefined && object.kyc !== null) {
      for (const e of object.kyc) {
        message.kyc.push(Kyc.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryKycByRegionRequest: object = { regionid: "" };

export const QueryKycByRegionRequest = {
  encode(
    message: QueryKycByRegionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.regionid !== "") {
      writer.uint32(10).string(message.regionid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryKycByRegionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryKycByRegionRequest,
    } as QueryKycByRegionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionid = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryKycByRegionRequest {
    const message = {
      ...baseQueryKycByRegionRequest,
    } as QueryKycByRegionRequest;
    if (object.regionid !== undefined && object.regionid !== null) {
      message.regionid = String(object.regionid);
    } else {
      message.regionid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryKycByRegionRequest): unknown {
    const obj: any = {};
    message.regionid !== undefined && (obj.regionid = message.regionid);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryKycByRegionRequest>
  ): QueryKycByRegionRequest {
    const message = {
      ...baseQueryKycByRegionRequest,
    } as QueryKycByRegionRequest;
    if (object.regionid !== undefined && object.regionid !== null) {
      message.regionid = object.regionid;
    } else {
      message.regionid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryKycByRegionResponse: object = {};

export const QueryKycByRegionResponse = {
  encode(
    message: QueryKycByRegionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.kyc) {
      Kyc.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryKycByRegionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryKycByRegionResponse,
    } as QueryKycByRegionResponse;
    message.kyc = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kyc.push(Kyc.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryKycByRegionResponse {
    const message = {
      ...baseQueryKycByRegionResponse,
    } as QueryKycByRegionResponse;
    message.kyc = [];
    if (object.kyc !== undefined && object.kyc !== null) {
      for (const e of object.kyc) {
        message.kyc.push(Kyc.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryKycByRegionResponse): unknown {
    const obj: any = {};
    if (message.kyc) {
      obj.kyc = message.kyc.map((e) => (e ? Kyc.toJSON(e) : undefined));
    } else {
      obj.kyc = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryKycByRegionResponse>
  ): QueryKycByRegionResponse {
    const message = {
      ...baseQueryKycByRegionResponse,
    } as QueryKycByRegionResponse;
    message.kyc = [];
    if (object.kyc !== undefined && object.kyc !== null) {
      for (const e of object.kyc) {
        message.kyc.push(Kyc.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a FixedDeposit by id. */
  FixedDeposit(
    request: QueryGetFixedDepositRequest
  ): Promise<QueryGetFixedDepositResponse>;
  /** Queries a list of FixedDeposit items. */
  FixedDepositAll(
    request: QueryAllFixedDepositRequest
  ): Promise<QueryAllFixedDepositResponse>;
  /** Queries a RegionVault by index. */
  RegionVault(
    request: QueryGetRegionVaultRequest
  ): Promise<QueryGetRegionVaultResponse>;
  /** Queries a list of RegionVault items. */
  RegionVaultAll(
    request: QueryAllRegionVaultRequest
  ): Promise<QueryAllRegionVaultResponse>;
  /** Queries a Kyc by index. */
  Kyc(request: QueryGetKycRequest): Promise<QueryGetKycResponse>;
  /** Queries a list of Kyc items. */
  KycAll(request: QueryAllKycRequest): Promise<QueryAllKycResponse>;
  /** Queries a list of KycByRegion items. */
  KycByRegion(
    request: QueryKycByRegionRequest
  ): Promise<QueryKycByRegionResponse>;
  /** Queries a list of FixedDepositByAcct items. */
  FixedDepositByAcct(
    request: QueryFixedDepositByAcctRequest
  ): Promise<QueryFixedDepositByAcctResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("srspoa.srvault.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  FixedDeposit(
    request: QueryGetFixedDepositRequest
  ): Promise<QueryGetFixedDepositResponse> {
    const data = QueryGetFixedDepositRequest.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Query",
      "FixedDeposit",
      data
    );
    return promise.then((data) =>
      QueryGetFixedDepositResponse.decode(new Reader(data))
    );
  }

  FixedDepositAll(
    request: QueryAllFixedDepositRequest
  ): Promise<QueryAllFixedDepositResponse> {
    const data = QueryAllFixedDepositRequest.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Query",
      "FixedDepositAll",
      data
    );
    return promise.then((data) =>
      QueryAllFixedDepositResponse.decode(new Reader(data))
    );
  }

  RegionVault(
    request: QueryGetRegionVaultRequest
  ): Promise<QueryGetRegionVaultResponse> {
    const data = QueryGetRegionVaultRequest.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Query",
      "RegionVault",
      data
    );
    return promise.then((data) =>
      QueryGetRegionVaultResponse.decode(new Reader(data))
    );
  }

  RegionVaultAll(
    request: QueryAllRegionVaultRequest
  ): Promise<QueryAllRegionVaultResponse> {
    const data = QueryAllRegionVaultRequest.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Query",
      "RegionVaultAll",
      data
    );
    return promise.then((data) =>
      QueryAllRegionVaultResponse.decode(new Reader(data))
    );
  }

  Kyc(request: QueryGetKycRequest): Promise<QueryGetKycResponse> {
    const data = QueryGetKycRequest.encode(request).finish();
    const promise = this.rpc.request("srspoa.srvault.Query", "Kyc", data);
    return promise.then((data) => QueryGetKycResponse.decode(new Reader(data)));
  }

  KycAll(request: QueryAllKycRequest): Promise<QueryAllKycResponse> {
    const data = QueryAllKycRequest.encode(request).finish();
    const promise = this.rpc.request("srspoa.srvault.Query", "KycAll", data);
    return promise.then((data) => QueryAllKycResponse.decode(new Reader(data)));
  }

  KycByRegion(
    request: QueryKycByRegionRequest
  ): Promise<QueryKycByRegionResponse> {
    const data = QueryKycByRegionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Query",
      "KycByRegion",
      data
    );
    return promise.then((data) =>
      QueryKycByRegionResponse.decode(new Reader(data))
    );
  }

  FixedDepositByAcct(
    request: QueryFixedDepositByAcctRequest
  ): Promise<QueryFixedDepositByAcctResponse> {
    const data = QueryFixedDepositByAcctRequest.encode(request).finish();
    const promise = this.rpc.request(
      "srspoa.srvault.Query",
      "FixedDepositByAcct",
      data
    );
    return promise.then((data) =>
      QueryFixedDepositByAcctResponse.decode(new Reader(data))
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
